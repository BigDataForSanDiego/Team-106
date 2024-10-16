// src/components/SymptomSearchBar.js
import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  InputAdornment,
  Chip,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { symptomsList } from '../symptomsList';

function SymptomSearchBar() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const filterOptions = (options, { inputValue }) => {
    const input = inputValue.trim().toLowerCase();

    return options
      .filter((option) => !selectedSymptoms.includes(option))
      .filter((option) => option.name.toLowerCase().includes(input))
      .sort((a, b) => {
        const aLower = a.name.toLowerCase();
        const bLower = b.name.toLowerCase();

        const aStartsWith =
          aLower.startsWith(input) ||
          aLower.split(' ').some((word) => word.startsWith(input));
        const bStartsWith =
          bLower.startsWith(input) ||
          bLower.split(' ').some((word) => word.startsWith(input));

        if (aStartsWith && !bStartsWith) {
          return -1;
        } else if (!aStartsWith && bStartsWith) {
          return 1;
        } else {
          return aLower.localeCompare(bLower);
        }
      });
  };

  const renderOption = (props, option, { inputValue }) => {
    const matches = option.name.toLowerCase().includes(inputValue.toLowerCase());
    const parts = option.name.split(new RegExp(`(${inputValue})`, 'gi'));

    return (
      <li {...props} style={{ display: 'block' }}>
        <Paper
          elevation={1}
          sx={{
            padding: '0.5rem',
            backgroundColor: 'background.paper',
            color: 'text.primary',
            cursor: 'pointer',
          }}
        >
          <Typography variant="subtitle1" component="div">
            {parts.map((part, index) =>
              part.toLowerCase() === inputValue.toLowerCase() ? (
                <span key={index} style={{ fontWeight: 'bold' }}>{part}</span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {option.details}
          </Typography>
        </Paper>
      </li>
    );
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      label="Search Symptoms"
      placeholder="Type to search"
      variant="outlined"
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Autocomplete
        options={symptomsList}
        getOptionLabel={(option) => option.name}
        filterOptions={filterOptions}
        onChange={(event, newValue) => {
          if (newValue && !selectedSymptoms.includes(newValue)) {
            setSelectedSymptoms([...selectedSymptoms, newValue]);
          }
        }}
        renderOption={renderOption}
        renderInput={renderInput}
        value={null}
        ListboxProps={{
          style: {
            maxHeight: '250px',
            overflow: 'auto',
          },
        }}
        noOptionsText="No matching symptoms"
      />

      {/* Display selected symptoms */}
      {selectedSymptoms.length > 0 && (
        <Box sx={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedSymptoms.map((symptom) => (
            <Chip
              key={symptom.name}
              label={symptom.name}
              onDelete={() => {
                setSelectedSymptoms(
                  selectedSymptoms.filter((s) => s.name !== symptom.name)
                );
              }}
              sx={{
                backgroundColor: 'primary.main',
                color: 'background.default',
                '& .MuiChip-deleteIcon': {
                  color: 'background.default',
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SymptomSearchBar;
