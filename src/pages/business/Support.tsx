import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  MessageSquare,
  Send,
  Clock,
  Plus,
  Search,
  Paperclip,
  XCircle,
} from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- Interfaces Aligned with Backend ---
interface BackendMessage {
  id: number;
  ticket_id: number;
  sender_user_id: number;
  sender_name: string;
  sender_role: 'CUSTOMER' | 'MERCHANT' | 'ADMIN' | 'UNKNOWN'; // Match backend roles
  is_admin_reply: boolean;
  message_text: string;
  attachment_url?: string | null;
  created_at: string;
}

interface BackendTicket {
  id: number; // DB ID
  ticket_uid: string; // User-facing ID
  creator_user_id: number;
  creator_name: string;
  creator_role: 'customer' | 'merchant';
  merchant_id?: number;
  merchant_name?: string;
  title: string;
  description: string; // Initial description
  image_url?: string | null;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'awaiting_customer_reply' | 'awaiting_merchant_reply' | 'resolved' | 'closed';
  assigned_to_admin_id?: number | null;
  assigned_admin_name?: string | null;
  related_order_id?: string | null;
  related_product_id?: number | null;
  created_at: string;
  updated_at: string;
  resolved_at?: string | null;
  messages?: BackendMessage[]; // Messages will be loaded separately or on demand
}

interface NewTicketData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  related_order_id?: string;
  related_product_id?: string; // Send as string, convert to int on backend if needed
}

const Support: React.FC = () => {
  const { accessToken, user } = useAuth();

  const [tickets, setTickets] = useState<BackendTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<BackendTicket | null>(null);
  const [selectedTicketMessages, setSelectedTicketMessages] = useState<BackendMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const [newMessage, setNewMessage] = useState('');
  const [newMessageAttachment, setNewMessageAttachment] = useState<File | null>(null);

  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed' | 'in_progress' | 'resolved' | 'awaiting_customer_reply' | 'awaiting_merchant_reply'>('all');

  const [newTicketData, setNewTicketData] = useState<NewTicketData>({
    title: '',
    description: '',
    priority: 'medium'
  });
  const [newTicketImage, setNewTicketImage] = useState<File | null>(null);
  const [newTicketImagePreview, setNewTicketImagePreview] = useState<string | null>(null);

  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const fetchTickets = useCallback(async () => {
    if (!accessToken) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      // Add other params like sort_by, page, per_page if your backend supports them for merchants

      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/support/tickets?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (!response.ok) throw new Error('Failed to fetch tickets');

      const data = await response.json(); // Expecting { tickets: [], pagination: {} }
      setTickets(data.tickets || []); // Adjust if structure is different
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load support tickets');
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, filterStatus]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const fetchTicketMessages = async (ticketUid: string) => {
    if (!accessToken) return;
    setIsLoadingMessages(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/support/tickets/${ticketUid}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (!response.ok) throw new Error('Failed to fetch ticket details and messages');
      const ticketData: BackendTicket = await response.json();
      setSelectedTicket(ticketData); // Update the whole selected ticket
      setSelectedTicketMessages(ticketData.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages for the selected ticket.');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (selectedTicket?.ticket_uid) {
      fetchTicketMessages(selectedTicket.ticket_uid);
    } else {
      setSelectedTicketMessages([]); // Clear messages if no ticket is selected
    }
  }, [selectedTicket?.ticket_uid, accessToken]);


  const handleNewTicketInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicketData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewTicketImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB.");
        return;
      }
      setNewTicketImage(file);
      setNewTicketImagePreview(URL.createObjectURL(file));
    } else {
      setNewTicketImage(null);
      setNewTicketImagePreview(null);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketData.title.trim() || !newTicketData.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }
    setIsCreatingTicket(true);
    try {
      const formData = new FormData();
      formData.append('title', newTicketData.title);
      formData.append('description', newTicketData.description);
      formData.append('priority', newTicketData.priority);
      if (newTicketData.related_order_id) formData.append('related_order_id', newTicketData.related_order_id);
      if (newTicketData.related_product_id) formData.append('related_product_id', newTicketData.related_product_id);

      if (newTicketImage) {
        formData.append('image_file', newTicketImage);
      }

      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/support/tickets`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` }, // Content-Type is set by FormData
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to create ticket' }));
        throw new Error(errorData.message || 'Failed to create ticket');
      }

      const createdTicket: BackendTicket = await response.json();
      setTickets(prev => [createdTicket, ...prev].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));
      setShowNewTicketForm(false);
      setNewTicketData({ title: '', description: '', priority: 'medium' });
      setNewTicketImage(null);
      setNewTicketImagePreview(null);
      toast.success('Support ticket created successfully!');
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create support ticket');
    } finally {
      setIsCreatingTicket(false);
    }
  };

  const handleMessageAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Attachment size should be less than 5MB.");
        return;
      }
      setNewMessageAttachment(file);
    } else {
      setNewMessageAttachment(null);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || (!newMessage.trim() && !newMessageAttachment)) {
      toast.error("Message or attachment is required.");
      return;
    }
    setIsSendingMessage(true);
    try {
      const formData = new FormData();
      if (newMessage.trim()) formData.append('message_text', newMessage.trim());
      if (newMessageAttachment) {
        formData.append('attachment_file', newMessageAttachment);
      }

      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/support/tickets/${selectedTicket.ticket_uid}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to send message' }));
        throw new Error(errorData.message || 'Failed to send message');
      }

      const sentMessage: BackendMessage = await response.json();
      // Optimistically update, or refetch messages for the ticket
      setSelectedTicketMessages(prev => [...prev, sentMessage]);
      // Also update the main ticket's updated_at and potentially status
      setTickets(prevTickets => prevTickets.map(t =>
        t.ticket_uid === selectedTicket.ticket_uid
          ? { ...t, updated_at: sentMessage.created_at, status: 'in_progress' } // Or status from backend
          : t
      ));
      setSelectedTicket(prev => prev ? { ...prev, updated_at: sentMessage.created_at, status: 'in_progress' } : null);

      setNewMessage('');
      setNewMessageAttachment(null);
      if (document.getElementById('message-attachment-input')) { // Reset file input
        (document.getElementById('message-attachment-input') as HTMLInputElement).value = "";
      }
      toast.success("Message sent!");

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!selectedTicket || selectedTicket.status !== 'resolved') {
      toast.error("Only resolved tickets can be closed.");
      return;
    }
    if (!window.confirm("Are you sure you want to close this ticket? This action cannot be undone by you.")) return;

    setIsSendingMessage(true); // Reuse submitting state or create a new one for closing
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/support/tickets/${selectedTicket.ticket_uid}/close`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to close ticket' }));
        throw new Error(errorData.message || 'Failed to close ticket');
      }
      const updatedTicket = await response.json();
      setTickets(prev => prev.map(t => t.ticket_uid === updatedTicket.ticket_uid ? updatedTicket : t));
      setSelectedTicket(updatedTicket);
      toast.success("Ticket closed successfully.");
    } catch (error) {
      console.error("Error closing ticket:", error);
      toast.error(error instanceof Error ? error.message : 'Failed to close ticket');
    } finally {
      setIsSendingMessage(false);
    }
  };


  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()); // Sort by most recently updated

  const getStatusColor = (status: BackendTicket['status']) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'awaiting_customer_reply':
      case 'awaiting_merchant_reply': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-indigo-100 text-indigo-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: BackendTicket['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Support Center</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your support tickets and get help.</p>
        </div>
        <button
          onClick={() => {
            setShowNewTicketForm(true);
            setSelectedTicket(null); // Deselect any ticket when opening new form
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-500 hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Ticket
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent-500 focus:border-accent-500 sm:text-sm"
          />
        </div>
        <div className="relative w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
            className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm rounded-md appearance-none"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="awaiting_merchant_reply">Awaiting Your Reply</option>
            <option value="awaiting_customer_reply">Awaiting Support Reply</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          {/* <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" /> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)] md:h-[calc(100vh-180px)]">
        {/* Ticket List */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-orange-50">
            <h2 className="text-lg font-medium text-orange-700">Your Tickets ({filteredTickets.length})</h2>
          </div>
          {filteredTickets.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 p-4">No tickets found.</div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
              {filteredTickets.map(ticket => (
                <div
                  key={ticket.ticket_uid}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 cursor-pointer hover:bg-orange-50/50 transition-colors ${selectedTicket?.ticket_uid === ticket.ticket_uid ? 'bg-orange-100 border-l-4 border-accent-500' : ''
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-800 truncate" title={ticket.title}>{ticket.title}</h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{ticket.description}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                    <span>#{ticket.ticket_uid}</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(ticket.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
          {selectedTicket ? (
            <>
              <div className="px-3 py-2 border-b border-gray-200 bg-orange-50 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-medium text-orange-700 truncate" title={selectedTicket.title}>{selectedTicket.title}</h2>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </span>
                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="flex-1 px-4 py-2 space-y-3 overflow-y-auto bg-gray-50"
                style={{ height: 'calc(100vh - 320px)' }}
              >
                {isLoadingMessages ? (
                  <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-500"></div></div>
                ) : selectedTicketMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">No messages yet. Start the conversation!</div>
                ) : (
                  selectedTicketMessages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_user_id === Number(user?.id) ? 'justify-end' : 'justify-start'} mb-3`}
                    >
                      <div className={`relative max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${message.sender_user_id === Number(user?.id)
                        ? 'bg-orange-500 text-white rounded-br-md'
                        : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                        }`}>
                        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.message_text}</p>
                        {message.attachment_url && (
                          <a href={message.attachment_url} target="_blank" rel="noopener noreferrer" className={`mt-2 text-xs underline flex items-center gap-1 ${message.sender_user_id === Number(user?.id) ? 'text-orange-100 hover:text-white' : 'text-orange-600 hover:text-orange-700'}`}>
                            <Paperclip size={12} /> View Attachment
                          </a>
                        )}
                        <div className={`flex items-center justify-between mt-2 text-xs ${message.sender_user_id === Number(user?.id) ? 'text-orange-100' : 'text-gray-500'}`}>
                          <span className="font-medium">{message.sender_name}</span>
                          <span className="ml-3">{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        {/* WhatsApp-style tail */}
                        <div className={`absolute bottom-0 w-3 h-3 ${message.sender_user_id === Number(user?.id)
                          ? 'right-0 transform translate-x-1 bg-orange-500'
                          : 'left-0 transform -translate-x-1 bg-white border-l border-b border-gray-200'
                          } rotate-45`}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {selectedTicket.status !== 'closed' && selectedTicket.status !== 'resolved' && (
                <div className="px-3 py-1.5 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <div className="flex-1">
                      <textarea
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                          // Auto resize
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = Math.min(target.scrollHeight, 56) + 'px';
                        }}
                        placeholder="Type your message..."
                        rows={1}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-full shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm resize-none overflow-hidden bg-gray-50 focus:bg-white transition-colors"
                        disabled={isSendingMessage}
                        style={{
                          height: '1rem',
                          minHeight: '1rem',
                          maxHeight: '3.5rem'
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (newMessage.trim() || newMessageAttachment) {
                              handleSendMessage(e as any);
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label htmlFor="message-attachment-input" className="cursor-pointer text-gray-500 hover:text-orange-600 p-1.5 rounded-full hover:bg-orange-50 flex-shrink-0 transition-colors">
                        <Paperclip className="h-4 w-4" />
                        <input id="message-attachment-input" type="file" className="hidden" onChange={handleMessageAttachmentChange} disabled={isSendingMessage} />
                      </label>
                      <button
                        type="submit"
                        disabled={(!newMessage.trim() && !newMessageAttachment) || isSendingMessage}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 flex-shrink-0 transition-colors shadow-sm text-xs font-medium"
                      >
                        {isSendingMessage ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Send className="h-3 w-3" />
                            <span>Send</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                  {newMessageAttachment && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                      <Paperclip className="h-3 w-3" />
                      <span className="truncate max-w-xs">{newMessageAttachment.name}</span>
                      <button
                        onClick={() => setNewMessageAttachment(null)}
                        className="text-red-500 hover:text-red-700 ml-auto"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              {selectedTicket.status === 'resolved' && (
                <div className="px-3 py-2 border-t border-gray-200 bg-white text-center">
                  <p className="text-xs text-gray-700 mb-2">This ticket has been marked as resolved by our support team.</p>
                  <button
                    onClick={handleCloseTicket}
                    disabled={isSendingMessage}
                    className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-xs"
                  >
                    Mark as Closed
                  </button>
                </div>
              )}
              {selectedTicket.status === 'closed' && (
                <div className="px-3 py-2 border-t border-gray-200 bg-gray-100 text-center">
                  <p className="text-xs text-gray-600 font-medium">This ticket is closed.</p>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-10">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Select a ticket to view details</p>
              <p className="text-sm mt-1">or create a new one if you need assistance.</p>
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start sm:items-center justify-center p-1 sm:p-3 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-[96vw] sm:max-w-[85vw] md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto shadow-xl transform transition-all my-1 sm:my-4 flex flex-col max-h-[98vh] sm:max-h-[90vh] md:max-h-[80vh]">

            {/* Header - Compact */}
            <div className="flex justify-between items-center p-2 sm:p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate pr-2">Create Support Ticket</h2>
              <button onClick={() => setShowNewTicketForm(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 flex-shrink-0">
                <XCircle size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 min-h-0">
              <form onSubmit={handleCreateTicket} className="space-y-2 sm:space-y-3">

                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text" id="title" name="title"
                    value={newTicketData.title}
                    onChange={handleNewTicketInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-1.5 px-2 sm:px-3 focus:ring-accent-500 focus:border-accent-500 text-xs sm:text-sm"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    id="description" name="description"
                    value={newTicketData.description}
                    onChange={handleNewTicketInputChange}
                    rows={2}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-1.5 px-2 sm:px-3 focus:ring-accent-500 focus:border-accent-500 text-xs sm:text-sm resize-none"
                    required
                  />
                </div>

                {/* Priority and Order ID Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <div className="relative">
                    <label htmlFor="priority" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <div className="relative">
                      <select
                        id="priority" name="priority"
                        value={newTicketData.priority}
                        onChange={handleNewTicketInputChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-1.5 pl-2 sm:pl-3 pr-6 sm:pr-8 focus:ring-accent-500 focus:border-accent-500 text-xs sm:text-sm appearance-none bg-white"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.3rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1rem 1rem'
                        }}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="related_order_id" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Order ID <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text" id="related_order_id" name="related_order_id"
                      value={newTicketData.related_order_id || ''}
                      onChange={handleNewTicketInputChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-1.5 px-2 sm:px-3 focus:ring-accent-500 focus:border-accent-500 text-xs sm:text-sm"
                      placeholder="ORD12345"
                    />
                  </div>
                </div>

                {/* Product ID */}
                <div>
                  <label htmlFor="related_product_id" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Product ID <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text" id="related_product_id" name="related_product_id"
                    value={newTicketData.related_product_id || ''}
                    onChange={handleNewTicketInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-1 sm:py-1.5 px-2 sm:px-3 focus:ring-accent-500 focus:border-accent-500 text-xs sm:text-sm"
                    placeholder="PROD67890"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Attach Image <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleNewTicketImageChange}
                    className="block w-full text-xs sm:text-sm text-gray-500 file:mr-1 sm:file:mr-2 file:py-0.5 sm:file:py-1 file:px-1 sm:file:px-2 file:rounded file:border file:border-gray-300 file:text-xs file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                  {newTicketImagePreview && (
                    <div className="mt-2 relative w-10 h-10 sm:w-12 sm:h-12 border rounded">
                      <img src={newTicketImagePreview} alt="Preview" className="w-full h-full object-cover rounded" />
                      <button type="button" onClick={() => { setNewTicketImage(null); setNewTicketImagePreview(null); }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600">
                        <XCircle size={8} className="sm:w-2.5 sm:h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Footer - Compact */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-1 sm:gap-2 p-2 sm:p-3 md:p-4 border-t border-gray-200 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowNewTicketForm(false)}
                className="w-full sm:w-auto px-2 sm:px-3 py-1 sm:py-1.5 border border-gray-300 rounded-md text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleCreateTicket}
                disabled={isCreatingTicket}
                className="w-full sm:w-auto px-2 sm:px-3 py-1 sm:py-1.5 bg-accent-500 text-white rounded-md text-xs sm:text-sm font-medium hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50"
              >
                {isCreatingTicket ? 'Creating...' : 'Create Ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;