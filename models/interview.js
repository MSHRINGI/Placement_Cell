const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    name:{
        type: String
    },
    date:{
        type: Date
    }
},{
    timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;