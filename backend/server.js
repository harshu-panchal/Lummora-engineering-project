require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
const multerCloudinary = require('multer-storage-cloudinary');
const CloudinaryStorage = multerCloudinary.CloudinaryStorage || multerCloudinary;
const multer = require('multer');

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lummora_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
    }
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : null,
            'http://localhost:5173',
            'https://lummora-engineering-project.vercel.app'
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("CORS Rejected for Origin:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/lummora_db')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// Models
const Team = require('./models/Team');
const Content = require('./models/Content');
const User = require('./models/User');

// --- UPLOAD ROUTE ---
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            console.error("Upload Error: No file provided");
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log("Upload Success:", req.file.path);
        res.json({ url: req.file.path });
    } catch (err) {
        console.error("Upload Route Crash:", err);
        res.status(500).json({ message: 'Upload failed', error: err.message });
    }
});
// --- AUTH ROUTES ---
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- CONTENT ROUTES ---
app.get('/api/content/:section', async (req, res) => {
    try {
        const content = await Content.findOne({ section: req.params.section });
        res.json(content ? content.data : {});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/content/:section', async (req, res) => {
    try {
        const content = await Content.findOneAndUpdate(
            { section: req.params.section },
            { data: req.body },
            { upsert: true, new: true }
        );
        res.json(content.data);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- TEAM ROUTES ---
app.get('/api/team', async (req, res) => {
    try {
        const team = await Team.find();
        res.json(team);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/team', async (req, res) => {
    try {
        const member = new Team(req.body);
        await member.save();
        res.json(member);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/team/:id', async (req, res) => {
    try {
        const member = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(member);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/team/sync', async (req, res) => {
    try {
        await Team.deleteMany({});
        const team = await Team.insertMany(req.body);
        res.json(team);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/team/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ message: 'Member deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- CONTACT FORM & EMAIL ---
app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Setup transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // Need app password here
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.ADMIN_EMAIL,
        subject: `New Inquiry: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending email. Ensure EMAIL_PASS is correct app password.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
