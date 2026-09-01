const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { authMiddleware } = require('../middleware/auth');

router.use(authMiddleware);

// GET /api/addresses
router.get('/', (req, res) => {
  try {
    const addresses = db.findAll('addresses', { user_id: req.user.id });
    return res.json({
      success: true,
      addresses
    });
  } catch (err) {
    console.error('Fetch addresses error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching addresses.' });
  }
});

// POST /api/addresses
router.post('/', (req, res) => {
  try {
    const { name, phone, pincode, address_line, locality, city, state, type = 'Home', is_default = false } = req.body;
    
    if (!name || !phone || !pincode || !address_line || !city || !state) {
      return res.status(400).json({ success: false, message: 'Please provide all required address fields.' });
    }

    const userAddresses = db.findAll('addresses', { user_id: req.user.id });
    
    // If setting as default or if this is the user's first address, update others
    const shouldBeDefault = is_default || userAddresses.length === 0;
    if (shouldBeDefault) {
      userAddresses.forEach(addr => {
        db.update('addresses', addr.id, { is_default: false });
      });
    }

    const newAddress = db.insert('addresses', {
      user_id: req.user.id,
      name: name.trim(),
      phone: phone.trim(),
      pincode: pincode.trim(),
      address_line: address_line.trim(),
      locality: (locality || '').trim(),
      city: city.trim(),
      state: state.trim(),
      type: type || 'Home',
      is_default: shouldBeDefault
    });

    return res.status(201).json({
      success: true,
      message: 'Address added successfully!',
      address: newAddress
    });
  } catch (err) {
    console.error('Add address error:', err);
    return res.status(500).json({ success: false, message: 'Server error adding address.' });
  }
});

// PUT /api/addresses/:id
router.put('/:id', (req, res) => {
  try {
    const address = db.findById('addresses', req.params.id);
    if (!address || address.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Address not found.' });
    }

    const { name, phone, pincode, address_line, locality, city, state, type, is_default } = req.body;

    if (is_default) {
      const userAddresses = db.findAll('addresses', { user_id: req.user.id });
      userAddresses.forEach(addr => {
        if (addr.id !== address.id) {
          db.update('addresses', addr.id, { is_default: false });
        }
      });
    }

    const updated = db.update('addresses', address.id, {
      ...(name && { name: name.trim() }),
      ...(phone && { phone: phone.trim() }),
      ...(pincode && { pincode: pincode.trim() }),
      ...(address_line && { address_line: address_line.trim() }),
      ...(locality !== undefined && { locality: locality.trim() }),
      ...(city && { city: city.trim() }),
      ...(state && { state: state.trim() }),
      ...(type && { type }),
      ...(is_default !== undefined && { is_default })
    });

    return res.json({
      success: true,
      message: 'Address updated successfully!',
      address: updated
    });
  } catch (err) {
    console.error('Update address error:', err);
    return res.status(500).json({ success: false, message: 'Server error updating address.' });
  }
});

// DELETE /api/addresses/:id
router.delete('/:id', (req, res) => {
  try {
    const address = db.findById('addresses', req.params.id);
    if (!address || address.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Address not found.' });
    }

    db.delete('addresses', address.id);
    return res.json({
      success: true,
      message: 'Address deleted successfully!'
    });
  } catch (err) {
    console.error('Delete address error:', err);
    return res.status(500).json({ success: false, message: 'Server error deleting address.' });
  }
});

// PATCH /api/addresses/:id/default
router.patch('/:id/default', (req, res) => {
  try {
    const address = db.findById('addresses', req.params.id);
    if (!address || address.user_id !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Address not found.' });
    }

    const userAddresses = db.findAll('addresses', { user_id: req.user.id });
    userAddresses.forEach(addr => {
      db.update('addresses', addr.id, { is_default: addr.id === address.id });
    });

    return res.json({
      success: true,
      message: 'Default address updated!'
    });
  } catch (err) {
    console.error('Set default address error:', err);
    return res.status(500).json({ success: false, message: 'Server error updating default address.' });
  }
});

module.exports = router;
