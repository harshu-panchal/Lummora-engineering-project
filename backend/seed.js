require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lummora_db');
        const existing = await User.findOne({ email: 'demo@gmail.com' });
        if (!existing) {
            const admin = new User({
                email: 'demo@gmail.com',
                password: 'demo'
            });
            await admin.save();
            console.log('Admin user created: demo@gmail.com / demo');
        } else {
            console.log('Admin already exists');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
