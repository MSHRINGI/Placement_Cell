const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    interview:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    },
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    result:{
        type: String,
    }
},{
    timestamps: true
});

const Relation = mongoose.model('Relation', relationSchema);
module.exports = Relation;