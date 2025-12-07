/**
 * AUTO PDF TO TEXT CONVERTER
 * Automatically converts PDF to text when you ask me to read it
 * Usage: node pdf-to-text-auto.js "path/to/file.pdf"
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get PDF path from command line
const pdfPath = process.argv[2];

if (!pdfPath) {
    console.error('Usage: node pdf-to-text-auto.js "path/to/file.pdf"');
    process.exit(1);
}

// Check if PDF exists
if (!fs.existsSync(pdfPath)) {
    console.error(`PDF not found: ${pdfPath}`);
    process.exit(1);
}

// Output text file path (same name, .txt extension)
const txtPath = pdfPath.replace(/\.pdf$/i, '.txt');

console.log(`Converting PDF to text...`);
console.log(`Input: ${pdfPath}`);
console.log(`Output: ${txtPath}`);

try {
    // Try multiple PDF extraction methods
    
    // Method 1: Try pdftotext (if installed)
    try {
        execSync(`pdftotext "${pdfPath}" "${txtPath}"`, { stdio: 'inherit' });
        console.log('✅ Converted using pdftotext');
    } catch (e) {
        // Method 2: Try Python PyPDF2 (if installed)
        try {
            const pythonScript = `
import PyPDF2
import sys

pdf_path = sys.argv[1]
txt_path = sys.argv[2]

with open(pdf_path, 'rb') as pdf_file:
    reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\\n\\n"
    
with open(txt_path, 'w', encoding='utf-8') as txt_file:
    txt_file.write(text)

print("✅ Converted using PyPDF2")
`;
            fs.writeFileSync('temp_pdf_extract.py', pythonScript);
            execSync(`python temp_pdf_extract.py "${pdfPath}" "${txtPath}"`, { stdio: 'inherit' });
            fs.unlinkSync('temp_pdf_extract.py');
        } catch (e2) {
            console.error('❌ No PDF converter found!');
            console.error('Install one of:');
            console.error('1. pdftotext: choco install poppler');
            console.error('2. PyPDF2: pip install PyPDF2');
            process.exit(1);
        }
    }
    
    // Verify output
    if (fs.existsSync(txtPath)) {
        const stats = fs.statSync(txtPath);
        console.log(`✅ Success! Created ${txtPath} (${stats.size} bytes)`);
        console.log(`\nNow I can read it with: readFile("${txtPath}")`);
    } else {
        console.error('❌ Conversion failed - no output file created');
        process.exit(1);
    }
    
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}
