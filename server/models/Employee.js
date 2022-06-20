const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    designation: {
        type: String
    }

});

module.exports = mongoose.model('Employee', EmployeeSchema);