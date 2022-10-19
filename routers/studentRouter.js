const express = require("express");
const { Student } = require("../models/students");
const router = express.Router();

///////// GET /////////

const studentList = async (req, res) => {
  const students = await Student.find().sort({ name: 1 });
  res.send(students);
};

/////POST ///////

const newStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    const result = await student.save();
    res.send(result);
  } catch (err) {
    const errMsgs = [];
    for (field in err.errors) {
      errMsgs.push(err.errors[field].message);
    }
    return res.status(400).send(errMsgs);
  }
};

//// SEARCHING ////

const studentDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).send("ID NOT FOund !");
    res.send(student);
  } catch (err) {
    return res.status(404).send("ID NOT FOund !");
  }
};

/////////// UPDATE ///

const studentUpdate = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const student = await Student.findByIdAndUpdate(id, updateData, { new: true, useFindAndModify: false });
    if (!student) return res.status(404).send("ID NOT FOund !");
    res.send(student);
  } catch (err) {
    return res.status(404).send("ID NOT FOund !");
  }
};

///////// DELETE //////

const studentDelete = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) return res.status(404).send("ID NOT FOund !");
    res.send(student);
  } catch (err) {
    return res.status(404).send("ID NOT FOund !");
  }
};

router.route("/").get(studentList).post(newStudent);

router.route("/:id").get(studentDetail).put(studentUpdate).delete(studentDelete);

module.exports = router;
