var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

const {
	generateText,
	summarizeText,
	generateKeywords,
	generateImage,
} = require('../server/controllers/openaiController');

app.use(cors());
app.use(express.json());
app.listen(4000, () => console.log('listening for requests on port 4000'));

// Middleware
app.use(express.json());

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

// Routes
app.post('/openai/text', generateText);
app.post('/openai/summarize', summarizeText);
app.post('/openai/keywords', generateKeywords);
app.post('/openai/image', generateImage);


const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../frontend/dist/index.html'));
})