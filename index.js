const express = require("express");
const { connectMongoose, GratitudeNote } = require("./database.js");
connectMongoose();
const cors = require('cors'); // Add this line to import cors

const app = express();

app.get("/", (req, res) => {
  res.send("home");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Enable CORS for all routes

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



app.get('/api/gratitude-notes', async (req, res) => {
    try {
      // Fetch all gratitude notes from the database
      const notes = await GratitudeNote.find();
  
      res.status(200).json(notes);
    } catch (error) {
      console.error('Error fetching gratitude notes:', error);
      res.status(500).json({ error: 'Failed to fetch gratitude notes' });
    }
  });

app.post('/api/gratitude', async (req, res) => {
    try {
      // Extract data from the request body
      const { title, note, category } = req.body;
  
      // Create a new GratitudeNote instance
      const newNote = new GratitudeNote({
        title,
        note,
        category,
      });
  
      // Save the new note to the database
      await newNote.save();
  
      res.status(201).json({ message: 'Gratitude note added successfully' });
    } catch (error) {
      console.error('Error saving gratitude note:', error);
      res.status(500).json({ error: 'Failed to add gratitude note' });
    }
  });


app.listen(4000, () => {
  console.log("listening to port 4000");
});
