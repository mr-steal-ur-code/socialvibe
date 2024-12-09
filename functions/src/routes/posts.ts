import * as express from "express";
import { Pool } from "pg";

const postsRouter = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

postsRouter.post("/", async (req, res) => {
  try {
    const { userId, body, reactions = 0, comments = [] } = req.body;

    if (!userId || !body) {
      return res.status(400).json({ error: "userId and body are required." });
    }

    const query = `
      INSERT INTO posts (user_id, body, reactions, comments)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(query, [userId, body, reactions, comments]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create post." });
  }
  return;
});

postsRouter.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts;");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

postsRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      `SELECT * FROM posts WHERE id = $1;`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch post." });
  }
  return;
});


postsRouter.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { body, reactions, comments } = req.body;

    const result = await pool.query(
      `
      UPDATE posts
      SET body = COALESCE($1, body),
          reactions = COALESCE($2, reactions),
          comments = COALESCE($3, comments)
      WHERE id = $4
      RETURNING *;
      `,
      [body, reactions, comments, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update post." });
  }
  return;
});

postsRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *;", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete post." });
  }
  return;
});

export default postsRouter;
