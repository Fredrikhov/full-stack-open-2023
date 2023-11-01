import { Iblog } from "../../models/blog";
import list_helper from "../helpers/list_helper";

describe("total likes", () => {
  const blogs: Array<Iblog> = [
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      blogs: 0,
      v: 0,
    },
  ];

  test("When list has only blog, equals the likes of that", () => {
    const res = list_helper.totalLikes(blogs);
    expect(res).toBe(5);
  });
});

describe("most likes", () => {
  const blogsLikes: Array<Iblog> = [
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      blogs: 0,
      v: 0,
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
      blogs: 0,
      v: 0,
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 1,
      blogs: 0,
      v: 0,
    },
  ];

  test("Find blog with most likes", () => {
    const res = list_helper.favoriteBlog(blogsLikes);
    expect(res).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });
});

describe("Find author who has the largest amount of blogs", () => {
  const blogsLikes: Array<Iblog> = [
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      blogs: 4,
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      v: 0,
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      blogs: 2,
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
      v: 0,
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      blogs: 2,
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 1,
      v: 0,
    },
  ];

  test("Find author with most blogs", () => {
    const res = list_helper.mostBlogs(blogsLikes);
    expect(res).toEqual({ author: "Edsger W. Dijkstra", blogs: 4 });
  });
});

describe("Most likes", () => {
  const blogsLikes: Array<Iblog> = [
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      blogs: 4,
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      v: 0,
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      blogs: 2,
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
      v: 0,
    },
    {
      id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      blogs: 2,
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 1,
      v: 0,
    },
  ];

  test("Find author whose blog posts have the largest amount of likes", () => {
    const res = list_helper.mostLikes(blogsLikes);
    expect(res).toEqual({ author: "Edsger W. Dijkstra", likes: 5 });
  });
});
