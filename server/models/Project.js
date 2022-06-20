const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    description:{
        type: String,
    },
    status:{
        type: String,
        enum: ["Not Started", "In Progress", "Completed"]
    },
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }

});

module.exports = mongoose.model('Project', ProjectSchema);