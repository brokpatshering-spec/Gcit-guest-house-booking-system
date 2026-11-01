const GuestHouse = require('../models/GuestHouse');

// GET /api/guesthouse
exports.getGuestHouse = async (req, res) => {
  try {
    const details = await GuestHouse.findOne();
    return res.status(200).json(details || {});
  } catch (error) {
    console.error('Get GuestHouse Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error retrieving guest house details.' });
  }
};

// PUT /api/guesthouse
exports.updateGuestHouse = async (req, res) => {
  try {
    const { name, description, address, phone, email } = req.body;

    if (!name || !address) {
      return res
        .status(400)
        .json({ message: 'Name and address are required fields.' });
    }

    let guestHouse = await GuestHouse.findOne();

    if (guestHouse) {
      guestHouse.name = name;
      guestHouse.description = description;
      guestHouse.address = address;
      guestHouse.phone = phone;
      guestHouse.email = email;
      await guestHouse.save();
    } else {
      guestHouse = await GuestHouse.create({
        name,
        description,
        address,
        phone,
        email,
      });
    }

    return res.status(200).json({
      message: 'Guest house details updated successfully.',
      data: guestHouse,
    });
  } catch (error) {
    console.error('Update GuestHouse Error:', error);
    return res
      .status(500)
      .json({ message: 'Server error updating guest house details.' });
  }
};