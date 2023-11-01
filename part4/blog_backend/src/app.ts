import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import Blog, { Iblog } from "../models/blog";
import morgan from "morgan";
const app: Application = express();

app.use(cors());
app.use(express.Router());
app.use(express.json());
app.use(morgan("tiny"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
morgan.token("POST", (req: Request, res: Response) => JSON.stringify(req.body));

app.get("/", async (req: Request, res: Response) => {
  await Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

app.post("/", async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    await blog
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((e: Error) => {
        res.status(400).send("Bad Request");
        console.log(`${e} Post Failed`);
      });
  } catch (error) {
    return res.status(400);
  }
});

app.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
      .then(() => res.status(204).end())
      .catch((e: Error) => next(e));
  } catch (e) {
    console.log(e);
  }
});

app.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  req.body
    ? putBlog(req, res, next)
    : res.status(400).json({ error: "Blog not found" });
});

const putBlog = async (req: Request, res: Response, next: NextFunction) => {
  const blog: Partial<Iblog> = {
    likes: req.body.likes,
  };
  await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => res.status(200).json(updatedPerson))
    .catch((e: Error) => next(`Error 65: ${e.message}`))
    .finally(() => {
      console.log(blog);
    });
};

export default app;
