
// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");

// Get all the filenames from the studtns file
const files = fs.readdirSync("SampleTranscript");

// All of the parse students
let student = [];

// Make a IIFE so we can run asynchronous code
(async () => {

    
    // For each file in the patients folder
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 1);

        // Load the pdf document
        pdfParser.loadPDF(SampleTranscript.pdf);

        // Parsed the student file
        let student = await new Promise(async (resolve, reject) => {

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                // The raw PDF data in text form
                const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");

                //Return the parsed data
                resolve({
                   name: /Name\s(.*?)Student ID/i.exec(raw)[1].trim(),
                    studentid: /Student ID\s(.*?)External Degrees/i.exec(raw)[1].trim(),
                    degree: /2021-04-21:\s(.*?)Print Date:/i.exec(raw)[1].trim(),
                
                    
                });

            });

        });

        // Add the student to the student array
        students.push(student);

    }));

    // Save the extracted information to a json file
    fs.writeFileSync("students.json", JSON.stringify(students));

})();  
  