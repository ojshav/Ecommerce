const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'do3vxz4gw', // Your Cloudinary cloud name
  api_key: '996945913497121', // Your Cloudinary API key
  api_secret: 'W2lakwZXmuouX8QRZgxckrvJZO0', // Your Cloudinary API secret
});

const videoDir = path.join(__dirname, 'public', 'assets', 'videos');

// Function to validate video file
function isValidVideoFile(filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (stat.size === 0) {
      return false;
    }
    // Check if file has a video extension
    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'];
    const ext = path.extname(filePath).toLowerCase();
    return videoExtensions.includes(ext);
  } catch (error) {
    return false;
  }
}

// Recursively find all video files in a directory
function getAllVideoFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllVideoFiles(filePath, fileList);
    } else if (isValidVideoFile(filePath)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function uploadAllVideos() {
  const videoFiles = getAllVideoFiles(videoDir);
  if (videoFiles.length === 0) {
    console.log('No video files found in', videoDir);
    return;
  }
  
  console.log(`Found ${videoFiles.length} video files. Starting validation and upload...`);
  
  for (const file of videoFiles) {
    try {
      // Validate video file before upload
      if (!isValidVideoFile(file)) {
        console.warn(`⚠️  Skipping invalid/empty video file: ${file}`);
        continue;
      }
      
      const relativePath = path.relative(__dirname, file).replace(/\\/g, '/'); // for Windows compatibility
      const publicId = relativePath.replace(/\//g, '_').replace(/public_assets_videos_/, ''); // flatten but unique

      console.log(`📤 Uploading: ${file}...`);
      
      const result = await cloudinary.uploader.upload(file, {
        resource_type: 'video',
        folder: 'public_assets_videos',
        public_id: publicId.replace(/\.[^/.]+$/, ''), // remove file extension for Cloudinary
        overwrite: false,
        // Video-specific options
        chunk_size: 6000000, // 6MB chunks for large files
        eager: [
          { width: 300, height: 300, crop: "pad", audio_codec: "none" },
          { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
        ],
        eager_async: true,
        eager_notification_url: "https://mysite.example.com/notify_endpoint"
      });
      
      console.log(`✅ Uploaded: ${file}`);
      console.log(`   📺 Video URL: ${result.secure_url}`);
      console.log(`   📊 Duration: ${result.duration}s`);
      console.log(`   📏 Size: ${(result.bytes / 1024 / 1024).toFixed(2)}MB`);
      console.log(`   🆔 Public ID: ${result.public_id}`);
      console.log('---');
      
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err.message);
      if (err.http_code) {
        console.error(`   HTTP Code: ${err.http_code}`);
      }
    }
  }
  
  console.log('🎬 Video upload process completed!');
}

uploadAllVideos(); 