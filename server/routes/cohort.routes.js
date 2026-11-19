
const express = require("express");
const router = express.Router();

const Cohort = require("../models/cohort.model");

// COHORT ROUTES

router.post("/", async (req, res) => {
  try {
    const response = await Cohort.create({
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    });

    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Cohort.find();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.patch("/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      {
        inProgress: req.body.inProgress,
        cohortSlug: req.body.cohortSlug,
        cohortName: req.body.cohortName,
        program: req.body.program,
        campus: req.body.campus,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        programManager: req.body.programManager,
        leadTeacher: req.body.leadTeacher,
        totalHours: req.body.totalHours,
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

router.delete("/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ message: "Cohort deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;