import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResume() {
  console.log('Generating ATS-compliant Resume PDF...');

  const pdfDoc = await PDFDocument.create();
  
  // A4 dimensions: 595.276 x 841.890 points
  const width = 595;
  const height = 842;
  const page = pdfDoc.addPage([width, height]);

  // Embed standard fonts
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Setup layout variables
  const leftMargin = 50;
  const rightMargin = 50;
  const printableWidth = width - leftMargin - rightMargin;
  
  let y = height - 50; // Starting Y coordinate (from top)

  // Helper to draw text with line spacing
  function drawText(text, fontSize, font, color = rgb(0, 0, 0), xOffset = 0) {
    page.drawText(text, {
      x: leftMargin + xOffset,
      y: y,
      size: fontSize,
      font: font,
      color: color,
    });
  }

  // Helper to wrap and draw block text
  function drawWrappedText(text, fontSize, font, leading = 13, xOffset = 0) {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > (printableWidth - xOffset) && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    for (let i = 0; i < lines.length; i++) {
      if (y < 45) {
        // Fallback for single page height limit (should fit on A4)
        console.warn('Reached page bottom boundary!');
        break;
      }
      drawText(lines[i], fontSize, font, rgb(0.1, 0.1, 0.1), xOffset);
      if (i < lines.length - 1) {
        y -= leading;
      }
    }
    return lines.length;
  }

  // Helper for bullet points
  function drawBulletPoint(text, fontSize = 9.5, xOffset = 15) {
    y -= 13;
    page.drawText('•', {
      x: leftMargin + xOffset - 10,
      y: y,
      size: fontSize,
      font: fontBold,
      color: rgb(0.2, 0.2, 0.2),
    });
    drawWrappedText(text, fontSize, fontRegular, 12, xOffset);
  }

  // Helper for section headings
  function drawSectionHeading(title) {
    y -= 25;
    // Draw heading text
    drawText(title.toUpperCase(), 11, fontBold, rgb(0.1, 0.3, 0.6));
    
    // Draw border line below section title
    y -= 4;
    page.drawLine({
      start: { x: leftMargin, y: y },
      end: { x: width - rightMargin, y: y },
      thickness: 0.8,
      color: rgb(0.7, 0.7, 0.7),
    });
    y -= 10;
  }

  // 1. HEADER SECTION (Centered)
  // Name
  y -= 10;
  const nameText = 'Gaurav Kumar Singh';
  const nameWidth = fontBold.widthOfTextAtSize(nameText, 20);
  page.drawText(nameText, {
    x: (width - nameWidth) / 2,
    y: y,
    size: 20,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  // Contact Info
  y -= 16;
  const contactText = 'Punjab, India  |  heygaurav33@gmail.com  |  github.com/Gaurav000018  |  linkedin.com/in/gaurav-singh-a86175325';
  const contactWidth = fontRegular.widthOfTextAtSize(contactText, 9);
  page.drawText(contactText, {
    x: (width - contactWidth) / 2,
    y: y,
    size: 9,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4),
  });

  y -= 10;

  // 2. SUMMARY SECTION
  drawSectionHeading('Professional Summary');
  y -= 2;
  drawWrappedText(
    'Computer Science Engineering student at Lovely Professional University passionate about Software Development, Cloud Computing and DevOps. Experienced with Docker, Linux, Git, AWS fundamentals, CI/CD pipelines and modern web development. Actively solving Data Structures & Algorithms problems while building production-ready cloud applications.',
    9.5,
    fontRegular,
    13,
    0
  );

  // 3. EDUCATION SECTION
  drawSectionHeading('Education');
  // University Name (left), Dates (right)
  const uniName = 'Lovely Professional University';
  const dateStr = '2024 – Present';
  const dateWidth = fontBold.widthOfTextAtSize(dateStr, 9.5);
  
  drawText(uniName, 9.5, fontBold, rgb(0.1, 0.1, 0.1));
  page.drawText(dateStr, {
    x: width - rightMargin - dateWidth,
    y: y,
    size: 9.5,
    font: fontBold,
    color: rgb(0.3, 0.3, 0.3),
  });

  y -= 13;
  drawText('Bachelor of Technology in Computer Science Engineering', 9.5, fontItalic, rgb(0.3, 0.3, 0.3));

  // 4. TECHNICAL SKILLS
  drawSectionHeading('Technical Skills');
  
  const skillCategories = [
    { label: 'Programming & Web:', items: 'C++, Python, JavaScript, React, HTML, CSS, SQL' },
    { label: 'DevOps & Tools:', items: 'Docker, Docker Compose, Linux, Git, GitHub, GitHub Actions' },
    { label: 'Cloud Services:', items: 'AWS EC2, AWS S3, CloudWatch' },
    { label: 'Databases:', items: 'MySQL, PostgreSQL' }
  ];

  skillCategories.forEach(cat => {
    y -= 13;
    drawText(cat.label, 9.5, fontBold, rgb(0.1, 0.1, 0.1));
    const labelWidth = fontBold.widthOfTextAtSize(cat.label + ' ', 9.5);
    page.drawText(cat.items, {
      x: leftMargin + labelWidth,
      y: y,
      size: 9.5,
      font: fontRegular,
      color: rgb(0.2, 0.2, 0.2),
    });
  });

  // 5. PROJECT EXPERIENCE SECTION
  drawSectionHeading('Projects');
  
  // Project 1
  drawText('Cloud Resume Website with CI/CD', 9.5, fontBold, rgb(0.1, 0.1, 0.1));
  y -= 2;
  drawBulletPoint('Built a fully responsive cloud portfolio.');
  drawBulletPoint('Containerized using Docker.');
  drawBulletPoint('Hosted on AWS EC2.');
  drawBulletPoint('Automated deployment using GitHub Actions.');
  drawBulletPoint('Stored static assets on Amazon S3.');
  drawBulletPoint('Configured CloudWatch monitoring.');
  drawBulletPoint('Used Git for version control.');

  // Other Projects
  y -= 12;
  drawText('Other Projects', 9.5, fontBold, rgb(0.1, 0.1, 0.1));
  
  y -= 13;
  drawText('Restaurant Website: ', 9.5, fontBold, rgb(0.1, 0.1, 0.1));
  let projWidth = fontBold.widthOfTextAtSize('Restaurant Website: ', 9.5);
  page.drawText('Responsive multi-page website using HTML CSS JavaScript.', {
    x: leftMargin + projWidth,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });

  y -= 13;
  drawText('E-Learning Platform: ', 9.5, fontBold, rgb(0.1, 0.1, 0.1));
  projWidth = fontBold.widthOfTextAtSize('E-Learning Platform: ', 9.5);
  page.drawText('Full Stack project using React, backend APIs and database integration.', {
    x: leftMargin + projWidth,
    y: y,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });

  y -= 13;
  drawText('Doorbell for Disabled People (Arduino-based Wireless Assistive Alert System): ', 9.5, fontBold, rgb(0.1, 0.1, 0.1));
  projWidth = fontBold.widthOfTextAtSize('Doorbell for Disabled People (Arduino-based Wireless Assistive Alert System): ', 9.5);
  // Wrap description if it is too long
  y -= 12;
  drawWrappedText(
    'Wireless assistive alert system using Arduino, NRF24L01 modules, vibration motor, LEDs and buzzer.',
    9.5,
    fontRegular,
    12,
    0
  );

  // 6. ACHIEVEMENTS SECTION
  drawSectionHeading('Achievements');
  y -= 2;
  drawBulletPoint('Strong understanding of Data Structures & Algorithms');
  drawBulletPoint('Building real-world DevOps projects');
  drawBulletPoint('Learning AWS Cloud and CI/CD');

  // 7. LANGUAGES
  drawSectionHeading('Languages');
  y -= 2;
  drawText('English, Hindi', 9.5, fontRegular, rgb(0.2, 0.2, 0.2));

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  
  // Ensure the target directory exists
  const destDir = path.join('public', 'resume');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destPath = path.join(destDir, 'Gaurav_Kumar_Singh_Resume.pdf');
  fs.writeFileSync(destPath, pdfBytes);
  console.log(`Successfully generated ATS-compliant PDF resume at: ${destPath}`);
}

generateResume().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
