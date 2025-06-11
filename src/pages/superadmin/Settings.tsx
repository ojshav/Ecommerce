import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, X, Pencil, AlertCircle } from 'lucide-react';

interface AdminUser {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  lastLogin: string;
  emailNotifications: boolean;
}

const Settings: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<{ visible: boolean; adminIndex: number | null; adminName: string; } | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [admins, setAdmins] = useState<AdminUser[]>(() => {
    const storedAdmins = localStorage.getItem('adminUsers');
    return storedAdmins
      ? JSON.parse(storedAdmins)
      : [
          {
            username: 'admin',
            email: 'admin@scalixity.com',
            firstName: '',
            lastName: '',
            role: 'Super Admin',
            lastLogin: new Date().toLocaleString(),
            emailNotifications: true,
          },
        ];
  });

  const [form, setForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    role: 'Admin',
    emailNotifications: false,
  });

  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
        setError('');
        setIsEdit(false);
        setEditIndex(null);
      }
    }
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(admins));
  }, [admins]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.email || !form.firstName || !form.lastName || (!isEdit && (!form.password || !form.confirmPassword))) {
      setError('Please fill all required fields.');
      return;
    }
    if (!isEdit && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (isEdit && editIndex !== null) {
      setAdmins(prev => prev.map((admin, idx) => idx === editIndex ? {
        ...admin,
        username: form.username,
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        emailNotifications: form.emailNotifications,
      } : admin));
      setIsEdit(false);
      setEditIndex(null);
    } else {
      setAdmins(prev => [
        ...prev,
        {
          username: form.username,
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          role: form.role,
          lastLogin: new Date().toLocaleString(),
          emailNotifications: form.emailNotifications,
        },
      ]);
    }
    setShowModal(false);
    setForm({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      role: 'Admin',
      emailNotifications: false,
    });
  };

  const handleEditAdmin = (idx: number) => {
    const admin = admins[idx];
    setForm({
      username: admin.username,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      password: '',
      confirmPassword: '',
      role: admin.role,
      emailNotifications: admin.emailNotifications,
    });
    setIsEdit(true);
    setEditIndex(idx);
    setShowModal(true);
    setError('');
  };

  const handleDeleteClick = (index: number, adminName: string) => {
    setShowDeleteModal({ visible: true, adminIndex: index, adminName });
  };

  const handleConfirmDelete = () => {
    if (showDeleteModal && showDeleteModal.adminIndex !== null) {
      const updatedAdmins = admins.filter((_, i) => i !== showDeleteModal.adminIndex);
      setAdmins(updatedAdmins);
      setShowDeleteModal(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(null);
  };

  return (
    <div className="min-h-[80dvh] p-6 md:p-10 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden">



      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-orange-500 drop-shadow-sm">Admin Users Management</h1>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm font-semibold"
          onClick={() => { setShowModal(true); setIsEdit(false); setForm({ username: '', email: '', firstName: '', lastName: '', password: '', confirmPassword: '', role: 'Admin', emailNotifications: false }); }}
        >
          <Plus className="w-5 h-5" />
          Add New Admin
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-x-auto border border-orange-100">
        <table className="min-w-full divide-y divide-orange-200">
          <thead className="bg-orange-100 text-orange-500 font-semibold">
            <tr>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Email</th>
              <th className="px-8 py-3 text-left text-xs uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-center text-xs uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-orange-100">
            {admins.map((admin, idx) => (
              <tr key={idx} className="hover:bg-orange-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.firstName} {admin.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="inline-flex items-center justify-center bg-green-100 text-green-700 text-xs font-medium rounded-full pl-2 pr-2 py-1">
                    {admin.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-2">
                  <button className="text-orange-400 hover:text-orange-500 transition-colors" onClick={() => handleEditAdmin(idx)} title="Edit">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button className="text-orange-400 hover:text-orange-500 transition-colors" onClick={() => handleDeleteClick(idx, `${admin.firstName} ${admin.lastName}`)} title="Delete">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && showDeleteModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="flex items-center justify-start mb-4">
              <AlertCircle className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Confirm Deletion</h3>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-700">
                Are you sure you want to delete the admin user '<strong>{showDeleteModal.adminName}</strong>'? This action cannot be undone.
              </p>
            </div>
            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500 text-base font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div ref={modalRef} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-8 relative border border-orange-200 animate-scaleIn">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-orange-500" onClick={() => { setShowModal(false); setError(''); setIsEdit(false); setEditIndex(null); }}>
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-6 text-orange-500">{isEdit ? 'Edit Admin User' : 'Add New Admin User'}</h2>
            <form className="space-y-4" onSubmit={handleAddUser}>
              <input name="username" value={form.username} onChange={handleInputChange} type="text" placeholder="Username *" className="w-full border border-orange-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm" disabled={isEdit} />
              <input name="email" value={form.email} onChange={handleInputChange} type="email" placeholder="Email Address *" className="w-full border border-orange-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm" />
              <div className="flex gap-4">
                <input name="firstName" value={form.firstName} onChange={handleInputChange} type="text" placeholder="First Name *" className="w-1/2 border border-orange-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm" />
                <input name="lastName" value={form.lastName} onChange={handleInputChange} type="text" placeholder="Last Name *" className="w-1/2 border border-orange-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm" />
              </div>
              {!isEdit && (
                <div className="flex gap-4">
                  <input name="password" value={form.password} onChange={handleInputChange} type="password" placeholder="Password *" className="w-1/2 border border-orange-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm" />
                  <input name="confirmPassword" value={form.confirmPassword} onChange={handleInputChange} type="password" placeholder="Confirm Password *" className="w-1/2 border border-orange-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm" />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                <select name="role" value={form.role} onChange={handleInputChange} className="w-full border border-orange-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm">
                  <option>Admin</option>
                </select>
              </div>
              {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" className="bg-orange-50 text-orange-500 px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-100 transition-colors border border-orange-200" onClick={() => { setShowModal(false); setError(''); setIsEdit(false); setEditIndex(null); }}>
                  Cancel
                </button>
                <button type="submit" className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  {isEdit ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
