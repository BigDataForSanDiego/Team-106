import React from 'react';
import { Box, Typography } from '@mui/material';
import SymptomSearchBar from './components/SearchBar';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        ensurse
      </Typography>
      <SymptomSearchBar />
      <ChatBot></ChatBot>
    </Box>
  );
}

export default App;