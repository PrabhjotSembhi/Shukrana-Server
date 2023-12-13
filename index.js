const express = require("express");
const { connectMongoose, GratitudeNote, User } = require("./database.js");
connectMongoose();
const cors = require('cors'); // Add this line to import cors

const app = express();

app.get("/", (req, res) => {
  res.send("home");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.get("/", (req, res) => {
  res.send("Hello World");
});


// Update your backend endpoint
app.get('/api/gratitude-pages', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit: 10 notes per page

    const skip = (page - 1) * limit;

    const notes = await GratitudeNote.find()
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching gratitude notes:', error);
    res.status(500).json({ error: 'Failed to fetch gratitude notes' });
  }
});


// Update your backend endpoint
app.get('/api/gratitude', async (req, res) => {

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit: 10 notes per page

    const skip = (page - 1) * limit;

    const uniqueId = req.query.uniqueId;
    console.log(uniqueId, req)

    // Find notes associated with the provided email
    const notes = await GratitudeNote.find({uniqueId})
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching gratitude notes:', error);
    res.status(500).json({ error: 'Failed to fetch gratitude notes' });
  }





});





app.post('/api/gratitude', async (req, res) => {
  try {
    // Extract data from the request body
    const { title, content, uniqueId } = req.body;

    // Create a new GratitudeNote instance
    const newNote = new GratitudeNote({
      title,
      content,
      uniqueId,
    });

    // Save the new note to the database
    await newNote.save();

    res.status(201).json({ message: 'Gratitude note added successfully' });
  } catch (error) {
    console.error('Error saving gratitude note:', error);
    res.status(500).json({ error: 'Failed to add gratitude note' });
  }
});






// app.post('/api/store-user', (req, res) => {
//   const userData = req.body; // User data sent from the frontend
//   console.log('enter', req.body)
//   // Check if the user already exists in the database based on the userId or email
//   // Perform a database query to check for existing user by userId or email

//   // Example using MongoDB with Mongoose
//   User.findOne({ email: userData.email }) // Assuming 'userId' is the unique identifier
//     .then((existingUser) => {
//       console.log('in in find')

//       if (!existingUser) {
//         console.log('in if')

//         // If the user doesn't exist, store the userData in the database
//         return User.create(userData);

//       }
//       // If the user already exists, send a message indicating so
//       return Promise.reject('User already exists in the database');
//     })
//     .then(() => {
//       console.log('in then')

//       res.status(201).json({ message: 'User data stored successfully' });
//     })
//     .catch((error) => {
//       console.log('in err', error)

//       res.status(500).json({ message: 'Failed to store user data', error });
//     });

//   console.log('if came after "enter" not findint it')

// });







app.listen(4000, () => {
  console.log("listening to port 4000");
});
