const mongoose = require('mongoose');
const connectionURL = "mongodb://127.0.0.1:27017/CreateNFTCollection";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`MongoDB Server Connecting Success`))
.catch(err => console.error(`Error connecting to MongoDB: ${err.message}`));
