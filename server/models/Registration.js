import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // Adding the fields you are actually using in the controller
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  qrCode: { type: String }, // To store the Base64 QR string
  status: { type: String, default: 'Confirmed' }
}, { timestamps: true });

export default mongoose.model('Registration', registrationSchema);