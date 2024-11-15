const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/your-endpoint', (req, res) => {
    res.json({ message: 'This is a CORS-enabled response' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

