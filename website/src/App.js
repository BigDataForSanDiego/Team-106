import React from 'react';
import { Box, Typography } from '@mui/material';
import SymptomSearchBar from './components/SearchBar';
import AskLLM from './components/AskLLM'

function App() {
  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        WZG Medical
      </Typography>
      <SymptomSearchBar/>
      <AskLLM/>
    </Box>
  );
}

export default App;