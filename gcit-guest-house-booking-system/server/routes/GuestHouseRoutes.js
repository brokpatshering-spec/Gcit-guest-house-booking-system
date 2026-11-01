const express = require('express');
const router = express.Router();
const guestHouseController = require('../controllers/GuestHouseController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
router.get('/', guestHouseController.getGuestHouse);
router.put('/', authMiddleware, checkRole('admin'),
guestHouseController.updateGuestHouse);
module.exports = router;