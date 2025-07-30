import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
});

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'Image_uploads',
        resource_type: 'auto', 
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return reject(
            new Error('Cloudinary Image Upload failed: ' + error.message)
          );
        }

        if (result) {
          const { secure_url, public_id } = result;
          return resolve({ secure_url, public_id });
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

export default uploadImage;
