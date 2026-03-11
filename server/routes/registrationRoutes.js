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

router.get('/:id', getRegistrationById); 

router.delete('/:id', protect, deleteRegistration);



export default router;