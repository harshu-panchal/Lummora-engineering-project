const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    section: { type: String, required: true, unique: true }, // 'header', 'footer', 'about', 'services'
    data: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('Content', contentSchema);
