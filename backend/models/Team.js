const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    linkedin: { type: String },
    email: { type: String }
});

module.exports = mongoose.model('Team', teamSchema);
