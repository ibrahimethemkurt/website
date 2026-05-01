const sharp = require('sharp');
const fs = require('fs');

async function convert() {
  try {
    await sharp('src/assets/ibrahimethemkurtpp.svg')
      .resize(800) // limit width for performance
      .webp({ quality: 80 })
      .toFile('src/assets/profilePic.webp');
    console.log('Conversion successful!');
  } catch (err) {
    console.error('Error:', err);
  }
}

convert();
