const Interview = require('../models/interview');
const Student = require('../models/student');
const Relation = require('../models/relationship');

// For rendering the interviews list page
module.exports.list = async function(req, res){
    try{
        let interviews = await Interview.find({});
        let students = await Student.find({});
        return res.render('interviewsList', {
            title: "Interviews List",
            interviews: interviews,
            students: students
        });
    }catch(err){
        console.log("Error in fetching list of all interviews", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

// for creating the Interview
module.exports.create = async function(req, res){
    try{
        let interview = await Interview.create(req.body);
        req.flash('success', "Interview Created!!");
        return res.redirect('/interviews/list');
    }catch(err){
        console.log("Error in creating interviews form", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

// for allocating Student to an Interview
module.exports.allocateInterview = async function(req, res){
    try{
        let relation = await Relation.find({interview: req.body.interview, student: req.body.student});
        if(relation.length > 0){
            console.log("Interview already allocate to the student");
            req.flash('error', "Already Alloted!!");
            return res.redirect('back');
        }
        relation = await Relation.create(req.body);
        let student = await Student.findById(req.body.student);
        student.interviews.push(relation._id);
        student.save();
        req.flash('success', "Interview Alloted!!");
        return res.redirect('back');

    }catch(err){
        console.log("Error in allocating interview to student", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

// For updating the details of student result
module.exports.interviewDetail = async function(req, res){
    try{
        let students = [];
        students = await Relation.find({interview: req.params.id}).populate('student').populate('interview');
        return res.render('selectedInterview', {
            title: "Interview Details",
            students: students,
            interviewId: req.params.id
        });
    }catch(err){
        console.log("Error in fetching interview details", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}