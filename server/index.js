import express, { response } from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";
import UrlSchema, { incrementShortCode } from "./mongodb/models/models.js";
import connect from "./mongodb/connect.js";
import { url } from "inspector";

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

app.post("/short", async (req, res) => {
  const { originalURL } = req.body;
  const check = await UrlSchema.findOne({ originalURL: originalURL });
  console.log(check)
  if (check == null) {
    const { shortCode } = await incrementShortCode();
    UrlSchema.create({
      originalURL,
      shortCode: shortCode-1,
    })
      .then((response) => {
        console.log(response);
        res.json({
          url: "http://localhost:3001/" + response.shortCode.toString(16),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("error");
      });
  } else {
    res.json({
      url: "http://localhost:3001/" + check.shortCode.toString(16),
    });
  }
});

app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  try {
    const response = await UrlSchema.find({
      shortCode: Number("0x" + shortCode),
    });
    res.redirect(response[0].originalURL);
  } catch (error) {
    res.status(404);
  }
});

const main = async () => {
  await connect(process.env.MONGODB_URL);
  app.listen(process.env.PORT || 3001, () => {
    console.log("App is stated on http://localhost:3001");
  });
};

main();
