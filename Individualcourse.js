const xlsx = require('xlsx');
const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const descriptionFile = 'course_description.xlsx';

// Load course descriptions
const descriptionWorkbook = xlsx.readFile(descriptionFile);
const descriptionSheetName = descriptionWorkbook.SheetNames[0];
const descriptionSheet = descriptionWorkbook.Sheets[descriptionSheetName];
let courseDescriptions = xlsx.utils.sheet_to_json(descriptionSheet);

// ✅ **Step 1: Clean Course Descriptions**
function cleanDescription(text) {
    if (!text) return "";
    return text
        .replace(/HELP.*?Undergraduate Catalog/g, "")  
        .replace(/\[.*?CATALOG\]/g, "")  
        .replace(/Print-Friendly Page.*?new window\)/gi, "")  
        .replace(/Credits?:\s*\d+/, "")  
        .trim();
}

// Apply cleaning
courseDescriptions = courseDescriptions.map(course => ({
    subject: course.subject,
    courseDescription: cleanDescription(course.courseCredits)
}));

// ✅ **Step 2: Extract Prerequisites using GPT**
async function extractPrerequisitesFromGPT(description) {
    if (!description || description.length < 20) return "None";

    const prompt = `
    Extract only prerequisite course codes from the following course description.
    - Return only course codes in a comma-separated format (e.g., "CS 1010, MATH 1200").
    - If no prerequisites are found, return "None".
    
    Description:
    ${description}
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        });

        return response.choices[0].message.content.trim() || "None";
    } catch (error) {
        console.error("❌ Error extracting prerequisites:", error.message);
        return "None";
    }
}

// ✅ **Step 3: Process and Save Results**
async function processCourses() {
    const results = [];

    for (const course of courseDescriptions) {
        const subject = course.subject;
        const description = course.courseDescription;
        console.log(`🔍 Extracting prerequisites for: ${subject}`);

        const prerequisites = await extractPrerequisitesFromGPT(description);

        results.push({
            subject: subject,
            prerequisites: prerequisites
        });
    }

    // Save extracted prerequisites to a new Excel file
    const updatedSheet = xlsx.utils.json_to_sheet(results);
    const updatedWorkbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(updatedWorkbook, updatedSheet, 'Prerequisites');
    xlsx.writeFile(updatedWorkbook, 'course_details.xlsx');

    console.log('✅ Prerequisites updated in course_details.xlsx');
}

// Start processing
processCourses();
