import React, { useState, useRef, useEffect } from 'react';
import { FaCamera, FaMicrophone, FaShare, FaPlay, FaStop, FaComments, FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';
import io, { Socket } from 'socket.io-client';

interface Product {
  product_id: number;
  product_name: string;
  sku: string;
  selling_price: number;
  media?: Array<{
    media_id: number;
    url: string;
    type: 'IMAGE' | 'VIDEO';
  }>;
}

interface LiveStreamForm {
  streamTitle: string;
  productId: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  thumbnail: File | null;
}

interface LiveStream {
  stream_id: number;
  title: string;
  description: string;
  scheduled_time: string;
  start_time?: string;
  end_time?: string;
  is_live: boolean;
  status: string;
  viewers_count: number;
  likes_count: number;
  stream_key: string;
  product: Product;
  merchant: {
    business_name: string;
    user: {
      first_name: string;
      last_name: string;
    };
  };
}

interface ChatMessage {
  comment_id: number;
  user: {
    first_name: string;
    last_name: string;
    role: string;
  };
  content: string;
  created_at: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LIVE_STREAMING_URL = import.meta.env.VITE_LIVE_STREAMING_URL || 'http://localhost:5001';

const Aoinlive: React.FC = () => {
  const { accessToken, user } = useAuth();
  const [formData, setFormData] = useState<LiveStreamForm>({
    streamTitle: '',
    productId: '',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    thumbnail: null,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [hasMicAccess, setHasMicAccess] = useState(false);
  const [currentStream, setCurrentStream] = useState<LiveStream | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [viewersCount, setViewersCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    if (accessToken && user) {
      const newSocket = io(LIVE_STREAMING_URL, {
        auth: {
          token: accessToken
        }
      });

      newSocket.on('connect', () => {
        console.log('Connected to live streaming server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from live streaming server');
      });

      newSocket.on('new_message', (message: ChatMessage) => {
        setChatMessages(prev => [...prev, message]);
        // Auto-scroll to bottom
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      });

      newSocket.on('viewer_count_update', (data: { stream_id: number; viewers_count: number }) => {
        if (currentStream && data.stream_id === currentStream.stream_id) {
          setViewersCount(data.viewers_count);
        }
      });

      newSocket.on('likes_update', (data: { stream_id: number; likes_count: number }) => {
        if (currentStream && data.stream_id === currentStream.stream_id) {
          setLikesCount(data.likes_count);
        }
      });

      newSocket.on('stream_started', (data: { stream_id: number; start_time: string }) => {
        if (currentStream && data.stream_id === currentStream.stream_id) {
          setIsLive(true);
          toast.success('Stream started successfully!');
        }
      });

      newSocket.on('stream_ended', (data: { stream_id: number; end_time: string }) => {
        if (currentStream && data.stream_id === currentStream.stream_id) {
          setIsLive(false);
          toast.success('Stream ended');
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [accessToken, user, LIVE_STREAMING_URL]);

  useEffect(() => {
    if (accessToken) {
      fetchProducts();
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (formData.productId && formData.scheduledDate) {
        try {
          console.log('Fetching slots for:', { productId: formData.productId, date: formData.scheduledDate });
          const response = await fetch(
            `${LIVE_STREAMING_URL}/api/live-streams/available-slots?product_id=${formData.productId}&date=${formData.scheduledDate}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` }
            }
          );
          console.log('Response status:', response.status);
          if (!response.ok) throw new Error('Failed to fetch slots');
          
          const responseText = await response.text();
          console.log('Raw response text:', responseText);
          
          let data;
          try {
            data = JSON.parse(responseText);
            console.log('Parsed JSON data:', data);
          } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            throw new Error('Invalid JSON response');
          }
          
          console.log('Available slots response:', data);
          console.log('Data type:', typeof data);
          console.log('Data keys:', Object.keys(data));
          
          // Handle different response structures
          let availableSlots = [];
          if (data.data && data.data.available_slots) {
            availableSlots = data.data.available_slots;
          } else if (data.available_slots) {
            availableSlots = data.available_slots;
          } else if (Array.isArray(data)) {
            availableSlots = data;
          }
          
          setAvailableSlots(availableSlots);
          console.log('Set available slots:', availableSlots);
        } catch (error) {
          console.error('Error fetching slots:', error);
          setAvailableSlots([]);
          toast.error('Failed to load available slots');
        }
      } else {
        setAvailableSlots([]);
      }
      setSelectedSlot('');
    };
    fetchSlots();
  }, [formData.productId, formData.scheduledDate, accessToken]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'productId' || name === 'scheduledDate') {
      setSelectedSlot('');
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: e.target.files![0],
      }));
    }
  };

  const handleSlotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlot(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }
    const scheduled_time = `${formData.scheduledDate}T${selectedSlot}:00`;
    try {
      const payload = {
        title: formData.streamTitle,
        product_id: Number(formData.productId),
        description: formData.description,
        scheduled_time,
      };
      const response = await fetch(`${LIVE_STREAMING_URL}/api/live-streams`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to schedule stream');
      }
      const data = await response.json();
      setCurrentStream(data.data);
      toast.success('Live stream scheduled successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to schedule stream');
    }
  };

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraAccess(true);
      toast.success('Camera access granted');
    } catch (error) {
      toast.error('Please allow camera access to go live');
    }
  };

  const requestMicAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicAccess(true);
      toast.success('Microphone access granted');
    } catch (error) {
      toast.error('Please allow microphone access to go live');
    }
  };

  const startLiveStream = async () => {
    if (!hasCameraAccess || !hasMicAccess) {
      toast.error('Please grant camera and microphone access first');
      return;
    }
    if (!currentStream) {
      toast.error('No stream scheduled to start');
      return;
    }

    try {
      const response = await fetch(`${LIVE_STREAMING_URL}/api/live-streams/${currentStream.stream_id}/start`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to start stream');
      }

      // Join stream room via WebSocket
      if (socket) {
        socket.emit('join_stream', {
          user_id: user?.id,
          stream_id: currentStream.stream_id,
          is_merchant: true
        });
      }

      setIsLive(true);
      toast.success('Live stream started!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to start stream');
    }
  };

  const stopLiveStream = async () => {
    if (!currentStream) return;

    try {
      const response = await fetch(`${LIVE_STREAMING_URL}/api/live-streams/${currentStream.stream_id}/end`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to end stream');
      }

      // Leave stream room via WebSocket
      if (socket) {
        socket.emit('leave_stream', {
          user_id: user?.id,
          stream_id: currentStream.stream_id
        });
      }

      setIsLive(false);
      toast.success('Live stream ended');
    } catch (error: any) {
      toast.error(error.message || 'Failed to end stream');
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !currentStream || !socket) return;

    socket.emit('send_message', {
      user_id: user?.id,
      stream_id: currentStream.stream_id,
      content: newMessage.trim()
    });

    setNewMessage('');
  };

  const likeStream = () => {
    if (!currentStream || !socket) return;

    socket.emit('like_stream', {
      stream_id: currentStream.stream_id
    });
  };

  const shareStream = () => {
    if (!currentStream) return;
    
    const shareUrl = `${window.location.origin}/live-stream/${currentStream.stream_id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Stream link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Aoin Live Streaming</h1>
        
        {!isLive ? (
          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="streamTitle" className="block text-sm font-medium text-gray-700">
                  Stream Title
                </label>
                <input
                  type="text"
                  id="streamTitle"
                  name="streamTitle"
                  value={formData.streamTitle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  placeholder="Enter stream title"
                  required
                />
              </div>

              <div>
                <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
                  Select Product
                </label>
                <select
                  id="productId"
                  name="productId"
                  value={formData.productId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.product_id} value={product.product_id}>
                      {product.product_name} - {product.sku}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  placeholder="Enter stream description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700">
                    Scheduled Date
                  </label>
                  <input
                    type="date"
                    id="scheduledDate"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slot" className="block text-sm font-medium text-gray-700">
                    Time Slot
                  </label>
                  <select
                    id="slot"
                    name="slot"
                    value={selectedSlot}
                    onChange={handleSlotChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    required
                  >
                    <option value="">Select a slot</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot} - {`${parseInt(slot.split(':')[0]) + 1}:00`}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-orange-50 file:text-orange-700
                    hover:file:bg-orange-100"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Schedule Live Stream
            </button>
          </form>
        ) : (
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">{currentStream?.title}</h2>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-sm text-gray-600">
                  <FaComments className="mr-1" />
                  {viewersCount} viewers
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <FaHeart className="mr-1" />
                  {likesCount} likes
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Stream */}
              <div className="lg:col-span-2">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-96 rounded-lg bg-gray-900"
                />
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={shareStream}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaShare className="mr-2" />
                    Share
                  </button>
                  <button
                    onClick={stopLiveStream}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FaStop className="mr-2" />
                    End Stream
                  </button>
                </div>
              </div>

              {/* Chat Section */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4 h-96 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4">Live Chat</h3>
                  
                  {/* Messages */}
                  <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto space-y-2 mb-4"
                  >
                    {chatMessages.map((message, index) => (
                      <div key={index} className="bg-white p-2 rounded">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {message.user.first_name} {message.user.last_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{message.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                    >
                      Send
                    </button>
                  </div>
                </div>

                {/* Like Button */}
                <div className="mt-4">
                  <button
                    onClick={likeStream}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FaHeart className="mr-2" />
                    Like Stream
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLive && (
          <div className="bg-white shadow rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Go Live Now</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={requestCameraAccess}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  hasCameraAccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <FaCamera className="mr-2" />
                {hasCameraAccess ? 'Camera Ready' : 'Enable Camera'}
              </button>
              <button
                onClick={requestMicAccess}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  hasMicAccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <FaMicrophone className="mr-2" />
                {hasMicAccess ? 'Mic Ready' : 'Enable Microphone'}
              </button>
              <button
                onClick={startLiveStream}
                disabled={!hasCameraAccess || !hasMicAccess || !currentStream}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPlay className="mr-2" />
                Go Live
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Aoinlive;
