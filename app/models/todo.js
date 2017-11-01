var mongoose = require('mongoose');

module.exports = mongoose.model('tbtodo', {
    text: {
        type: String,
        default: ''
    }
});