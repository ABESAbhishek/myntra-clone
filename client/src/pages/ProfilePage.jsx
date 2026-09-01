import React, { useState, useEffect } from 'react';
import { User, MapPin, Package, Heart, Plus, Edit2, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import AddressModal from '../components/checkout/AddressModal';

const ProfilePage = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', gender: '' });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        gender: user.gender || 'male'
      });
    }
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const res = await api.get('/addresses');
      if (res.data.success) {
        setAddresses(res.data.addresses);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile(profileForm);
    if (res.success) {
      setIsEditingProfile(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      await api.delete(`/addresses/${id}`);
      await fetchAddresses();
    } catch (err) {
      console.error('Error deleting address', err);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await api.patch(`/addresses/${id}/default`);
      await fetchAddresses();
    } catch (err) {
      console.error('Error setting default address', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center select-none">
        <p className="text-sm font-bold text-myntra-dark mb-4">Please log in to manage your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white font-black text-2xl flex items-center justify-center shadow-md flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <h1 className="text-xl font-extrabold text-myntra-dark">{user?.name}</h1>
          <p className="text-xs text-myntra-muted">{user?.email}</p>
          {user?.phone && <p className="text-xs text-myntra-muted">Phone: {user?.phone}</p>}
          <span className="inline-block px-2.5 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-full uppercase mt-2">
            Verified Myntra Insider
          </span>
        </div>

        <div>
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="px-4 py-2 border border-gray-300 hover:border-myntra-pink text-xs font-bold rounded text-myntra-dark hover:text-myntra-pink transition-colors"
          >
            {isEditingProfile ? 'CANCEL' : 'EDIT PROFILE'}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-teal-50 text-teal-700 rounded-lg text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          Profile updated successfully!
        </div>
      )}

      {/* Profile Edit Form */}
      {isEditingProfile && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm animate-fadeIn">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-myntra-dark mb-4">
            Edit Personal Details
          </h3>
          <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-md text-xs">
            <div>
              <label className="block font-semibold text-myntra-dark mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-myntra-dark mb-1">Mobile Number</label>
              <input
                type="tel"
                maxLength={10}
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink"
              />
            </div>

            <div>
              <label className="block font-semibold text-myntra-dark mb-1">Gender</label>
              <select
                value={profileForm.gender}
                onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink capitalize"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-myntra-pink text-white font-bold rounded hover:bg-myntra-pinkDark transition-colors"
            >
              SAVE CHANGES
            </button>
          </form>
        </div>
      )}

      {/* Saved Addresses Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-myntra-dark flex items-center gap-2">
              <MapPin className="w-4 h-4 text-myntra-pink" />
              Saved Addresses ({addresses.length})
            </h2>
            <p className="text-xs text-myntra-muted mt-0.5">Manage your shipping destinations</p>
          </div>

          <button
            onClick={() => {
              setAddressToEdit(null);
              setIsAddressModalOpen(true);
            }}
            className="px-3.5 py-1.5 bg-myntra-pink text-white text-xs font-bold rounded hover:bg-myntra-pinkDark flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> ADD NEW ADDRESS
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 rounded-xl border text-xs space-y-2 relative transition-all ${
                addr.is_default
                  ? 'border-myntra-pink bg-myntra-pinkLight/20 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-myntra-dark text-sm">{addr.name}</span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded uppercase">
                    {addr.type}
                  </span>
                </div>
                {addr.is_default && (
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    DEFAULT
                  </span>
                )}
              </div>

              <p className="text-myntra-muted">{addr.address_line}, {addr.locality}</p>
              <p className="text-myntra-muted">{addr.city}, {addr.state} - <strong className="text-myntra-dark font-bold">{addr.pincode}</strong></p>
              <p className="text-myntra-dark font-semibold">Mobile: {addr.phone}</p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                {!addr.is_default ? (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-teal-700 font-bold hover:underline text-[11px]"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-gray-400 text-[11px]">Default Address</span>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setAddressToEdit(addr);
                      setIsAddressModalOpen(true);
                    }}
                    className="p-1 text-gray-500 hover:text-myntra-pink"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="p-1 text-gray-500 hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setAddressToEdit(null);
        }}
        addressToEdit={addressToEdit}
        onAddressSaved={fetchAddresses}
      />
    </div>
  );
};

export default ProfilePage;
