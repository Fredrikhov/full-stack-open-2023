import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/app";
import { Iblog } from "../../models/blog";
import Blog from "../../models/blog";

mongoose.set("bufferTimeoutMS", 30000);
const api = supertest(app);

// test data
const blogs: Array<Partial<Iblog>> = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    blogs: 0,
    likes: 1,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    blogs: 0,
    likes: 0,
  },
];
const DenyBlog: Array<Partial<Iblog>> = [
  {
    //title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    //url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    blogs: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({}); // Delete everything in DB
  blogs.forEach(async (blog) => {
    // add to DB for testing.
    const blogObject = new Blog(blog);
    await blogObject.save();
  });
}, 100000);

describe("Init blogs stored in the db", () => {
  test("notes are returned as json && statuscode 200", async () => {
    await api
      .get("/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("Verify is identifier property of the blogs posts is named id", async () => {
    const res = await api.get("/");
    res.body.map((blog: Iblog) => expect(blog.id).toBeDefined);
  });
});

describe("Adding blogs to DB", () => {
  test("check post request successfully creates a new blog post ", async () => {
    await api
      .post("/")
      .send(blogs[0])
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const res = await api.get("/");
    expect(res.body).toHaveLength(blogs.length + 1);
  });

  test('Verify that the "likes" property is missing from the request', async () => {
    const res = await api.get("/");
    res.body.map((blog: Iblog) => expect(blog.likes).toBeUndefined);
  });

  test("If title or url prop are missing, respond with status code 400 - Bad request", async () => {
    const obj = new Blog(DenyBlog[0]);
    await api.post("/").send(new Blog(obj)).expect(400);
  });
});
describe("Deleting a blog in DB", () => {
  test("Deleting a blog should return 204 - No content", async () => {
    const id = "65417571d03fc95f831bf20e";
    await api.delete(`/${id}`).expect(204);
  });
});
describe("Updating blog in DB", () => {
  test("updating a blog should return 200", async () => {
    const res = await api.get("/");
    const blogToUpdate: Iblog[] = res.body.map((blog: Iblog) => blog);
    await api.put(`/${blogToUpdate[0].id}`).send({ likes: 20 }).expect(200);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});
