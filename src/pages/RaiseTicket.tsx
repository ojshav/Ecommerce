import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  MessageSquare,
  Send,
  Clock,
  Plus,
  Search,
  Paperclip,
  XCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  CheckCircle
} from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface BackendMessage {
  id: number;
  ticket_id: number;
  sender_user_id: number;
  sender_name: string;
  sender_role: 'CUSTOMER' | 'MERCHANT' | 'ADMIN' | 'UNKNOWN';
  is_admin_reply: boolean;
  message_text: string;
  attachment_url?: string | null;
  created_at: string;
}

interface BackendTicket {
  id: number;
  ticket_uid: string;
  creator_user_id: number;
  creator_name: string;
  creator_role: 'customer' | 'merchant';
  merchant_id?: number;
  merchant_name?: string;
  title: string;
  description: string;
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
  messages?: BackendMessage[];
}

interface NewTicketData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  related_order_id?: string;
  related_product_id?: string;
}

const UserSupportPage: React.FC = () => {
  const { accessToken, isAuthenticated, user } = useAuth();

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
    priority: 'medium',
    related_order_id: '',
    related_product_id: ''
  });
  const [newTicketImage, setNewTicketImage] = useState<File | null>(null);
  const [newTicketImagePreview, setNewTicketImagePreview] = useState<string | null>(null);

  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedTicketMessages]);

  const fetchTickets = useCallback(async (page = 1) => {
    if (!accessToken || !isAuthenticated) {
      setIsLoading(false);
      if (!isAuthenticated && page === 1) toast.error("Please login to view your support tickets.");
      return;
    }
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: itemsPerPage.toString(),
        sort_by: '-updated_at'
      });
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const resp = await fetch(`${API_BASE_URL}/api/user/support/tickets?${params}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to fetch tickets');
      }
      const data = await resp.json();
      setTickets(data.tickets || []);
      if (data.pagination) {
        setTotalPages(data.pagination.total_pages || 1);
        setCurrentPage(data.pagination.current_page || 1);
      } else {
        setTotalPages(1);
        setCurrentPage(1);
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, isAuthenticated, filterStatus, searchQuery]);

  useEffect(() => {
    fetchTickets(currentPage);
  }, [fetchTickets, currentPage]);

  const fetchTicketMessages = async (uid: string) => {
    if (!accessToken) return;
    setIsLoadingMessages(true);
    try {
      const resp = await fetch(`${API_BASE_URL}/api/user/support/tickets/${uid}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (!resp.ok) throw new Error('Failed to fetch ticket details');
      const ticket: BackendTicket = await resp.json();
      setSelectedTicket(ticket);
      setSelectedTicketMessages(ticket.messages || []);
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (selectedTicket?.ticket_uid) {
      fetchTicketMessages(selectedTicket.ticket_uid);
    } else {
      setSelectedTicketMessages([]);
    }
  }, [selectedTicket?.ticket_uid]);

  const handleNewTicketInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicketData(prev => ({ ...prev, [name]: value }));
  };
  const handleNewTicketImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setNewTicketImage(null);
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) { toast.error("Image <5MB"); return; }
    setNewTicketImage(file);
    setNewTicketImagePreview(URL.createObjectURL(file));
  };
  const removeNewTicketImage = () => {
    setNewMessageAttachment(null);
    setNewTicketImage(null);
    setNewTicketImagePreview(null);
    const inp = document.getElementById('new-ticket-image-input') as HTMLInputElement;
    if (inp) inp.value = '';
  };
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketData.title.trim() || !newTicketData.description.trim()) {
      return toast.error("Title & description required");
    }
    if (!accessToken) return toast.error("Login required");
    setIsCreatingTicket(true);
    try {
      const form = new FormData();
      form.append('title', newTicketData.title);
      form.append('description', newTicketData.description);
      form.append('priority', newTicketData.priority);
      if (newTicketData.related_order_id) form.append('related_order_id', newTicketData.related_order_id);
      if (newTicketData.related_product_id) form.append('related_product_id', newTicketData.related_product_id);
      if (newTicketImage) form.append('image_file', newTicketImage);

      const resp = await fetch(`${API_BASE_URL}/api/user/support/tickets`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: form
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || `Error ${resp.status}`);
      }
      const created: BackendTicket = await resp.json();
      setTickets(prev => [created, ...prev].sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()));
      setShowNewTicketForm(false);
      setNewTicketData({ title: '', description: '', priority: 'medium', related_order_id: '', related_product_id: '' });
      removeNewTicketImage();
      toast.success("Ticket created");
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    } finally {
      setIsCreatingTicket(false);
    }
  };

  const handleMessageAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setNewMessageAttachment(null);
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) return toast.error("Attachment <5MB");
    setNewMessageAttachment(file);
  };
  const removeMessageAttachment = () => {
    setNewMessageAttachment(null);
    const inp = document.getElementById('user-message-attachment-input') as HTMLInputElement;
    if (inp) inp.value = '';
  };
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || (!newMessage.trim() && !newMessageAttachment)) {
      return toast.error("Enter a message or attach a file");
    }
    if (!accessToken) return toast.error("Login required");
    setIsSendingMessage(true);
    try {
      const form = new FormData();
      if (newMessage.trim()) form.append('message_text', newMessage.trim());
      if (newMessageAttachment) form.append('attachment_file', newMessageAttachment);

      const resp = await fetch(`${API_BASE_URL}/api/user/support/tickets/${selectedTicket.ticket_uid}/messages`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
        body: form
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to send');
      }
      const sent: BackendMessage = await resp.json();
      setSelectedTicketMessages(prev => [...prev, sent]);
      setNewMessage('');
      removeMessageAttachment();
      toast.success("Sent");
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleCloseTicketByUser = async () => {
    if (!selectedTicket || selectedTicket.status !== 'resolved') {
      return toast.error("Only resolved tickets may be closed");
    }
    if (!window.confirm("Close this ticket?")) return;
    try {
      const resp = await fetch(`${API_BASE_URL}/api/user/support/tickets/${selectedTicket.ticket_uid}/close`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to close');
      }
      const updated = await resp.json();
      setSelectedTicket(updated);
      setTickets(prev =>
        prev.map(t => (t.ticket_uid === updated.ticket_uid ? updated : t))
          .sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      );
      toast.success("Closed");
    } catch (e: any) {
      console.error(e);
      toast.error(e.message);
    }
  };

  const filteredAndSortedTickets = useMemo(() => {
    return tickets
      .filter(t => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.ticket_uid.toLowerCase().includes(q);
        const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a,b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  }, [tickets, searchQuery, filterStatus]);

  const getStatusColor = (status: BackendTicket['status']) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20';
      case 'in_progress': return 'bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-600/20';
      case 'awaiting_customer_reply': return 'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-600/20';
      case 'awaiting_merchant_reply': return 'bg-orange-100 text-orange-800 ring-1 ring-inset ring-orange-600/20';
      case 'resolved': return 'bg-indigo-100 text-indigo-700 ring-1 ring-inset ring-indigo-600/20';
      case 'closed': return 'bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-500/10';
      default: return 'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-500/10';
    }
  };
  const getPriorityColor = (priority: BackendTicket['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 ring-1 ring-inset ring-red-600/20';
      case 'medium': return 'bg-yellow-100 text-yellow-700 ring-1 ring-inset ring-yellow-600/20';
      case 'low': return 'bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20';
      default: return 'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-500/10';
    }
  };

  if (isLoading && tickets.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent-500"></div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-500">
        <MessageSquare size={48} />
        <p className="mt-4 text-lg">Please log in to view support tickets.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Support Center</h1>
          <p className="text-sm text-gray-600 mt-1">Get help with your orders and account</p>
        </div>
        <button
          onClick={() => { setShowNewTicketForm(true); setSelectedTicket(null); }}
          className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg shadow-lg hover:from-accent-600 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-all duration-200"
        >
          <Plus className="h-5 w-5 mr-2" /> New Ticket
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          
          <input
            type="text"
            placeholder="Search tickets by ID, title, or description..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white"
          />
        </div>
        <div className="relative w-full lg:w-64">
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value as typeof filterStatus); setCurrentPage(1); }}
            className="w-full py-3 pl-3 pr-10 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="awaiting_customer_reply">Awaiting Support Reply</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Main: List & Chat */}
      <div className="flex flex-1 overflow-hidden gap-8">
        {/* Ticket List */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-100">
          <div className="p-4 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-200 border-b border-orange-200 sticky top-0 z-10">
            <h2 className="text-lg font-semibold text-orange-900">Your Tickets ({filteredAndSortedTickets.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-orange-400">
            {filteredAndSortedTickets.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
                <MessageSquare size={48} className="mb-3 text-orange-400" />
                <p className="text-gray-600">No tickets found.</p>
              </div>
            ) : (
              filteredAndSortedTickets.map(ticket => (
                <div
                  key={ticket.ticket_uid}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    selectedTicket?.ticket_uid === ticket.ticket_uid
                      ? 'bg-orange-50 border-l-4 border-accent-500 shadow-inner'
                      : 'border-l-4 border-transparent hover:bg-orange-50/50'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-semibold text-gray-800 truncate flex-1">{ticket.title}</h3>
                    <span className={`ml-2 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">{ticket.description}</p>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">#{ticket.ticket_uid}</span>
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" /> {new Date(ticket.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-center items-center space-x-3">
              <button
                onClick={() => fetchTickets(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm font-medium text-gray-700">{currentPage} / {totalPages}</span>
              <button
                onClick={() => fetchTickets(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-100">
          {selectedTicket ? (
            <>
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 sticky top-0 z-10">
                <h2 className="text-lg font-semibold text-gray-800 truncate">{selectedTicket.title}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2.5 py-1 rounded-full font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority} priority
                  </span>
                  <span className={`px-2.5 py-1 rounded-full font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50 to-white">
                {isLoadingMessages ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-accent-500"></div>
                  </div>
                ) : selectedTicketMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <MessageSquare size={48} className="mx-auto mb-3 text-gray-400" />
                    {selectedTicket.description ? (
                      <div className="inline-block text-left bg-white p-6 rounded-lg shadow-md border border-gray-100 max-w-2xl">
                        <p className="font-medium text-gray-800 mb-2">Initial Query:</p>
                        <p className="whitespace-pre-wrap text-gray-600">{selectedTicket.description}</p>
                        {selectedTicket.image_url && (
                          <a href={selectedTicket.image_url} target="_blank" rel="noopener noreferrer" 
                             className="mt-3 inline-flex items-center text-sm text-accent-600 hover:text-accent-700">
                            <Paperclip size={14} className="mr-1" /> View Attachment
                          </a>
                        )}
                        <p className="text-xs text-gray-500 mt-3 text-right">
                          {selectedTicket.creator_name} at {new Date(selectedTicket.created_at).toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-600">No messages yet.</p>
                    )}
                  </div>
                ) : (
                  selectedTicketMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender_user_id?.toString() === user?.id?.toString() ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm border ${
                        msg.is_admin_reply
                          ? 'bg-white border-gray-200 text-gray-800'
                          : msg.sender_user_id?.toString() === user?.id?.toString()
                          ? 'bg-accent-500 text-white border-accent-600'
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.message_text}</p>
                        {msg.attachment_url && (
                          <a href={msg.attachment_url} target="_blank" rel="noopener noreferrer"
                             className={`mt-2 inline-flex items-center text-xs ${
                               msg.is_admin_reply ? 'text-accent-600 hover:text-accent-700' : 'text-white/90 hover:text-white'
                             }`}>
                            <Paperclip size={12} className="mr-1" /> View Attachment
                          </a>
                        )}
                        <p className={`mt-2 text-[11px] text-right ${
                          msg.is_admin_reply ? 'text-gray-500' : msg.sender_user_id?.toString() === user?.id?.toString() ? 'text-white/90' : 'text-gray-500'
                        }`}>
                          <span className="font-semibold">{msg.sender_name}</span> ({msg.sender_role})<br />
                          {new Date(msg.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              {(selectedTicket.status === 'open' || selectedTicket.status === 'in_progress' || selectedTicket.status === 'awaiting_customer_reply') && (
                <div className="p-4 bg-white border-t border-gray-200 sticky bottom-0 z-10">
                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <textarea
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      rows={3}
                      placeholder="Type your reply..."
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 resize-none"
                      disabled={isSendingMessage}
                    />
                    <div className="flex items-center justify-between">
                      <label htmlFor="user-message-attachment-input" 
                             className="cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                        <input
                          id="user-message-attachment-input"
                          type="file"
                          className="hidden"
                          onChange={handleMessageAttachmentChange}
                          disabled={isSendingMessage}
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={isSendingMessage || (!newMessage.trim() && !newMessageAttachment)}
                        className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg shadow hover:from-accent-600 hover:to-accent-700 disabled:opacity-50 transition-all duration-200"
                      >
                        {isSendingMessage ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                        ) : (
                          <Send className="w-5 h-5 mr-2" />
                        )}
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Resolved / Closed banners */}
              {selectedTicket.status === 'resolved' && (
                <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-700 mb-4">Ticket marked resolved. Close it if your issue is fixed.</p>
                  <button
                    onClick={handleCloseTicketByUser}
                    className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 shadow transition-all duration-200"
                  >
                    Mark as Closed
                  </button>
                </div>
              )}
              {selectedTicket.status === 'closed' && (
                <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 text-center">
                  <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
                  <p className="font-medium text-gray-800 text-lg mb-2">This ticket is closed.</p>
                  <p className="text-sm text-gray-600">Create a new ticket for further assistance.</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-12 bg-gradient-to-br from-orange-50 via-white to-orange-50">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-orange-200 rounded-full blur-xl opacity-20 animate-pulse"></div>
                <MessageSquare size={72} className="relative text-orange-400" />
              </div>
              <div className="text-center max-w-md">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-3">
                  Select a Ticket
                </h3>
                <p className="text-gray-600 mb-6">
                  Choose a ticket from the list to view the conversation and manage your support request.
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <span>View ticket details and status</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <span>Read and send messages</span>
                  </div>
                  
                </div>
                <div className="mt-8 pt-6 border-t border-orange-100">
                  <button
                    onClick={() => { setShowNewTicketForm(true); setSelectedTicket(null); }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" /> Create New Ticket
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] overflow-y-auto">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Create New Support Ticket</h2>
              <button onClick={() => setShowNewTicketForm(false)} 
                      className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                <XCircle size={28} />
              </button>
            </div>
            <form onSubmit={handleCreateTicket} className="space-y-6">
              <div>
                <label htmlFor="new-title" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="new-title"
                  name="title"
                  value={newTicketData.title}
                  onChange={handleNewTicketInputChange}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="new-description" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="new-description"
                  name="description"
                  value={newTicketData.description}
                  onChange={handleNewTicketInputChange}
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="new-priority" className="block text-sm font-medium text-gray-700 mb-1.5">Priority</label>
                  <div className="relative">
                    <select
                      id="new-priority"
                      name="priority"
                      value={newTicketData.priority}
                      onChange={handleNewTicketInputChange}
                      className="w-full border border-gray-200 rounded-lg p-2.5 appearance-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    
                  </div>
                </div>
                <div>
                  <label htmlFor="new-related_order_id" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    id="new-related_order_id"
                    name="related_order_id"
                    value={newTicketData.related_order_id}
                    onChange={handleNewTicketInputChange}
                    className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    placeholder="e.g., ORD123"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="new-related_product_id" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product ID (Optional)
                </label>
                <input
                  type="text"
                  id="new-related_product_id"
                  name="related_product_id"
                  value={newTicketData.related_product_id}
                  onChange={handleNewTicketInputChange}
                  className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="e.g., PROD456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Attach Image (Optional)</label>
                <input
                  id="new-ticket-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleNewTicketImageChange}
                  className="w-full text-sm text-gray-500 file:rounded-lg file:border file:px-4 file:py-2.5 file:bg-gradient-to-r file:from-gray-50 file:to-gray-100 file:text-gray-700 hover:file:from-gray-100 hover:file:to-gray-200 cursor-pointer"
                />
                {newTicketImagePreview && (
                  <div className="mt-3 relative w-32 h-32 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                    <img src={newTicketImagePreview} alt="Preview" className="w-full h-full object-contain" />
                    <button
                      type="button"
                      onClick={removeNewTicketImage}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                )}
                <p className="mt-1.5 text-xs text-gray-500">Max 5MB. JPG, PNG, GIF, WEBP.</p>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewTicketForm(false)}
                  className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingTicket}
                  className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg hover:from-accent-600 hover:to-accent-700 disabled:opacity-50 transition-all duration-200 shadow-sm"
                >
                  {isCreatingTicket ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  {isCreatingTicket ? 'Submitting...' : 'Submit Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSupportPage;