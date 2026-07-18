import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import multiparty from 'multiparty'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

function s3UploadMiddleware() {
  return {
    name: 's3-upload-middleware',
    configureServer(server: any) {
      server.middlewares.use('/api/upload', (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const region = process.env.AWS_REGION || 'ap-south-1';
        const bucket = process.env.AWS_S3_BUCKET_NAME;

        if (!accessKeyId || !secretAccessKey || !bucket) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'AWS credentials or bucket name are missing in the .env file.' }));
          return;
        }

        const s3 = new S3Client({
          region,
          credentials: {
            accessKeyId,
            secretAccessKey
          }
        });

        const form = new multiparty.Form();
        form.parse(req, async (err: any, _fields: any, files: any) => {
          if (err) {
            console.error('Multiparty error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to parse form file data.' }));
            return;
          }

          const file = files.file?.[0];
          if (!file) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No file uploaded.' }));
            return;
          }

          try {
            const fileStream = fs.createReadStream(file.path);
            const fileName = `${Date.now()}_${path.basename(file.originalFilename)}`;
            
            const upload = new Upload({
              client: s3,
              params: {
                Bucket: bucket,
                Key: fileName,
                Body: fileStream,
                ContentType: file.headers['content-type']
              }
            });

            await upload.done();
            
            const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${fileName}`;
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ url: fileUrl }));
          } catch (uploadError: any) {
            console.error('S3 Upload Error:', uploadError);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: uploadError.message }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), s3UploadMiddleware()],
})
