import React, { useState, useRef, useEffect } from 'react';
import { FaCamera, FaMicrophone, FaShare, FaPlay, FaStop, FaComments, FaHeart } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/useAuth';
// Remove socket.io import
// import io, { Socket } from 'socket.io-client';

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
  const [customSlot, setCustomSlot] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [hasMicAccess, setHasMicAccess] = useState(false);
  const [currentStream, setCurrentStream] = useState<LiveStream | null>(null);
  // Remove chatMessages, newMessage, chatContainerRef, and related UI if only socket-based
  const [viewersCount, setViewersCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  // Remove socket.io import
  // const [socket, setSocket] = useState<Socket | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [scheduledStreams, setScheduledStreams] = useState<LiveStream[]>([]);
  const [youtubeScheduledStreams, setYoutubeScheduledStreams] = useState<any[]>([]);
  const [deletingStreamId, setDeletingStreamId] = useState<number | null>(null);
  const [rtmpInfo, setRtmpInfo] = useState<any | null>(null);
  const [showRtmpModal, setShowRtmpModal] = useState(false);
  const [rtmpModalStream, setRtmpModalStream] = useState<any | null>(null);

  // Fetch scheduled streams for the merchant
  const fetchScheduledStreams = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/live-streams/scheduled`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch scheduled streams');
      const data = await response.json();
      setScheduledStreams(Array.isArray(data) ? data : []);
    } catch (error) {
      setScheduledStreams([]);
    }
  };

  // Fetch scheduled streams on mount and when a stream is scheduled/ended
  useEffect(() => {
    if (accessToken) {
      fetchScheduledStreams();
    }
  }, [accessToken, isLive, currentStream]);

  // Fetch YouTube scheduled streams for the merchant
  const fetchYoutubeScheduledStreams = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/live-streams/youtube-scheduled`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch YouTube scheduled streams');
      const data = await response.json();
      setYoutubeScheduledStreams(data.data || []);
    } catch (error) {
      setYoutubeScheduledStreams([]);
    }
  };

  // Fetch YouTube scheduled streams on mount
  useEffect(() => {
    if (accessToken) {
      fetchYoutubeScheduledStreams();
    }
  }, [accessToken]);

  // Handler for Go Live button
  const handleGoLive = async (stream: any) => {
    setCurrentStream(stream);
    setIsLive(false); // Not live yet, just prepping
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/live-streams/${stream.stream_id}/start`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to start stream');
      }
      const data = await response.json();
      setCurrentStream(data.data);
      setIsLive(true);
      toast.success('Live stream started!');
      fetchScheduledStreams();
    } catch (error: any) {
      toast.error(error.message || 'Failed to start stream');
    }
  };

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
            `${API_BASE_URL}/api/live-streams/available-slots?product_id=${formData.productId}&date=${formData.scheduledDate}`,
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
  }, [formData.productId, formData.scheduledDate, accessToken, API_BASE_URL]);

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
    if (e.target.value !== 'other') {
      setCustomSlot('');
    }
  };

  const handleCustomSlotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSlot(e.target.value);
    setSelectedSlot('other');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let slotToUse = selectedSlot === 'other' ? customSlot : selectedSlot;
    if (!slotToUse) {
      toast.error('Please select or enter a time slot');
      return;
    }
    const scheduled_time = `${formData.scheduledDate}T${slotToUse}:00`;
    try {
      let response;
      if (formData.thumbnail) {
        // Use multipart/form-data if thumbnail is present
        const form = new FormData();
        form.append('title', formData.streamTitle);
        form.append('product_id', formData.productId);
        form.append('description', formData.description);
        form.append('scheduled_time', scheduled_time);
        form.append('thumbnail', formData.thumbnail);
        response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/live-streams`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: form
        });
      } else {
        // Use JSON if no thumbnail file
        const payload = {
          title: formData.streamTitle,
          product_id: Number(formData.productId),
          description: formData.description,
          scheduled_time,
        };
        response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/live-streams`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || err.message || 'Failed to schedule stream');
      }
      const data = await response.json();
      console.log('Schedule Live Stream API response:', data); // <-- Debug log
      setCurrentStream(data.data);
      setRtmpInfo(data.rtmp_info || null);
      toast.success('Live stream scheduled successfully!');
      // Refresh scheduled streams after scheduling
      fetchScheduledStreams();
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
      const response = await fetch(`${API_BASE_URL}/api/live-streams/${currentStream.stream_id}/start`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to start stream');
      }

      // Update stream status via fetch
      const updatedStream = await response.json();
      setCurrentStream(updatedStream.data);
      setIsLive(true);
      toast.success('Live stream started!');
      // Refresh scheduled streams after starting
      fetchScheduledStreams();
    } catch (error: any) {
      toast.error(error.message || 'Failed to start stream');
    }
  };

  const stopLiveStream = async () => {
    if (!currentStream) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/live-streams/${currentStream.stream_id}/end`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to end stream');
      }

      // Update stream status via fetch
      const updatedStream = await response.json();
      setCurrentStream(updatedStream.data);
      setIsLive(false);
      toast.success('Live stream ended');
      // Refresh scheduled streams after ending
      fetchScheduledStreams();
    } catch (error: any) {
      toast.error(error.message || 'Failed to end stream');
    }
  };

  // Remove sendMessage and likeStream logic that used socket
  // const sendMessage = () => {
  //   if (!newMessage.trim() || !currentStream || !socket) return;

  //   socket.emit('send_message', {
  //     user_id: user?.id,
  //     stream_id: currentStream.stream_id,
  //     content: newMessage.trim()
  //   });

  //   setNewMessage('');
  // };

  // const likeStream = () => {
  //   if (!currentStream || !socket) return;

  //   socket.emit('like_stream', {
  //     stream_id: currentStream.stream_id
  //   });
  // };

  const shareStream = () => {
    if (!currentStream) return;
    
    const shareUrl = `${window.location.origin}/live-stream/${currentStream.stream_id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Stream link copied to clipboard!');
  };

  // Helper for copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  // Fetch RTMP info for a scheduled stream
  const fetchRtmpInfoForStream = async (stream: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/live-streams/${stream.stream_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch stream details');
      const data = await response.json();
      // If backend returns rtmp_info, use it; else, fallback to stream.stream_url/stream_key
      let rtmp = null;
      if (data.rtmp_info) {
        rtmp = data.rtmp_info;
      } else if (data.stream_url && data.stream_key) {
        rtmp = {
          ingestionAddress: data.stream_url,
          streamName: data.stream_key,
          streamUrl: `${data.stream_url}/${data.stream_key}`,
        };
      }
      setRtmpInfo(rtmp);
      setRtmpModalStream(data);
      setShowRtmpModal(true);
    } catch (error) {
      toast.error('Failed to fetch RTMP info');
    }
  };

  const deleteScheduledStream = async (streamId: number) => {
    if (!window.confirm('Are you sure you want to delete this scheduled stream?')) return;
    setDeletingStreamId(streamId);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/live-streams/${streamId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || err.message || 'Failed to delete stream');
      }
      toast.success('Scheduled stream deleted');
      // Remove from local state
      setScheduledStreams((prev) => prev.filter((s) => s.stream_id !== streamId));
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete stream');
    } finally {
      setDeletingStreamId(null);
    }
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
        
        {/* RTMP Modal for Go Live */}
        {showRtmpModal && rtmpInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => setShowRtmpModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Go Live with OBS Studio</h2>
              <div className="mb-3">
                <span className="font-semibold">RTMP URL:</span>
                <span className="ml-2 font-mono text-sm select-all">{rtmpInfo.ingestionAddress || 'N/A'}</span>
                {rtmpInfo.ingestionAddress && (
                  <button onClick={() => handleCopy(rtmpInfo.ingestionAddress)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
                )}
              </div>
              <div className="mb-3">
                <span className="font-semibold">Stream Key:</span>
                <span className="ml-2 font-mono text-sm select-all">{rtmpInfo.streamName || 'N/A'}</span>
                {rtmpInfo.streamName && (
                  <button onClick={() => handleCopy(rtmpInfo.streamName)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
                )}
              </div>
              {rtmpInfo.streamUrl && (
                <div className="mb-3">
                  <span className="font-semibold">Full RTMP:</span>
                  <span className="ml-2 font-mono text-sm select-all">{rtmpInfo.streamUrl}</span>
                  <button onClick={() => handleCopy(rtmpInfo.streamUrl)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
                </div>
              )}
              <div className="mt-4 text-gray-700 text-sm">
                <strong>How to use in OBS Studio:</strong>
                <ol className="list-decimal ml-5 mt-2 space-y-1">
                  <li>Open <b>OBS Studio</b> and go to <b>Settings &gt; Stream</b>.</li>
                  <li>Set <b>Service</b> to <b>Custom...</b></li>
                  <li>Paste the <b>RTMP URL</b> above into the <b>Server</b> field.</li>
                  <li>Paste the <b>Stream Key</b> above into the <b>Stream Key</b> field.</li>
                  <li>Click <b>Apply</b> and <b>OK</b>, then click <b>Start Streaming</b> in OBS.</li>
                </ol>
                <div className="mt-2 text-green-700">You are now ready to go live on YouTube!</div>
              </div>
            </div>
          </div>
        )}

        {/* Show RTMP info after scheduling a stream */}
        {rtmpInfo && (rtmpInfo.ingestionAddress || rtmpInfo.streamName) && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Your RTMP Stream Details</h2>
            <div className="mb-2">
              <span className="font-semibold">RTMP URL:</span>
              <span className="ml-2 font-mono text-sm select-all">{rtmpInfo.ingestionAddress || 'N/A'}</span>
              {rtmpInfo.ingestionAddress && (
                <button onClick={() => handleCopy(rtmpInfo.ingestionAddress)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
              )}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Stream Key:</span>
              <span className="ml-2 font-mono text-sm select-all">{rtmpInfo.streamName || 'N/A'}</span>
              {rtmpInfo.streamName && (
                <button onClick={() => handleCopy(rtmpInfo.streamName)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
              )}
            </div>
            {rtmpInfo.streamUrl && (
              <div className="mb-2">
                <span className="font-semibold">Full RTMP:</span>
                <span className="ml-2 font-mono text-sm select-all">{rtmpInfo.streamUrl}</span>
                <button onClick={() => handleCopy(rtmpInfo.streamUrl)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
              </div>
            )}
            <div className="text-green-700 text-sm mt-2">Use these details in your streaming software (e.g., OBS, Streamlabs) to go live on YouTube.</div>
          </div>
        )}

        {/* YouTube Scheduled Streams Section */}
        {youtubeScheduledStreams.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">YouTube Scheduled Streams</h2>
            <div className="space-y-4">
              {youtubeScheduledStreams.map((stream) => (
                <div key={stream.broadcast_id} className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 last:border-b-0 last:pb-0">
                  <div>
                    <div className="font-medium text-lg">{stream.title}</div>
                    <div className="text-sm text-gray-600">Scheduled: {new Date(stream.scheduled_start_time).toLocaleString()}</div>
                    {stream.stream_info && (
                      <>
                        <div className="text-sm text-gray-600 mt-2">RTMP URL: <span className="font-mono">{stream.stream_info.ingestionAddress}</span>
                          <button onClick={() => handleCopy(stream.stream_info.ingestionAddress)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
                        </div>
                        <div className="text-sm text-gray-600">Stream Key: <span className="font-mono">{stream.stream_info.streamName}</span>
                          <button onClick={() => handleCopy(stream.stream_info.streamName)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
                        </div>
                        {stream.stream_info.streamUrl && (
                          <div className="text-sm text-gray-600">Full RTMP: <span className="font-mono">{stream.stream_info.streamUrl}</span>
                            <button onClick={() => handleCopy(stream.stream_info.streamUrl)} className="ml-2 text-blue-600 underline text-xs">Copy</button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="mt-2 md:mt-0">
                    {/* You can add a button to open in YouTube Studio or OBS, etc. */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheduled Streams Section */}
        {scheduledStreams.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Scheduled Streams</h2>
            <div className="space-y-4">
              {scheduledStreams.map((stream) => (
                <div key={stream.stream_id} className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 last:border-b-0 last:pb-0">
                  <div>
                    <div className="font-medium text-lg">{stream.title}</div>
                    <div className="text-sm text-gray-600">Product: {stream.product?.product_name}</div>
                    <div className="text-sm text-gray-600">Scheduled: {new Date(stream.scheduled_time).toLocaleString()}</div>
                  </div>
                  <div className="mt-2 md:mt-0 flex gap-2">
                    {/* Get RTMP Key Button */}
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => fetchRtmpInfoForStream(stream)}
                    >
                      Get RTMP Key
                    </button>
                    {/* Go Live Button */}
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      onClick={() => handleGoLive(stream)}
                      disabled={!!(!rtmpInfo || (currentStream && currentStream.stream_id !== stream.stream_id))}
                    >
                      Go Live
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                      onClick={() => deleteScheduledStream(stream.stream_id)}
                      disabled={deletingStreamId === stream.stream_id}
                    >
                      {deletingStreamId === stream.stream_id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                    <option value="other">Other (enter custom time)</option>
                  </select>
                  {selectedSlot === 'other' && (
                    <input
                      type="time"
                      value={customSlot}
                      onChange={handleCustomSlotChange}
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      required
                    />
                  )}
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
                    {/* The chat messages will be fetched and displayed here via REST API */}
                    {/* For now, we'll just show a placeholder or no messages */}
                    <p className="text-sm text-gray-500">Chat messages will appear here...</p>
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    {/* The message input and send button will be handled by REST API */}
                    <input
                      type="text"
                      // value={newMessage} // This state is removed
                      // onChange={(e) => setNewMessage(e.target.value)} // This state is removed
                      placeholder="Type a message..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    />
                    <button
                      // onClick={sendMessage} // This function is removed
                      className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                    >
                      Send
                    </button>
                  </div>
                </div>

                {/* Like Button */}
                <div className="mt-4">
                  {/* The like button will be handled by REST API */}
                  <button
                    // onClick={likeStream} // This function is removed
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
            <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
              <button
                onClick={requestCameraAccess}
                className={`w-full sm:w-fit inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  hasCameraAccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <FaCamera className="mr-2" />
                {hasCameraAccess ? 'Camera Ready' : 'Enable Camera'}
              </button>
              <button
                onClick={requestMicAccess}
                className={`w-full sm:w-fit inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  hasMicAccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <FaMicrophone className="mr-2" />
                {hasMicAccess ? 'Mic Ready' : 'Enable Microphone'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Aoinlive;