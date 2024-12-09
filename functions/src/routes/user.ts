import * as express from "express";
import { Pool } from "pg";

const usersRouter = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

usersRouter.post("/", async (req, res) => {
  try {
    const { id, email } = req.body;

    if (!id || !email) {
      return res.status(400).json({ error: "Id and email are required." });
    }

    const query = `
      INSERT INTO users (id, email)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const result = await pool.query(query, [id, email]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user." });
  }
  return;
});

usersRouter.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users;");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});

usersRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1;",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user." });
  }
  return;
});

usersRouter.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { firstName, email, lastName, }: User = req.body;

    const result = await pool.query(
      `
  UPDATE users
      SET firstName = COALESCE($1, firstName),
      lastName = COALESCE($2, lastName)
      email = COALESCE($3, email),
      WHERE id = $4
      RETURNING id, firstName, lastName, email, created_at;
  `,
      [firstName, lastName, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user." });
  }
  return;
});

usersRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email;", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user." });
  }
  return;
});

export default usersRouter;
