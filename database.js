const mongoose = require("mongoose");

exports.connectMongoose = () => {
    mongoose
        .connect(
            "mongodb+srv://prabh2508:2jfuiTp5v7LmdwFz@cluster0.skvjeds.mongodb.net/shukranaTest", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        )
        .then((e) => console.log(`connected to mongodb: ${e.connection.host}`))
        .catch((e) => console.log(e));
};

const gratitudeNoteSchema = new mongoose.Schema({
    title: String,
    note: {
        type: String,
        required: true,
    },
    category: String,
});


// const profile = new mongoose.Schema({
//     User: object,
//     notes: {
//         type:Array
//     },
  
//   });

// const userSchema = new mongoose.Schema({
//     name: String,
//     username:{
//         type: String,
//         required:true,
//         unique: true,
//     },
//     password: String
// })

exports.GratitudeNote = mongoose.model("GratitudeNote", gratitudeNoteSchema);

// exports.User = mongoose.model("User", userSchema);
