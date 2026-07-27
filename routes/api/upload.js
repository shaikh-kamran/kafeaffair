const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream/promises');
const { authenticateAdmin } = require('../../middleware/authHook');

async function uploadRoutes(fastify, options) {
  // Ensure uploads directory exists in both public/ and dist/
  const publicUploadsDir = path.join(__dirname, '../../public/uploads');
  const distUploadsDir = path.join(__dirname, '../../dist/uploads');

  if (!fs.existsSync(publicUploadsDir)) {
    fs.mkdirSync(publicUploadsDir, { recursive: true });
  }
  if (!fs.existsSync(distUploadsDir)) {
    fs.mkdirSync(distUploadsDir, { recursive: true });
  }

  // POST /api/upload (Protected)
  fastify.post('/api/upload', { preHandler: authenticateAdmin }, async (request, reply) => {
    try {
      const data = await request.file();
      if (!data) {
        return reply.status(400).send({ error: 'No image file uploaded.' });
      }

      const validMimetypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
      if (!validMimetypes.includes(data.mimetype)) {
        return reply.status(400).send({ error: 'Invalid file format. Only JPG, PNG, WEBP, GIF images allowed.' });
      }

      const ext = path.extname(data.filename) || '.png';
      const cleanName = path.basename(data.filename, ext).toLowerCase().replace(/[^a-z0-9]/g, '-');
      const uniqueFilename = `item-${Date.now()}-${cleanName}${ext}`;

      const publicFilePath = path.join(publicUploadsDir, uniqueFilename);
      const distFilePath = path.join(distUploadsDir, uniqueFilename);

      // Save file to public/uploads
      await pipeline(data.file, fs.createWriteStream(publicFilePath));

      // Copy file to dist/uploads if dist exists
      if (fs.existsSync(path.join(__dirname, '../../dist'))) {
        fs.copyFileSync(publicFilePath, distFilePath);
      }

      const fileUrl = `/uploads/${uniqueFilename}`;
      return { success: true, url: fileUrl };
    } catch (err) {
      reply.status(500).send({ error: 'Failed to upload image', details: err.message });
    }
  });
}

module.exports = uploadRoutes;
