const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'kafeaffair_super_secret_jwt_key_2026';

async function authenticateAdmin(request, reply) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'Unauthorized: Missing or invalid authorization token.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || decoded.role !== 'admin') {
      return reply.status(403).send({ error: 'Forbidden: Admin access required.' });
    }

    request.user = decoded;
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized: Invalid or expired token.' });
  }
}

module.exports = { authenticateAdmin, JWT_SECRET };
