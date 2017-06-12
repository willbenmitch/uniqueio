const   mongoose = require(mongoose),
        Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    src: String,
    MSid: String,
    images: [{type: Schema.Types.OjectId, ref: 'Image'}]
});

const User = mongoose.model('Image', userSchema);

module.exports = User;