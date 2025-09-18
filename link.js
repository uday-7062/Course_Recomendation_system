const xlsx = require('xlsx');
const fs = require('fs');

// File paths
const inputFilePath = 'subject_prerequisites.xlsx';
const outputFilePath = 'updated_subject_prerequisites.xlsx';

// Load the workbook
const workbook = xlsx.readFile(inputFilePath);
const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
let jsonData = xlsx.utils.sheet_to_json(sheet);

// Define the mandatory link
const mandatoryLink = "https://www.bgsu.edu/arts-and-sciences/student-resources/handbook/foreign-language-approved-courses.html";

// List of target SPAN courses
const targetCourses = ["SPAN 1010", "SPAN 1020", "SPAN 2010", "SPAN 2020"];

// Update prerequisites for the specific SPAN courses
jsonData = jsonData.map(row => {
    if (row.subject && targetCourses.some(course => row.subject.toUpperCase().includes(course))) {
        if (row.prerequisites && !row.prerequisites.includes(mandatoryLink)) {
            // Append the mandatory link if prerequisites already exist
            row.prerequisites += `\nMandatory Link: ${mandatoryLink}`;
        } else if (!row.prerequisites) {
            // If no prerequisites exist, add the mandatory link
            row.prerequisites = `Mandatory Link: ${mandatoryLink}`;
        }
    }
    return row;
});

// Convert JSON back to worksheet
const newWorkbook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(jsonData);
xlsx.utils.book_append_sheet(newWorkbook, newSheet, "Updated Prerequisites");

// Write the updated workbook to a new file
xlsx.writeFile(newWorkbook, outputFilePath);

console.log(`✅ File updated successfully: ${outputFilePath}`);
