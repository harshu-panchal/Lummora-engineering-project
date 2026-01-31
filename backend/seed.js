require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lummora_db');
        const existing = await User.findOne({ email: 'wazahatqureshi4@gmail.com' });
        if (!existing) {
            const admin = new User({
                email: 'wazahatqureshi4@gmail.com',
                password: 'adminpannelpassword' // User can change this later
            });
            await admin.save();
            console.log('Admin user created: wazahatqureshi4@gmail.com / adminpannelpassword');
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
