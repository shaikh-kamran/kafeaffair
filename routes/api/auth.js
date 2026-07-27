const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { authenticateAdmin, JWT_SECRET } = require('../../middleware/authHook');

async function authRoutes(fastify, options) {
  // POST /api/auth/login
  fastify.post('/api/auth/login', async (request, reply) => {
    try {
      const { username, password } = request.body || {};
      if (!username || !password) {
        return reply.status(400).send({ error: 'Username and password are required.' });
      }

      const user = await User.findOne({ username: username.toLowerCase().trim() });
      if (!user) {
        return reply.status(401).send({ error: 'Invalid username or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return reply.status(401).send({ error: 'Invalid username or password.' });
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
      };
    } catch (err) {
      reply.status(500).send({ error: 'Login failed', details: err.message });
    }
  });

  // GET /api/auth/me
  fastify.get('/api/auth/me', { preHandler: authenticateAdmin }, async (request, reply) => {
    return { user: request.user };
  });
}

module.exports = authRoutes;
