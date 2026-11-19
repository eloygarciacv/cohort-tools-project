const express = require("express");
const router = express.Router();

const Student = require("../models/Student.model");


// STUDENT ROUTES

router.post("/", async (req, res) => {
  try {
    const response = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects,
      // cohorts: req.body.cohorts,
    });

    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Student.find().populate("cohort");
    console.log(response)
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    // For this one I think we need the collection relationship.
    const response=await Student.find({cohort:req.params.cohortId}).populate("cohort")
    console.log(response)
    res.json(response)
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const response = await Student.findById(req.params.studentId).populate("cohort");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.patch("/:studentId", async (req, res) => {
  try {
    const response = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        linkedinUrl: req.body.linkedinUrl,
        languages: req.body.languages,
        program: req.body.program,
        background: req.body.background,
        image: req.body.image,
        projects: req.body.projects,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


module.exports = router;