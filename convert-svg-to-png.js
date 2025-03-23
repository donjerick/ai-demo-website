const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgPath = path.join(__dirname, 'public', 'images', 'meta', 'og-image.svg');
const pngPath = path.join(__dirname, 'public', 'images', 'meta', 'og-image.png');

// Read the SVG file
const svgBuffer = fs.readFileSync(svgPath);

// Convert SVG to PNG
sharp(svgBuffer)
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log(`Successfully converted SVG to PNG: ${pngPath}`);
  })
  .catch(err => {
    console.error('Error converting SVG to PNG:', err);
  });
