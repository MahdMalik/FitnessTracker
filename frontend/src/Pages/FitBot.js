import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import marked from 'marked';
export default function FitBot() {
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage, or start with the default welcome message
    const savedMessages = localStorage.getItem('fitbotai-messages');
    return savedMessages ? JSON.parse(savedMessages) : [
      {
        role: 'model',
        content: "Hello! I'm the FitBot. How can I help you today?"
      }
    ];
  });

  const [message, setMessage] = useState('');
  const MAX_HISTORY_LENGTH=10;
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('fitbotai-messages', JSON.stringify(messages));
  }, [messages]);
  
  const trimHistory = (history) => {
    if (history.length > MAX_HISTORY_LENGTH) {
      return history.slice(-MAX_HISTORY_LENGTH); // Keep only the last N messages
    }
    return history;
  }
  const sendMessage = async () => {
    if (!message.trim()) return; // won't send empty messages
    setMessage('');
    try {
      const response = await fetch('http://localhost:4000/api/chatbot/chat', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimHistory([...messages, { role: "user", content: message}]))
      });

      let newMessage = await response.json();

      if (typeof newMessage === 'object' && newMessage !== null) {
        newMessage = newMessage.text || JSON.stringify(newMessage); 
      }

      // newMessage = newMessage.replace(/\*/g, '').replace(/\n/g);

      setMessages((messages) => [
        ...messages,
        { role: "user", content: message},
        { role: "model", content: newMessage},
      ]);
    } catch (e) {
      console.error('Error sending message:', e);
      setMessages((messages) => [
        ...messages,
        { role: "user", content : message},
        { role: "model", content : `Sorry, I encountered an error: ${e.message}`},
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) };
  useEffect(() => { scrollToBottom(); }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className="fitbot-container"
    >
      <Stack direction={'row'} display={'flex'}>
        <Typography variant={'h4'} color={'#339fff'} padding={2}>
          FitBot AI
        </Typography>
      </Stack>

      <Stack
        direction="column"
        width="45%"
        height="85%"
        border="2px solid black"
        borderRadius={10}
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((theMessage, index) => (
            <Box
              key={index}
              display='flex'
              justifyContent={theMessage.role === "model" ? 'flex-start' : 'flex-end'}
            >
              <Box
                bgcolor={theMessage.role === "model" ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={3}
              >
                <ReactMarkdown>{theMessage.content}</ReactMarkdown>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef}></div>
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
