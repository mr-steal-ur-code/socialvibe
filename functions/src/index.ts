import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";
import * as cors from "cors";
import usersRouter from "./routes/user";
import postsRouter from "./routes/posts";

const app = express();

const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

app.use("/user", usersRouter);
app.use("/posts", postsRouter);

const api = onRequest({ memory: "256MiB" }, app);

export { api }