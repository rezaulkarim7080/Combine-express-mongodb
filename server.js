const app = require("./app");
const mongoose = require("mongoose");

console.log(app.get("env")); ////check environmet

mongoose
  .connect("mongodb://localhost:27017/my-student-2")
  .then(() => console.log("connectted Mongodb"))
  .catch((err) => console.log("connection failled"));
// {
//   useNewUrlParser: true,
//   useUnifieldTopology: true,
//   useCreateIndex: true,
// }

const port = 3000;

app.listen(port, () => {
  console.log("Lising on port ${port}...");
});
