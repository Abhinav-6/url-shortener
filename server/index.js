import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";

config();

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Namaste World!");
});

const main = () => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("App is stated on http://localhost:3001");
  });
};

main();
