// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();  // Import sqlite3 for database operations

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database('./chatbot.db');

// Function to generate a response using simple logic
const getBotResponse = (userMessage) => {
  // Example responses for simple phrases
  const responses = {
    "hello": "Hi there! How can I help you today?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "bye": "Goodbye! Have a great day!",
  };

  // Convert message to lowercase for comparison
  const messageLowerCase = userMessage.toLowerCase();

  // Return a response based on the message, else return a default response
  return responses[messageLowerCase] || "I'm not sure how to respond to that. Can you ask something else?";
};

// Route for handling user messages
app.post('/api/message', (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);

  // Get bot's response
  const reply = getBotResponse(message);
  console.log('Bot reply:', reply);

  // Save conversation to the database
  db.run("INSERT INTO messages (user, bot) VALUES (?, ?)", [message, reply], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

  // Send bot's response back
  res.json({ reply });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
