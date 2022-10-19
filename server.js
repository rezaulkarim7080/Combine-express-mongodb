const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

//console.log(app.get("env")); ////check environmet---> set by express
//console.log(process.env); ////check environmet---> set by Node

mongoose
  .connect("mongodb://localhost:27017/my-student-2")
  .then(() => console.log("connectted Mongodb"))
  .catch((err) => console.log("connection failled"));
// {
//   useNewUrlParser: true,
//   useUnifieldTopology: true,
//   useCreateIndex: true,
// }

const port = process.env.port;

app.listen(port, () => {
  console.log(`"Lising on port ...${port}"`);
});
