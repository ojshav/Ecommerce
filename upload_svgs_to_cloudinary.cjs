const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'do3vxz4gw', // Your Cloudinary cloud name
  api_key: '996945913497121', // <-- Replace with your Cloudinary API key
  api_secret: 'W2lakwZXmuouX8QRZgxckrvJZO0', // <-- Replace with your Cloudinary API secret
});


const svgDir = path.join(__dirname, 'src', 'assets');

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
  for (const file of svgFiles) {
    try {
      const relativePath = path.relative(__dirname, file).replace(/\\/g, '/'); // for Windows compatibility
      const publicId = relativePath.replace(/\//g, '_').replace(/src_assets_/, ''); // flatten but unique

      const result = await cloudinary.uploader.upload(file, {
        resource_type: 'image',
        folder: 'svg_assets',
        public_id: publicId.replace(/\.svg$/, ''), // remove .svg extension for Cloudinary
        overwrite: false,
      });
      console.log(`Uploaded: ${file} -> ${result.secure_url}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }
}

uploadAllSvgs(); 