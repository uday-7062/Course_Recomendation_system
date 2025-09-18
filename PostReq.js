const xlsx = require("xlsx");
const { OpenAI } = require("openai");
require("dotenv").config();

//Initialize OpenAI API Key from .env
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//Load course details file
const filePath = "course_details.xlsx";
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
let courses = xlsx.utils.sheet_to_json(sheet);

//Extract prerequisites using GPT if missing
async function extractPrerequisitesFromAI(courseDescription) {
    if (!courseDescription || courseDescription.toLowerCase().includes("none")) return [];

    const prompt = `
    Extract all prerequisite courses from the following course description.
    Return only the course codes as a JSON array, like ["CS 1010", "CS 2020"].
    
    Course Description:
    ${courseDescription}
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
        });

        const aiOutput = response.choices[0].message.content;
        const extractedPrereqs = JSON.parse(aiOutput);
        return Array.isArray(extractedPrereqs) ? extractedPrereqs : [];
    } catch (error) {
        console.error("❌ Error extracting prerequisites:", error.message);
        return [];
    }
}

//  Extract numeric course level (e.g., CS2010 → 2010)
function extractCourseLevel(courseCode) {
    const match = courseCode.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
}

// Step 2: Process courses to extract prerequisites and generate postrequisites
async function processCourses() {
    let prereqToPostreq = {}; // Store prerequisite-to-postrequisite mapping
    let updatedCourses = [];

    //  First pass: Extract prerequisites and normalize course data
    for (const row of courses) {
        const courseCode = row.subject.split(" - ")[0].trim();
        let prerequisites = row.prerequisites ? row.prerequisites.split(", ") : [];

        // If prerequisites are missing, extract from GPT
        if (prerequisites.length === 1 && prerequisites[0] === "None") {
            console.log(`🔍 Extracting prerequisites for: ${courseCode}`);
            prerequisites = await extractPrerequisitesFromAI(row.courseDescription || "");
        }

        // Store prerequisites in the data
        row.prerequisites = prerequisites.join(", ") || "None";

        // Build the postrequisites mapping
        prerequisites.forEach(prereq => {
            if (!prereqToPostreq[prereq]) {
                prereqToPostreq[prereq] = [];
            }

            if (prereq !== courseCode) {
                prereqToPostreq[prereq].push(courseCode);
            }
        });

        updatedCourses.push(row);
    }

    //Step 3: Compute postrequisites based on course levels
    updatedCourses.forEach(row => {
        const courseCode = row.subject.split(" - ")[0].trim();
        const courseLevel = extractCourseLevel(courseCode);

        // Find all courses above this level that list it as a prerequisite
        const postrequisites = updatedCourses
            .filter(course => {
                const targetCourseLevel = extractCourseLevel(course.subject.split(" - ")[0].trim());
                return (
                    targetCourseLevel > courseLevel &&
                    course.prerequisites.includes(courseCode)
                );
            })
            .map(course => course.subject.split(" - ")[0].trim());

        row.postrequisites = postrequisites.length > 0 ? postrequisites.join(", ") : "None";
    });

    // Step 4: Save updated data to `course_details_updated.xlsx`
    const newSheet = xlsx.utils.json_to_sheet(updatedCourses);
    workbook.Sheets[sheetName] = newSheet;
    xlsx.writeFile(workbook, "course_details_updated.xlsx");

    console.log("✅ Course prerequisites and postrequisites processed successfully!");
}

// Run the processing function
processCourses();
