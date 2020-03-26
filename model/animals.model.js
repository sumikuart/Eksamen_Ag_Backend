const mongoose = require('mongoose');
const schema = mongoose.Schema;

let animals = new schema({

    id: {
        type:Number,
        default: 0
    },
    title: {
        type:String,
        default: 'Kommer senere'
    },
    content: {
        type:String,
        default: 'Kommer senere'
    },
    image: {
        type:String,
        default: 'Kommer senere'
    },
    daysInCare: {
        type:String,
        default: '0'
    },
    age: {
        type:String,
        default: "Kommer senere"
    },
    sex: {
        type:String,
        default: "Kommer senere"
    },
    details: {
        type:String,
        default: "Kommer senere"
    }

});


module.exports = mongoose.model('animals', animals, 'animals')