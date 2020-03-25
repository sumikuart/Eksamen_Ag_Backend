const mongoose = require('mongoose');
const schema = mongoose.Schema;

let admin = new schema({

    email: {
        type:String,
        default: 'Error  - email'
    },
    password: {
        type:String,
        default: 'Error  - password'
    },
    level:{
        type:String,
        default: ''
    }

});


module.exports = mongoose.model('admin', admin, 'admin')