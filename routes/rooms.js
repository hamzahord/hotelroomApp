const express = require('express');
const HotelRoom = require('../models/HotelRoom');
const router = express.Router();

router.post('/rooms', async (req, res) => {
    try {
        const { roomNumber, roomType, pricePerNight, isBooked } = req.body;

        const existingRoom = await HotelRoom.findOne({ roomNumber });
        if (existingRoom) {
            return res.status(400).json({ message: 'Room number already exists' });
        }

        const newRoom = new HotelRoom({ roomNumber, roomType, pricePerNight, isBooked });
        await newRoom.save();

        return res.status(201).json(newRoom); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
