const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    collegeName:{
        type: String,
        required: true
    },
    placementStatus:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    DSA_score:{
        type: Number,
        required: true
    },
    webD_score:{
        type: Number,
        required: true
    },
    react_score:{
        type: Number,
        required: true
    },
    addedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    interviews:[

    ]
},{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;