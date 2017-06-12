const   mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const imageSchema = new Schema({
    src: String,
    data: Object,
    cssFilter: Object,
    likes: {type: Number, default: 0}
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;