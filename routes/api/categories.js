const Category = require('../../models/Category');
const { authenticateAdmin } = require('../../middleware/authHook');

async function categoriesRoutes(fastify, options) {
  // GET /api/categories (Public)
  fastify.get('/api/categories', async (request, reply) => {
    try {
      const categories = await Category.find().sort({ displayOrder: 1, createdAt: 1 });
      return categories;
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch categories', details: err.message });
    }
  });

  // POST /api/categories (Protected)
  fastify.post('/api/categories', { preHandler: authenticateAdmin }, async (request, reply) => {
    try {
      const { name, slug, icon, displayOrder } = request.body || {};
      if (!name || !slug) {
        return reply.status(400).send({ error: 'Name and slug are required fields.' });
      }

      const existing = await Category.findOne({ slug: slug.toLowerCase() });
      if (existing) {
        return reply.status(400).send({ error: 'A category with this slug already exists.' });
      }

      const newCategory = new Category({
        name,
        slug: slug.toLowerCase(),
        icon: icon || '🍽️',
        displayOrder: displayOrder || 0,
      });

      await newCategory.save();
      return reply.status(201).send(newCategory);
    } catch (err) {
      reply.status(500).send({ error: 'Failed to create category', details: err.message });
    }
  });

  // PUT /api/categories/:id (Protected)
  fastify.put('/api/categories/:id', { preHandler: authenticateAdmin }, async (request, reply) => {
    try {
      const { id } = request.params;
      const updates = request.body || {};

      if (updates.slug) {
        updates.slug = updates.slug.toLowerCase();
      }

      const updated = await Category.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) {
        return reply.status(404).send({ error: 'Category not found.' });
      }
      return updated;
    } catch (err) {
      reply.status(500).send({ error: 'Failed to update category', details: err.message });
    }
  });

  // DELETE /api/categories/:id (Protected)
  fastify.delete('/api/categories/:id', { preHandler: authenticateAdmin }, async (request, reply) => {
    try {
      const { id } = request.params;
      const deleted = await Category.findByIdAndDelete(id);
      if (!deleted) {
        return reply.status(404).send({ error: 'Category not found.' });
      }
      return { success: true, message: 'Category deleted successfully.' };
    } catch (err) {
      reply.status(500).send({ error: 'Failed to delete category', details: err.message });
    }
  });
}

module.exports = categoriesRoutes;
