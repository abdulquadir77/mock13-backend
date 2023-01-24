const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//DB Connection
const connection = require("./Config/db");
const UserModel = require("./Models/UserModel");

//Routes

const joblistsRouter = require("./Routes/joblists.route");

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const email_exists = await UserModel.findOne({ email });
  if (email_exists?.email) {
    res.send("EMAIL ALREADY EXIST");
  } else {
    try {
      bcrypt.hash(password, 13, async (err, hashpass) => {
        const registeruser = new UserModel({
          name,
          email,
          password: hashpass,
        });
        await registeruser.save();
        res.send("SIGNUP SUCCESSFULLY");
      });
    } catch (error) {
      console.log(error);
      console.log("SOMTHING ERROR IN SIGNUP FUNCTION");
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const regiterUser = await UserModel.find({ email });
    if (regiterUser.length === 0) {
      res.send("User doesn't exist");
    }
    if (regiterUser.length > 0) {
      const hashed_password = regiterUser[0].password;
      bcrypt.compare(password, hashed_password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: regiterUser[0]._id }, "mock13");
          res.send({
            msg: "LOGIN SUCCESSFUL",
            token: token,
          });
        } else {
          res.send("INVALID CREDENTIALS");
        }
      });
    }
  } catch (error) {
    console.log("SOMTHING ERROR IN LOGIN");
    console.log(error);
  }
});

app.use("/", joblistsRouter);

app.listen("3020", async () => {
  try {
    await connection;
    console.log("DB CONNECTED");
  } catch (error) {
    console.log("SOMTHING ERROR IN DB CONNECTION");
    console.log(error);
  }
  console.log("Listening on port 3020");
});
