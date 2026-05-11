import dbConnect from '../lib/database/mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seedAdmin() {
  try {
    await dbConnect();
    
    const email = process.env.ADMIN_EMAIL || 'admin@aura.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await User.create({
      name: 'Primary Admin',
      email,
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
