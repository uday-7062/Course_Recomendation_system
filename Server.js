const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
require('dotenv').config();
const XLSX = require('xlsx');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(cors());
const port = 8080;
app.use(bodyParser.json());
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const path = require('path');
const filePath = path.join(__dirname, 'subject_prerequisites.xlsx');

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);
async function getAnswer(question, data) {
  try {
    const prompt = `
      Given the following course data:
      ${JSON.stringify(data, null, 2)}

      Answer the question: ${question}
    `;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching answer from OpenAI:', error);
    return null;
  }
}
app.post('/ask-question', async (req, res) => {
  const { question } = req.body;
  const answer = await getAnswer(question, data);
  if (answer) {
    res.json({ response: answer });
  } else {
    res.status(500).json({ response: 'Unable to fetch answer.' });
  }
});

app.get('/get-courses', (req, res) => {
  try {
      const filePath = path.join(__dirname, 'course_details_updated.xlsx');  

      console.log("Checking if file exists...");
      if (!fs.existsSync(filePath)) {
          console.error("ERROR: File not found at", filePath);
          return res.status(404).json({ error: "File not found" });
      }

      console.log("File found. Reading Excel file...");
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];

      console.log("Sheet found:", sheetName);
      const sheet = workbook.Sheets[sheetName];

      console.log("Converting sheet to JSON...");
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      
      if (!Array.isArray(jsonData)) {
          console.error("ERROR: JSON data is not an array:", jsonData);
          return res.status(500).json({ error: "Data format error: Expected an array" });
      }

      console.log("Successfully loaded course data.");
      res.json(jsonData);
  } catch (error) {
      console.error("ERROR reading Excel file:", error);
      res.status(500).json({ error: "Failed to load course data", details: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
