const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');
const { defaultCategories, defaultMenuItems } = require('../seedData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kafeaffair';

async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('🍃 MongoDB connected successfully.');

    // Auto-seed Admin User if no users exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const adminUser = new User({
        username: adminUsername,
        password: hashedPassword,
        role: 'admin',
      });
      await adminUser.save();
      console.log(`🔑 Auto-seeded admin account (username: ${adminUsername}).`);
    }

    // Auto-seed Categories if empty
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(defaultCategories);
      console.log(`🌱 Auto-seeded ${defaultCategories.length} default categories.`);
    }

    // Auto-seed Menu Items if empty
    const menuItemCount = await MenuItem.countDocuments();
    if (menuItemCount === 0) {
      await MenuItem.insertMany(defaultMenuItems);
      console.log(`🌱 Auto-seeded ${defaultMenuItems.length} default menu items.`);
    }
  } catch (err) {
    console.warn('⚠️ MongoDB connection error or offline. Server running in fallback mode:', err.message);
  }
}

module.exports = { connectDatabase };
