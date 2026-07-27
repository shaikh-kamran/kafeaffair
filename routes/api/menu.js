const MenuItem = require('../../models/MenuItem');
const Category = require('../../models/Category');
const { defaultCategories, defaultMenuItems } = require('../../seedData');
const { authenticateAdmin } = require('../../middleware/authHook');

async function menuRoutes(fastify, options) {
  // GET /api/menu (Public)
  fastify.get('/api/menu', async (request, reply) => {
    try {
      const { category } = request.query || {};
      const query = category ? { category } : {};
      const items = await MenuItem.find(query).sort({ createdAt: -1 });
      return items;
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch menu items', details: err.message });
    }
  });

  // POST /api/menu (Protected)
  fastify.post('/api/menu', { preHandler: authenticateAdmin }, async (request, reply) => {
    try {
      const { title, category, price, discountedPrice, img, desc } = request.body || {};
      if (!title || !category || !price || !img) {
        return reply.status(400).send({ error: 'Title, category, price, and image are required.' });
      }

      const newItem = new MenuItem({
        title,
        category,
        price,
        discountedPrice: discountedPrice || '',
        img,
        desc: desc || '',
      });

      await newItem.save();
      return reply.status(201).send(newItem);
    } catch (err) {
      reply.status(500).send({ error: 'Failed to create menu item', details: err.message });
    }
  });

  // PUT /api/menu/:id (Protected)
  fastify.put('/api/menu/:id', { preHandler: authenticateAdmin }, async (request, reply) => {
    try {
      const { id } = request.params;
      const updates = request.body || {};

      const updated = await MenuItem.findByIdAndUpdate(id, updates, { new: true });
      if (!updated) {
        return reply.status(404).send({ error: 'Menu item not found.' });
      }
      return updated;
    } catch (err) {
      reply.status(500).send({ error: 'Failed to update menu item', details: err.message });
    }
  });

  // DELETE /api/menu/:id (Protected)
  fastify.delete('/api/menu/:id', { preHandler: authenticateAdmin }, async (request, reply) => {
    try {
      const { id } = request.params;
      const deleted = await MenuItem.findByIdAndDelete(id);
      if (!deleted) {
        return reply.status(404).send({ error: 'Menu item not found.' });
      }
      return { success: true, message: 'Menu item deleted successfully.' };
    } catch (err) {
      reply.status(500).send({ error: 'Failed to delete menu item', details: err.message });
    }
  });

  // POST /api/menu/seed (Protected)
  fastify.post('/api/menu/seed', { preHandler: authenticateAdmin }, async (request, reply) => {
    try {
      await Category.deleteMany({});
      await MenuItem.deleteMany({});

      const insertedCategories = await Category.insertMany(defaultCategories);
      const insertedItems = await MenuItem.insertMany(defaultMenuItems);

      return {
        success: true,
        categoriesSeeded: insertedCategories.length,
        menuItemsSeeded: insertedItems.length,
      };
    } catch (err) {
      reply.status(500).send({ error: 'Failed to seed database', details: err.message });
    }
  });
}

module.exports = menuRoutes;
