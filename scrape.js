const xlsx = require('xlsx');
const axios = require('axios');
const cheerio = require('cheerio');

const filePath = 'courses.xlsx';
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

async function scrapeCourseDetails(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const courseTitle = $('h1#course_preview_title').text().trim();
    
    // Locate the prerequisite section and extract text
    let rawPrerequisites = $('strong:contains("Prerequisite")')
      .parent()
      .text()
      .trim();

    // Extract valid course codes (letters + space + digits, e.g., "CS 2010", "MATH 1200")
    const prerequisiteCourses = rawPrerequisites.match(/\b[A-Z]{2,4} \d{3,4}\b/g) || [];

    return { courseTitle, prerequisites: prerequisiteCourses.join(', ') };
  } catch (error) {
    console.error(`Error fetching data for URL: ${url}`, error.message);
    return { courseTitle: null, prerequisites: "None" };
  }
}

async function processCourses() {
  const results = [];

  for (const record of data) {
    if (record.Subject && record.Link) {
      console.log(`Fetching data for: ${record.Subject}`);
      const details = await scrapeCourseDetails(record.Link);
      results.push({
        subject: record.Subject,
        prerequisites: details.prerequisites || "None"
      });
    } else {
      results.push({
        subject: record.Subject || "Unknown",
        prerequisites: "None"
      });
    }
  }

  const newSheet = xlsx.utils.json_to_sheet(results);
  const newWorkbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(newWorkbook, newSheet, 'Course Details');
  xlsx.writeFile(newWorkbook, 'description.xlsx');
  
  console.log('Scraping complete. Results saved to course_details.xlsx');
}

processCourses();