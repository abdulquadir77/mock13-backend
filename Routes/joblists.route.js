const express = require("express");
const joblistsRouter = express.Router();

const AdminFormModel = require("../Models/AdminFormModel");

joblistsRouter.get("/", async (req, res) => {
  try {
    const todo = await AdminFormModel.find();
    res.send(todo);
  } catch (error) {
    console.log("Somthing Error in JobLists");
    console.log(error);
  }
});

joblistsRouter.post("/jobcreate", async (req, res) => {
  const { company_name, position, contract, location } = req.body;
  try {
    const todo = new AdminFormModel({
      company_name,
      position,
      contract,
      location,
    });
    await todo.save();
    res.send("Job Created Successfully");
  } catch (error) {
    console.log("Somthing Error in Create");
    console.log(error);
    res.send("somthing error in create function");
  }
});

joblistsRouter.patch("/jobedit/:noteID", async (req, res) => {
  let noteID = req.params.noteID;
  let payload = req.body;

  try {
    await AdminFormModel.findByIdAndUpdate({ _id: noteID }, payload);
    res.send("Job Edited Successfully");
  } catch (error) {
    console.log(error);
    console.log("Somthing error in Edit");
  }
});

joblistsRouter.delete("/jobdelete/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  try {
    await AdminFormModel.findByIdAndDelete({ _id: noteID });
    res.send("Job Deleted Successfully");
  } catch (error) {
    console.log(error);
    console.log("Somthing error in Delete");
  }
});

module.exports = joblistsRouter;
