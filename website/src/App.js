import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import SearchBar from './components/SearchBar';
import AskLLM from './components/AskLLM';
import { ReactComponent as QuestionMark } from './QuestionMark.svg';
import { useEffect, useState } from 'react';
import HelpModal from './components/HelpModal';
import { symptomsList } from './symptomsList';
import { diseaseList } from './diseaseList';

function App() {
  // For displaying modal
  const [showModal, setShowModal] = useState(true);

  // For getting selected symptoms and diseases
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  // For handling the prediction result
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    setShowModal(true);
  }, []);

  // Function to toggle help modal
  const toggleHelpModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const closeHelpModal = () => {
    setShowModal(false);
  };

  // Function to handle API call for prediction
  const getPrediction = async () => {
    try {
      // Combine symptoms and diseases as features
      const features = {
        symptoms: selectedSymptoms,
        diseases: selectedDiseases,
      };

      // Send POST request to backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });

      const data = await response.json();
      setPrediction(data.prediction); // Set prediction result
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div>
      <Box sx={{ padding: '2rem' }}>
        <Box className='topText' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" gutterBottom>
            WZG Medical
          </Typography>
          <IconButton onClick={toggleHelpModal}>
            <QuestionMark style={{ width: '3rem', height: '3rem' }} />
          </IconButton>
        </Box>

        {/* Search bar for symptoms */}
        <SearchBar
          dataList={symptomsList}
          selectedSymptoms={selectedSymptoms}
          setSelectedSymptoms={setSelectedSymptoms}
        />

        {/* Search bar for diseases */}
        <SearchBar
          dataList={diseaseList}
          selectedSymptoms={selectedDiseases}
          setSelectedSymptoms={setSelectedDiseases}
        />

        {/* Button to trigger the API call */}
        <Button variant="contained" color="primary" onClick={getPrediction} sx={{ mt: 2 }}>
          Get Prediction
        </Button>

        {/* Display prediction result */}
        {prediction && (
          <Typography variant="h5" sx={{ mt: 3 }}>
            Prediction: {prediction}
          </Typography>
        )}
      </Box>

      {/* Help modal */}
      <HelpModal open={showModal} handleClose={closeHelpModal} />
    </div>
  );
}

export default App;
