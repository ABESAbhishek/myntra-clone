import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import api from '../../api/client';

const AddressModal = ({ isOpen, onClose, addressToEdit = null, onAddressSaved }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    address_line: '',
    locality: '',
    city: '',
    state: '',
    type: 'Home',
    is_default: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        name: addressToEdit.name || '',
        phone: addressToEdit.phone || '',
        pincode: addressToEdit.pincode || '',
        address_line: addressToEdit.address_line || '',
        locality: addressToEdit.locality || '',
        city: addressToEdit.city || '',
        state: addressToEdit.state || '',
        type: addressToEdit.type || 'Home',
        is_default: !!addressToEdit.is_default
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        pincode: '',
        address_line: '',
        locality: '',
        city: '',
        state: '',
        type: 'Home',
        is_default: false
      });
    }
    setError('');
  }, [addressToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.pincode || !formData.address_line || !formData.city || !formData.state) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      let res;
      if (addressToEdit) {
        res = await api.put(`/addresses/${addressToEdit.id}`, formData);
      } else {
        res = await api.post('/addresses', formData);
      }

      if (res.data.success) {
        onAddressSaved();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-myntra-dark">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-myntra-pinkLight text-myntra-pink flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-myntra-dark">
              {addressToEdit ? 'Edit Delivery Address' : 'Add New Delivery Address'}
            </h3>
            <p className="text-xs text-myntra-muted">Where should we deliver your order?</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-2.5 bg-red-50 text-red-600 rounded text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Contact Details */}
          <p className="font-bold text-myntra-dark uppercase tracking-wider text-[11px] pt-1">
            Contact Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-myntra-dark mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-myntra-dark mb-1">Mobile No *</label>
              <input
                type="tel"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                placeholder="10-digit mobile number"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink"
                required
              />
            </div>
          </div>

          {/* Address Details */}
          <p className="font-bold text-myntra-dark uppercase tracking-wider text-[11px] pt-2">
            Address Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-myntra-dark mb-1">Pincode *</label>
              <input
                type="text"
                maxLength={6}
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                placeholder="6-digit pincode"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-myntra-dark mb-1">Locality / Area</label>
              <input
                type="text"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                placeholder="Locality or Landmark"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-myntra-dark mb-1">Address (House No, Building, Street) *</label>
            <textarea
              rows={2}
              value={formData.address_line}
              onChange={(e) => setFormData({ ...formData, address_line: e.target.value })}
              placeholder="Flat / House No., Floor, Building Name, Street"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-myntra-dark mb-1">City / District *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-myntra-dark mb-1">State *</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-myntra-pink"
                required
              />
            </div>
          </div>

          {/* Address Type */}
          <div>
            <label className="block font-semibold text-myntra-dark mb-1.5">Type of Address</label>
            <div className="flex gap-4">
              {['Home', 'Work'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="addressType"
                    checked={formData.type === type}
                    onChange={() => setFormData({ ...formData, type })}
                    className="text-myntra-pink focus:ring-myntra-pink accent-myntra-pink"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Default Checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_default}
                onChange={(e) => setFormData({ ...formData, is_default: e.target.checked })}
                className="rounded text-myntra-pink focus:ring-myntra-pink accent-myntra-pink"
              />
              <span className="text-myntra-muted">Make this my default delivery address</span>
            </label>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-xs font-bold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-myntra-pink text-white rounded text-xs font-bold hover:bg-myntra-pinkDark transition-colors"
            >
              {loading ? 'Saving...' : 'SAVE ADDRESS'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
