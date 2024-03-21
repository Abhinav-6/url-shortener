import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get("/ping", (req, res) => {
  res.send("pong")
})

app.get("/", async (req, res) => {
  let urls = await prisma.url.findMany()
  res.send(urls)
})

app.get("/url/:id", async (req, res) => {
  let urlid = req.params.id;
  let data;
  try {
    data = await prisma.url.findFirst({
      where: {
        short_url: urlid
      },
      select: {
        id: true,
        original_url: true
      }
    });
  } catch (error) {
    res.status(404).json({ err: "No link found." })
  }
  if (data) {
    res.status(200).send({
      original_url: data.original_url
    })
  }
})


const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`),
)
