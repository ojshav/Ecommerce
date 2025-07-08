require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name from .env
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key from .env
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret from .env
});


const svgDir = path.join(__dirname, 'public', 'assets' ,'icon');

// Function to validate SVG file
function isValidSvgFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8').trim();
    if (!content) {
      return false;
    }
    // Basic SVG validation - check if it starts with <svg
    return content.startsWith('<svg') || content.includes('<svg');
  } catch (error) {
    return false;
  }
}

// Recursively find all .svg files in a directory
function getAllSvgFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllSvgFiles(filePath, fileList);
    } else if (filePath.endsWith('.svg')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function uploadAllSvgs() {
  const svgFiles = getAllSvgFiles(svgDir);
  if (svgFiles.length === 0) {
    console.log('No SVG files found in', svgDir);
    return;
  }
  
  console.log(`Found ${svgFiles.length} SVG files. Starting validation and upload...`);
  
  for (const file of svgFiles) {
    try {
      // Validate SVG file before upload
      if (!isValidSvgFile(file)) {
        console.warn(`⚠️  Skipping invalid/empty SVG file: ${file}`);
        continue;
      }
      
      const relativePath = path.relative(__dirname, file).replace(/\\/g, '/'); // for Windows compatibility
      const publicId = relativePath.replace(/\//g, '_').replace(/src_assets_/, ''); // flatten but unique

      const result = await cloudinary.uploader.upload(file, {
        resource_type: 'image',
        folder: 'public_assets_icon',
        public_id: publicId.replace(/\.svg$/, ''), // remove .svg extension for Cloudinary
        overwrite: false,
      });
      console.log(`✅ Uploaded: ${file} -> ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err.message);
    }
  }
}

uploadAllSvgs(); 