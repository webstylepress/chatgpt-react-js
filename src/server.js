// Import dependencies and middlewares 

const express = require("express");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

// Set up the server ////////////

const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up OpenAI endpoint

const configuration = new Configuration({
  apiKey: process.env.CHATBOT_KEY,
});
// CHATBOT_KEY is key name in .env file. .env file should be in project root directory - format is below
// CHATBOT_KEY="YOR-API-KEY"

const openai = new OpenAIApi(configuration);
app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003", 
    prompt: prompt,
    max_tokens: 2048,
  });
  res.send(completion.data.choices[0].text);
});
// 'prompt' is coming from axios post - from react js state - its input field value or query or question 

// Start the server ////////////////////

const port = 5555;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});