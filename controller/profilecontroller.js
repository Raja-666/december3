const profileModel = require('../models/profileSchema')

// const Collection = require('../models/Profileschema');

    const handleUpdateProfile = async (req, res) => {
    try {

        const filePath = req.files;

        console.log('filePath', filePath) // [{} , {} ]

        const { userName, Bio, userEmail, website } = req.body;
        // const profileImg = req.files['profileImg'][0].filename;
        // const coverImg = req.files['coverImg'][0].filename;
        
        const profileData = new profileModel({
            profileImg: filePath,
            coverImg: filePath,
            userName,
            Bio,
            userEmail,
            website
          });

          await profileData.save();

        res.status(200).json({ message: 'profile created successfully' });


    } catch (error) {
        res.status(400).json({ message: "Upload Failed", error: error.message });


    }
}


module.exports = { handleUpdateProfile };