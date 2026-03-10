import express from 'express'; 

import { 
    createRegistration, 
    getRegistrations, 
    getRegistrationById, 
    deleteRegistration

} from '../controllers/registrationController.js';

import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/', protect, createRegistration);
router.get('/', protect, getRegistrations);
router.get('/:id', protect, getRegistrationById);
router.delete('/:id', protect, deleteRegistration);
router.get('/ticket/:id', getRegistrationById);

export default router;