import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import cors from "cors";
import { body, matchedData, validationResult } from "express-validator";
import * as cfg from "dotenv";

const prisma = new PrismaClient();
const app = express();
cfg.config();

app.use(express.json());
app.use(cors<Request>());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", async (req, res) => {
  try {
    let urls = await prisma.url.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(urls);
  } catch (error) {
    res.status(500).json({"error": "Internal server error"})
  }

});

app.get("/url/:id", async (req, res) => {
  let short_url = req.params.id;
  try {
    let data = await prisma.url.update({
      where: {
        short_url: short_url,
      },
      data: {
        click: {
          increment: 1,
        },
      },
      select: {
        id: true,
        original_url: true,
        short_url: true,
        click: true,
      },
    });
    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(404).json({ error: "No links found." });
  }
  // try {
  //   let data = await prisma.url.findFirst({
  //     where: {
  //       short_url: urlid
  //     },
  //     select: {
  //       id: true,
  //       original_url: true,
  //       click: true
  //     }
  //   });
  //   if (data) {
  //     res.status(200).send({
  //       original_url: data.original_url,
  //       clicks: data.click
  //     })
  //   }
  // } catch (error) {
  //   res.status(404).json({ err: "No link found." })
  // }
});

app.post(
  "/url",
  [
    body("original_url")
      .isURL()
      .withMessage(
        "Invalid URL format. Please enter a valid HTTP or HTTPS link."
      ),
    body("short_url").notEmpty().trim().withMessage("Invalid short url."),
  ],
  async (req: Request, res: Response) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(400).json({ "error": err.array()[0].msg });
      return;
    }
    const d = matchedData(req);
    if (!(/^https:\/\//.test(d.original_url))) {
      // If not, prepend 'https://'
      d.original_url = 'https://' + d.original_url;
    }
    console.log(d);
    try {
      let url = await prisma.url.create({
        data: {
          original_url: d.original_url,
          short_url: d.short_url,
        },
        select: {
          id: true,
          original_url: true,
          short_url: true,
          click: true,
        },
      });
      res.status(201).json({
        message: "Url created succesfully.",
        data: url,
      });
    } catch (error) {
      res.status(500).json({ error: "Error creating url." });
    }
  }
);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}`),
);
