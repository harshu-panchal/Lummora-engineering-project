require('dotenv').config();
const mongoose = require('mongoose');
const Content = require('./models/Content');
const Team = require('./models/Team');

// We can't easily import ES modules in this commonjs seed script without extra steps, 
// so I'll manually define the initial data from content.js for the seed.
const initialData = {
    companyData: {
        name: "LUMMORA Engineering Projects Private Limited",
        tagline: "Building Excellence, Engineering Success",
        description: "At LUMMORA Engineering Projects Private Limited, we deliver high-quality construction and mechanical engineering solutions that transform vision into reality.",
        phone: "+91 91574 73449, +91 63889 47064",
        email: "lumora.aura369@gmail.com",
        address: "Reg. Office: [City, State, India]"
    },
    services: [
        { title: "Construction Services", desc: "Comprehensive construction services tailored to modern infrastructure." },
        { title: "Mechanical Engineering", desc: "Efficiency, durability, and compliance with industry standards." }
    ],
    whyChooseUs: [
        { title: "Proven Track Record", desc: "Consistency across multiple sectors." },
        { title: "Strong Safety Culture", desc: "Safety is our top priority." }
    ]
};

const initialTeam = [
    {
        name: "Amit Verma",
        role: "Managing Director",
        bio: "Over 25 years of experience in civil and mechanical engineering leadership.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lummora_db');

        // Seed Content
        for (const [section, data] of Object.entries(initialData)) {
            await Content.findOneAndUpdate({ section }, { data }, { upsert: true });
        }

        // Seed Team
        const existingTeam = await Team.find();
        if (existingTeam.length === 0) {
            await Team.insertMany(initialTeam);
        }

        console.log('Database seeded with initial content and team members.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
