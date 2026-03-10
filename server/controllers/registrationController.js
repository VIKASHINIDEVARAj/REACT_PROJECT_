import Registration from '../models/Registration.js';
import QRCode from 'qrcode';

// @desc    Create new registration & generate Magic Link QR
export const createRegistration = async (req, res) => {
    try {
        const { name, email, phone, college } = req.body;

        // 1. Aagave register aagirukka nu check panrom
        const existingReg = await Registration.findOne({ email });
        if (existingReg) {
            return res.status(400).json({ message: 'Email already registered, kiddo!' });
        }

        // 2. Database-la record create panrom
        const newRegistration = new Registration({
            user: req.user._id, 
            name,
            email,
            phone,
            college
        });

        // 3. ID-a vachi Magic Link uruvaakki QR Code generate panrom
        const magicLink = `http://localhost:5173/ticket/${newRegistration._id}`;
        const qrCodeImage = await QRCode.toDataURL(magicLink);

        // 4. QR-a database-la attach panni save panrom
        newRegistration.qrCode = qrCodeImage;
        await newRegistration.save();

        res.status(201).json(newRegistration);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all registrations (For Admin)
export const getRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
};

// @desc    Get specific ticket by ID (For our Ticket.jsx page!)
export const getRegistrationById = async (req, res) => {
    try {
        const reg = await Registration.findById(req.params.id);
        if (!reg) return res.status(404).json({ message: 'Ticket Not Found' });
        res.json(reg);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ticket' });
    }
};

// @desc    Delete registration
export const deleteRegistration = async (req, res) => {
    try {
        await Registration.findByIdAndDelete(req.params.id);
        res.json({ message: 'Registration deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting' });
    }
};