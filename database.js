const mongoose = require("mongoose");
require('dotenv').config();

exports.connectMongoose = () => {
    mongoose
        .connect(
            process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        )
        .then((e) => console.log(`connected to mongodb: ${e.connection.host}`))
        .catch((e) => console.log(e));
};


  
const userSchema = new mongoose.Schema({
    userid: {
      type: String,
      required: true,
      unique: true, // Assuming each user has a unique ID
    },
    email: {
      type: String,
      required: true,
      unique: true, // Assuming each user has a unique email
    },
    // Other user-related fields you may want to include
  });
  





const gratitudeNoteSchema = new mongoose.Schema({
    title: String,
    content: {
        type: String,
        required: true,
    },
    uniqueId: String,
});


// const profile = new mongoose.Schema({
//     User: object,
//     notes: {
//         type:Array
//     },
  
//   });



exports.GratitudeNote = mongoose.model("GratitudeNote", gratitudeNoteSchema);

 exports.User = mongoose.model("User", userSchema);


 const noteSchema = new mongoose.Schema({
   

    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    uniqueId: {
      type: String,
      
    },
    // Other note-related fields you may want to include
  });
  

  exports.Note = mongoose.model("Note", noteSchema);
