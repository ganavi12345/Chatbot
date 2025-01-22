# Chatbot Application

A simple, interactive chatbot built with React. This chatbot responds to user messages, detects sentiment, and replies accordingly. It uses emojis for sentiment feedback and allows users to clear the conversation.

## Features

- **Sentiment Detection**: Detects whether the user's message is positive, negative, or angry and responds accordingly.
- **Dynamic Bot Responses**: Responds to common phrases like greetings, farewells, and thank-yous.
- **Emoji Feedback**: The bot displays emojis based on the sentiment of the user's message (happy, sad, angry).
- **LocalStorage**: Stores conversation history in the browser's local storage so the chat persists across page reloads.
- **Clear Chat**: Option to clear the entire chat history with a single click.

## File Structure

chatbot-app
├── src
│   ├── App.js                // Main React component (logic and UI)
│   ├── App.css               // Stylesheet for the chatbot application
│   ├── index.js              // Entry point for the React application
│   └── index.css             // Global CSS styles (optional)
├── public
│   ├── index.html            // Main HTML file for the app
│   └── favicon.ico           // App favicon
├── .gitignore                // Files and folders to ignore in Git
├── package.json              // Dependencies and npm scripts
├── package-lock.json         // Exact versions of installed dependencies
└── README.md                 // Documentation for the project



## Installation

1. Clone this repository to your local machine.

    ```bash
    git clone https://github.com/yourusername/chatbot-app.git
    cd chatbot-app
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

   This will launch the app in your default browser at `http://localhost:3000`.

## Example Usage

1. **Greeting**:
   - User: `Hello`
   - Bot: `Hello! How can I assist you today?`

2. **User feeling good** (Positive Sentiment):
   - User: `I'm feeling great today!`
   - Bot: `That's awesome! I'm glad you're feeling good!` 😊

3. **User feeling sad** (Negative Sentiment):
   - User: `I'm feeling really sad...`
   - Bot: `Oh no, I'm sorry you're feeling down. How can I help?` 😔

4. **User feeling angry** (Angry Sentiment):
   - User: `I'm really angry right now!`
   - Bot: `Whoa, sounds like you're really upset. Want to talk about it?` 😡

5. **Farewell**:
   - User: `Goodbye!`
   - Bot: `Goodbye! Have a great day!`

## How to Use

- Type a message in the input box and press **Send** or hit Enter.
- The bot will respond with an appropriate message, showing the sentiment through emojis.
- You can clear the conversation by clicking the **Clear Chat** button in the top-right corner.
  
## Technologies Used

- React (JavaScript Library)
- React Icons for emoticons and icons
- LocalStorage for saving chat history


