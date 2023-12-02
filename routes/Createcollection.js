const express = require('express');
const router = express.Router();
const CreateController = require('../controller/CreatecontrollerNFT');

const path = require('path');
const fs = require('fs');


var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

router.post('/Createcollection', upload.single('logo'), CreateController.handleCreateCollection);
router.post('/CollectionList', CreateController.handleListCollection);

module.exports = router;