require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fastify = require('fastify')({
  logger: true,
});
const { connectDatabase } = require('./config/db');

const DEFAULT_PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Register plugins
fastify.register(require('@fastify/compress'));
fastify.register(require('@fastify/multipart'), {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// SEO & Security Headers Hook
fastify.addHook('onRequest', async (request, reply) => {
  reply.header('X-UA-Compatible', 'IE=edge');
  reply.header('X-Content-Type-Options', 'nosniff');
  reply.header('X-Frame-Options', 'SAMEORIGIN');
  reply.header('X-XSS-Protection', '1; mode=block');
  reply.header('Content-Language', 'en-US');
});

// Register API Routes
fastify.register(require('./routes/api/auth'));
fastify.register(require('./routes/api/categories'));
fastify.register(require('./routes/api/menu'));
fastify.register(require('./routes/api/upload'));

// Serve uploaded images statically
const uploadsFolder = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
}
fastify.register(require('@fastify/static'), {
  root: uploadsFolder,
  prefix: '/uploads/',
  decorateReply: false,
});

// Serve frontend assets or built dist folder
const distFolder = path.join(__dirname, 'dist');
if (fs.existsSync(distFolder)) {
  fastify.register(require('@fastify/static'), {
    root: distFolder,
    prefix: '/',
  });
} else {
  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/',
  });
}

// Health check endpoint
fastify.get('/api/health', async (request, reply) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  return { status: 'ok', service: 'kafeaffair-fastify', dbStatus, timestamp: new Date().toISOString() };
});

// SPA Fallback Handler for client-side routing
fastify.setNotFoundHandler((request, reply) => {
  if (request.raw.url.startsWith('/api')) {
    reply.status(404).send({ error: 'API route not found' });
  } else {
    reply.sendFile('index.html');
  }
});

const listenOnPort = async (port) => {
  try {
    await fastify.listen({ port: Number(port), host: HOST });
    console.log(`\n🚀 Kafe Affair Fastify Server running at http://localhost:${port}\n`);
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, trying port ${Number(port) + 1}...`);
      await listenOnPort(Number(port) + 1);
    } else {
      fastify.log.error(err);
      process.exit(1);
    }
  }
};

async function main() {
  await connectDatabase();
  await listenOnPort(DEFAULT_PORT);
}

main();
