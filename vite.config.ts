import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import multiparty from 'multiparty'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

function devApiMiddleware() {
  return {
    name: 'dev-api-middleware',
    configureServer(server: any) {
      // S3 File Upload Handler
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

      // Contact Form Email Submission Handler
      server.middlewares.use('/api/contact', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: any) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            const recipientEmail = process.env.RECIPIENT_EMAIL || 'viraliamstudio@gmail.com';
            const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
            const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
            const smtpUser = process.env.SMTP_USER;
            const smtpPass = process.env.SMTP_PASS;

            if (!smtpUser || !smtpPass) {
              console.log('📬 NEW LEAD ENQUIRY RECEIVED (Add SMTP_USER and SMTP_PASS to .env to receive direct emails):', data);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Enquiry received locally.' }));
              return;
            }

            const transporter = nodemailer.createTransport({
              host: smtpHost,
              port: smtpPort,
              secure: smtpPort === 465,
              auth: {
                user: smtpUser,
                pass: smtpPass,
              },
            });

            const mailOptions = {
              from: `"Viraliam Website Lead" <${smtpUser}>`,
              to: recipientEmail,
              replyTo: data.email,
              subject: `🔥 New Project Enquiry from ${data.name} (${data.businessName || 'Business'})`,
              html: `
                <div style="font-family: Arial, sans-serif; background-color: #0f0f0f; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #222;">
                  <h2 style="color: #ff6b00; margin-bottom: 20px;">New Project Lead - Viraliam</h2>
                  <table style="width: 100%; border-collapse: collapse; color: #dddddd; font-size: 14px;">
                    <tr><td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; width: 140px; color: #888;">Client Name:</td><td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #fff;">${data.name}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #888;">Business / Brand:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #fff;">${data.businessName || 'N/A'}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #888;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #333;"><a href="mailto:${data.email}" style="color: #ff6b00; text-decoration: none;">${data.email}</a></td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #888;">Phone:</td><td style="padding: 10px; border-bottom: 1px solid #333;"><a href="tel:${data.phone}" style="color: #ff6b00; text-decoration: none;">${data.phone}</a></td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #888;">Service Needed:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #d4af37; font-weight: bold;">${data.service}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #333; font-weight: bold; color: #888;">Estimated Budget:</td><td style="padding: 10px; border-bottom: 1px solid #333; color: #10b981; font-weight: bold;">${data.budget}</td></tr>
                  </table>
                  <h3 style="color: #ffffff; margin-top: 24px; margin-bottom: 8px;">Project Details / Message:</h3>
                  <div style="background-color: #181818; padding: 16px; border-radius: 8px; border-left: 4px solid #ff6b00; color: #eeeeee; line-height: 1.6;">
                    ${data.message || 'No additional message provided.'}
                  </div>
                </div>
              `
            };

            await transporter.sendMail(mailOptions);
            console.log(`✅ Email notification sent to ${recipientEmail}`);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } catch (err: any) {
            console.error('Email sending error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message || 'Failed sending email.' }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devApiMiddleware()],
})
