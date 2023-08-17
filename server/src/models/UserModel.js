// const mongoose = require('mongoose');
// const {Schema} = mongoose;
//
//
// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     email : {
//         type: String,
//         required: true,
//         trim: true,
//         unique: true,
//     },
//     password : {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     role:{
//         type: String,
//         default: 'user',
//     }
// }, { timestamps: true, versionKey: false })
//
// const User = mongoose.model('User', userSchema);
//
// module.exorts = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user',
    }
}
    , { timestamps: true, versionKey: false }
);

const UserModal = mongoose.model('User', userSchema);

module.exports = UserModal;


