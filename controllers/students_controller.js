const Student = require('../models/student');
const Relation = require('../models/relationship');
const path = require('path');
const { Parser } = require('json2csv');
const fs = require('fs');

module.exports.list = async function (req, res) {
    try {
        let students = await Student.find({});
        return res.render('studentsList', {
            title: "Students List",
            students: students
        });
    } catch (err) {
        console.log("Error in fetching list of all students", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

module.exports.form = async function (req, res) {
    try {
        return res.render('studentForm', {
            title: "Student Form",
        });
    } catch (err) {
        console.log("Error in showing form", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

module.exports.create = async function (req, res) {
    try {
        let student = await Student.findOne({ email: req.body.email });
        if (student) {
            req.flash('error', "Student Already Exists");
            console.log("Student Already Exists");
            return res.redirect('back');
        }
        student = await Student.create(req.body);

        student.addedBy = req.user._id;
        student.save();

        req.flash('success', "Student Added!!");
        console.log("Student Added");
        return res.redirect('/students/list');

    } catch (err) {
        console.log("Error in creating student", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

module.exports.update = async function (req, res) {
    try {
        console.log("Body", req.body);
        let students = [];
        let results;

        if (typeof req.body.result == "string") {
            results = [req.body.result];
        } else {
            results = req.body.result;
        }
        console.log(typeof results);

        students = await Relation.find({ interview: req.params.id });
        // console.log("Students from update", students);
        for (let i = 0; i < students.length; i++) {
            students[i].result = results[i];
            students[i].save();
        }
        req.flash('success', "Results Updated!!");
        return res.redirect('back');
    } catch (err) {
        console.log("Error in updating students details", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}

module.exports.download = async function (req, res) {
    try {
        let allDetails = await Relation.find({}, 'interview student result').populate('interview', 'name date')
            .populate('student', 'name collegeName placementStatus DSA_score webD_score react_score');
        
        const fields = [{
            label: 'Student ID',
            value: 'student._id'
        },{
            label: 'Student Name',
            value: 'student.name'
        }, {
            label: 'Student Collage',
            value: 'student.collegeName'
        }, {
            label: 'Student Status',
            value: 'student.placementStatus'
        },{
            label: 'DSA Final Score',
            value: 'student.DSA_score'
        },{
            label: 'WebD Final Score',
            value: 'student.webD_score'
        },{
            label: 'React Final Score',
            value: 'student.react_score'
        },{
            label: 'Interview Date',
            value: 'interview.date'
        },{
            label: 'Interview Company',
            value: 'interview.name'
        },{
            label: 'Interview Student Result',
            value: 'result'
        },
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(allDetails);
        console.log("Path:-", path.join(__dirname, '../public', 'students_data.csv'));

        fs.writeFileSync(path.join(__dirname, '../public', 'students_data.csv'), csv);
        return res.download(path.join(__dirname, '../public', '/students_data.csv'), function(err){
            if(err){
                console.log("Error in downloding file", err);
                req.flash('error', "Error in downloding file");
                return res.redirect('back');
            }
        });
    } catch (err) {
        console.log("Error in downloading students details", err);
        req.flash('error', "Something went wrong");
        return res.redirect('back');
    }
}