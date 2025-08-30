const mongoose = require('mongoose');
const AdminService = require('../services/admin.services');
require('dotenv').config();

async function createFirstAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const admin = await AdminService.createFirstAdmin(
      'admin@devnovate.com',
      'SecureAdmin123!'
    );
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: SecureAdmin123!');
    console.log('🔗 Login at: http://localhost:5000/admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createFirstAdmin();