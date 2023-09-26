import express, { urlencoded } from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import db from "./db/db-connection.js";

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
  res.json("Hello ");
});

app.get("/api/weather", (req, res) => {
  const params = new URLSearchParams({
    q: req.query.city,
    appid: process.env.API_KEY,
    units: "imperial",
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;

  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/api/", async (req, res) => {
//   try {
//     const { rows: events } = await db.query("SELECT * FROM events");
//     console.log("lol", events);
//     res.send(events);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error });
//   }
// });

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
