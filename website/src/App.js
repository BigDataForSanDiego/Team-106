import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import SearchBar from './components/SearchBar';
import AskLLM from './components/AskLLM';
import {ReactComponent as QuestionMark} from './QuestionMark.svg';
import {useEffect, useState} from 'react';
import HelpModal from './components/HelpModal';
import { symptomsList } from './symptomsList';
import {diseaseList} from './diseaseList';

function App() {
  // for displaying modal
  const [showModal, setShowModal] = useState(true);

  // for getting symptoms
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  // for getting diseases
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  useEffect(() => {
    setShowModal(true);
    // console.log(symptomsList);
    // console.log(selectedSymptoms);
  }, []);

  /*useEffect(() => {
    console.log(selectedSymptoms);
  }, [selectedSymptoms])*/

  const toggleHelpModal = () => {
    //console.log(showModal);
    setShowModal((showModal) => !showModal);
  };

  const closeHelpModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Box sx={{ padding: '2rem'}}>
        <Box className='topText' sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h3" gutterBottom>
            WZG Medical
          </Typography>
          <IconButton onClick={toggleHelpModal}>
            <QuestionMark style={{width:'3rem', height:'3rem'}}/>
          </IconButton>
        </Box>
        <SearchBar dataList={symptomsList} selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms}/>
        {/*change so only one disease can be input and change the text?*/}
        <SearchBar dataList={diseaseList} selectedSymptoms={selectedDiseases} setSelectedSymptoms={setSelectedDiseases}/>
      </Box>
      <HelpModal open={showModal} handleClose={closeHelpModal}/>
    </div>
  );
}

export default App;