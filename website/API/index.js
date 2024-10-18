const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('http://localhost:11434/generate', {
      model: 'llama3.2',
      prompt: prompt,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
