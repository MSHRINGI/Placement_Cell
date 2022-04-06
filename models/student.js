const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    phoneNumber:{
        type: Number
    },
    collegeName:{
        type: String
    },
    placementStatus:{
        type: String
    },
    batch:{
        type: String
    },
    DSA_score:{
        type: Number
    },
    webD_score:{
        type: Number
    },
    react_score:{
        type: Number
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