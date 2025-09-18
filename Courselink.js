const fs = require('fs');
const { Builder, By } = require('selenium-webdriver');
const xlsx = require('xlsx');

async function scrapeData(url, results) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(url);
    let elements = await driver.findElements(By.css('td.width'));

    for (let element of elements) {
      try {
        let linkElement = await element.findElement(By.css('a'));
        let text = await linkElement.getText();
        let href = await linkElement.getAttribute('href');

        // Save course and link to the results array
        results.push({ Subject: text, Link: href });
      } catch (innerErr) {
        console.error('Error processing element:', innerErr);
      }
    }
  } catch (err) {
    console.error('An error occurred while scraping:', err);
  } finally {
    await driver.quit();
  }
}

(async function main() {
  const urls = [
    'https://catalog.bgsu.edu/content.php?filter%5B27%5D=CS&filter%5B29%5D=&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=16&expand=&navoid=1215&search_database=Filter&filter%5Bexact_match%5D=1#acalog_template_course_filter',
    'https://catalog.bgsu.edu/content.php?filter%5B27%5D=MATH&filter%5B29%5D=&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=16&expand=&navoid=1215&search_database=Filter&filter%5Bexact_match%5D=1#acalog_template_course_filter',
    'https://catalog.bgsu.edu/content.php?filter%5B27%5D=WRIT&filter%5B29%5D=&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=16&expand=&navoid=1215&search_database=Filter&filter%5Bexact_match%5D=1#acalog_template_course_filter',
    'https://catalog.bgsu.edu/content.php?filter%5B27%5D=SE&filter%5B29%5D=&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=16&expand=&navoid=1215&search_database=Filter&filter%5Bexact_match%5D=1#acalog_template_course_filter',
    'https://catalog.bgsu.edu/content.php?filter%5B27%5D=SPAN&filter%5B29%5D=&filter%5Bkeyword%5D=&filter%5B32%5D=1&filter%5Bcpage%5D=1&cur_cat_oid=16&expand=&navoid=1215&search_database=Filter&filter%5Bexact_match%5D=1#acalog_template_course_filter'
  ];

  let results = []; // Array to store scraped data

  try {
    for (let url of urls) {
      console.log(`Scraping: ${url}`);
      await scrapeData(url, results);
    }

    // Convert results to worksheet
    const worksheet = xlsx.utils.json_to_sheet(results);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Courses");

    // Save to courses.xlsx
    xlsx.writeFile(workbook, "courses.xlsx");

    console.log('✅ Scraping complete. Data saved to courses.xlsx');
  } catch (err) {
    console.error('An error occurred in the main function:', err);
  }
})();
