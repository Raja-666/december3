const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Collection = require('../models/Schema');


// Multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
}).single("imageFile");


const handleCreateCollection = async (req, res) => {
  console.log(req.file, 'req.filereq.file');
  try {
    if (!req.file) {
      return res.json({ status: false, message: "Image file missing.." })
    }

    const filePath = req.file.path;

    console.log('filePath0', filePath)

    if (!fs.existsSync(filePath)) {
      return res.status(400).json({ message: "Uploaded logo file not found" });
    }

    const { collectionName, description, collectionUrl, address } = req.body;

    const sameCollectionName = await Collection.findOne({ collectionName: collectionName });
    if (sameCollectionName) {
      return res.status(400).json({
        message: "Collection Name Already Exists",
      });
    }

    const sameImage = await Collection.findOne({ logo: filePath });
    if (sameImage) {
      fs.unlinkSync(filePath); // Delete the duplicate image file
      return res.status(400).json({
        message: "Duplicate Image. Please choose a different image.",
      });
    }

    const newCollection = new Collection({
      logo: filePath, // Save the path to the uploaded logo
      collectionName,
      description,
      collectionUrl,
      address
    });

    await newCollection.save();

    res.status(200).json({ success: true, message: 'Collection created successfully' });

  } catch (error) {
    res.status(400).json({ success: false, message: 'Err-: ' + error.message });
  }
};

const handleListCollection = async (req , res) => {
  try {
    
    const reqData = req.body;

    if (!reqData.address) {
      return res.json({ status: false, message: "Wallet address missing.." })
    }


    
    
    
    let pipepline = [
      {
        '$match': {
          'address': reqData.address
        }
      }, {
        '$project': {
          'collectionName': 1, 
          'collectionUrl': 1
        }
      }
    ]
    
    const colData = await Collection.aggregate(pipepline)

    res.status(200).json({ success: true, data:colData, message: 'Collection List' });


  } catch (error) {
    
  }
}

module.exports = { handleCreateCollection , handleListCollection };