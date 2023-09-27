import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./db/db-connection.js";

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
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

// GET ALL USERS
app.get("/api/v1/users", async (req, res) => {
  try {
    const { rows: users } = await db.query(
      "SELECT * FROM users ORDER BY name ASC "
    );
    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

app.get("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows: user } = await db.query("SELECT * FROM users WHERE id=$1", [
      id,
    ]);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// CREATE USER
app.post("/api/v1/users", async (req, res) => {
  try {
    const { name, favorite_city } = req.body;

    const { rows: newUser } = await db.query(
      "INSERT INTO users (name, favorite_city) VALUES ($1, $2) RETURNING *",
      [name, favorite_city]
    );
    res.status(200).json({
      status: "success",
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

app.put("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, favorite_city } = req.body;

    const { rows: updatedUser } = await db.query(
      "UPDATE users SET (name, favorite_city) = ($1, $2) WHERE id = $3 RETURNING *",
      [name, favorite_city, id]
    );
    res.status(200).json({
      status: "success",
      data: { updatedUser },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on Port http://localhost:${PORT}`)
);
