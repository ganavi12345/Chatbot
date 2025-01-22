import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaRobot, FaUser, FaTrashAlt, FaRegSmile, FaSadTear, FaRegMeh, FaAngry } from 'react-icons/fa'; // Added angry icon

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Reference to scroll to the bottom when new messages are added
  const messagesEndRef = useRef(null);

  // Load previous messages from localStorage on page load
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages'));

    // Always add the welcome message when the app is first loaded
    if (!savedMessages || savedMessages.length === 0) {
      setMessages([{ user: 'Chatbot', text: 'Hello! I\'m your friendly chatbot. How can I assist you today?', type: 'bot' }]);
    } else {
      setMessages(savedMessages); // Load saved messages
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    
    // Scroll to bottom when messages are updated
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to detect sentiment based on keywords
  const detectSentiment = (message) => {
    const positiveWords = ['good', 'great', 'happy', 'awesome', 'love', 'fantastic'];
    const negativeWords = ['bad', 'sad', 'angry', 'hate', 'terrible', 'upset'];
    const angryWords = ['angry', 'furious', 'mad', 'rage'];

    let sentiment = 'neutral';
    positiveWords.forEach((word) => {
      if (message.toLowerCase().includes(word)) sentiment = 'positive';
    });
    negativeWords.forEach((word) => {
      if (message.toLowerCase().includes(word)) sentiment = 'negative';
    });
    angryWords.forEach((word) => {
      if (message.toLowerCase().includes(word)) sentiment = 'angry';
    });

    return sentiment;
  };

  // Function to get the appropriate bot response based on sentiment or message content
  const getBotResponse = (inputMessage) => {
    const message = inputMessage.toLowerCase();

    // Handle common greetings and phrases
    if (message.includes('hello') || message.includes('hi')) {
      return "Hello! How can I assist you today?";
    }
    if (message.includes('how are you')) {
      return "I'm doing great! How about you?";
    }
    if (message.includes('bye') || message.includes('goodbye')) {
      return "Goodbye! Have a great day!";
    }
    if (message.includes('thank you') || message.includes('thanks')) {
      return "You're welcome! Let me know if you need anything else.";
    }
    if (message.includes('sorry')) {
      return "No problem! It's okay.";
    }

    // If the message doesn't match any of the common cases, use sentiment analysis
    const sentiment = detectSentiment(inputMessage);

    switch (sentiment) {
      case 'positive':
        return "That's awesome! I'm glad you're feeling good!";
      case 'negative':
        return "Oh no, I'm sorry you're feeling down. How can I help?";
      case 'angry':
        return "Whoa, sounds like you're really upset. Want to talk about it?";
      default:
        return "Oops, I didn’t quite catch that. Could you say it differently?";
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { user: 'You', text: input, type: 'user' }]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get the bot's response based on the user's input
      const botReply = getBotResponse(input);

      // Add bot reply to chat with sentiment emoji if needed
      let sentimentEmoji = <FaRegMeh />; // Default sentiment emoji (neutral)
      const sentiment = detectSentiment(input);

      if (sentiment === 'positive') {
        sentimentEmoji = <FaRegSmile />;
      } else if (sentiment === 'negative') {
        sentimentEmoji = <FaSadTear />;
      } else if (sentiment === 'angry') {
        sentimentEmoji = <FaAngry />;
      }

      // Add bot response to messages array
      setMessages((prev) => [
        ...prev,
        { user: 'Chatbot', text: botReply, type: 'bot', sentiment: sentimentEmoji, sentimentClass: sentiment },
      ]);

      // Hide typing indicator after bot response
      setIsTyping(false);
    } catch (error) {
      console.error('Error communicating with the server:', error);
      setIsTyping(false); // Hide typing indicator in case of error
    }

    setInput(''); // Clear the input field
  };

  // Function to clear conversation
  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages'); // Clear stored messages
  };

  return (
    <div className="chat-container">
      {/* Header Section */}
      <div className="header">
        <h1>Chatbot</h1>
        {/* Clear chat button in top-right corner */}
        <button className="clear-button" onClick={clearConversation}>
          <FaTrashAlt /> {/* Trash icon */}
        </button>
      </div>

      {/* Chat messages */}
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.type} ${msg.sentimentClass}`} // Apply sentiment class for styling
            style={{
              alignSelf: msg.type === 'user' ? 'flex-start' : 'flex-end',
              display: 'flex',
              flexDirection: 'row', // Ensures the icon and message are in a row
              justifyContent: msg.type === 'user' ? 'flex-start' : 'flex-end', // Align message accordingly
            }}
          >
            <span className="icon-container">
              {msg.type === 'user' ? <FaUser className="fa-user" /> : <FaRobot className="fa-robot" />}
            </span>
            <div>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
            {msg.sentiment && <span className="sentiment-icon">{msg.sentiment}</span>} {/* Render sentiment emoji after the message */}
          </div>
        ))}
        {isTyping && (
          <div className="message bot" style={{ alignSelf: 'flex-end' }}>
            <FaRobot className="fa-robot" />
            <strong>Chatbot:</strong> Bot is typing...
          </div>
        )}
        {/* Reference for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container */}
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
