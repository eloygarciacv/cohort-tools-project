const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Import the provided files with JSON data of students and cohorts here:
// ...

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Set up CORS middleware here:
// ...
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ["http://localhost:5173"],
  }),
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const Student = require("./models/Student.model");
const Cohort = require("./models/Cohort.model");

// STUDENT ROUTES

app.post("/api/students", async (req, res) => {
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

app.get("/api/students", async (req, res) => {
  try {
    const response = await Student.find().populate("cohort");
    console.log(response)
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get("/api/students/cohort/:cohortId", async (req, res) => {
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

app.get("/api/students/:studentId", async (req, res) => {
  try {
    const response = await Student.findById(req.params.studentId).populate("cohort");
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.patch("/api/students/:studentId", async (req, res) => {
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

app.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// COHORT ROUTES

app.post("/api/cohorts", async (req, res) => {
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

app.get("/api/cohorts", async (req, res) => {
  try {
    const response = await Cohort.find();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.get("/api/cohorts/:cohortId", async (req, res) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

app.patch("/api/cohorts/:cohortId", async (req, res) => {
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

app.delete("/api/cohorts/:cohortId", async (req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);
    res.json({ message: "Cohort deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
