const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();

const user = require("./model/user");

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));

const url =
  "mongodb+srv://testing:test@atlascluster.ij20tlj.mongodb.net/caper?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log("err");
  });

//insert

app.post("/post", async (req, res) => {
  const data = new user({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  });
  try {
    await data.save();
    return res.json(await user.find());
  } catch {
    console.log("err");
  }
});

app.get("/", (req, res) => {
  res.send("crud application");
});

//fetch all data

app.get("/data", async (req, res) => {
  try {
    const all = await user.find();
    return res.json(all);
  } catch (err) {
    console.log(err.message);
  }
});

//fetch by id

app.get("/data/:id", async (req, res) => {
  try {
    const dd = await user.findById(req.params.id);
    res.json(dd);
    console.log(dd);
  } catch (err) {
    console.log(err.message);
  }
});
//delete

app.delete("/data/:id", async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    return res.json(await user.find());
  } catch (err) {
    console.log(err.message);
  }
});

//update the data

app.put("/data/:id", async (req, res) => {
  try {
    let dd = await data.findByIdAndUpdate(req.params.id, { ...req.body });
    return res.json(dd);
  } catch (err) {
    console.log(err);
  }
});

app.listen(4444, () => {
  console.log("done");
});
