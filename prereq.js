const xlsx = require('xlsx');
const fs = require('fs');

// Load the Excel file
const filePath = 'course_description.xlsx';
const outputFilePath = 'subject_prerequisites.xlsx';

// Read the workbook
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(sheet);

// Function to extract prerequisites from courseCredits
const extractPrerequisites = (text) => {
    if (!text) return "No prerequisite mentioned"; // Handle empty values

    const match = text.match(/Prerequisite\(s\): (.*?)(?=\.|$)/i);
    return match ? match[0] : "No prerequisite mentioned"; // Return extracted part
};

// Extract subject and cleaned prerequisites
const extractedData = jsonData.map(row => ({
    subject: row.subject,
    prerequisites: extractPrerequisites(row.courseCredits)
}));

// Create a new workbook and sheet
const newWorkbook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(extractedData);
xlsx.utils.book_append_sheet(newWorkbook, newSheet, "Prerequisites");

// Write to a new Excel file
xlsx.writeFile(newWorkbook, outputFilePath);

console.log(`File saved as ${outputFilePath}`);
