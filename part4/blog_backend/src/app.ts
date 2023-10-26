import express, { Application, Request, Response } from "express";
import cors from "cors";
import Blog from "../models/blog";
import morgan from "morgan";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/blogs", (req: Request, res: Response) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

app.post("/api/blogs", (req: Request, res: Response) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((e: Error) => console.log(e.message));
});

export default app;
