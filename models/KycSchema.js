const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({

    
    proofType: String,
    idprooffrontside: String,
    idproofbackside: String,
    userselfie: String,
    message: String,
    uploadDate: { type: Date, default: Date.now }, // Add created date and time field
  });
  
  const KYCModel = mongoose.model('KYC', kycSchema);