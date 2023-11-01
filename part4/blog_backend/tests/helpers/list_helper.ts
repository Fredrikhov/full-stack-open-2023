import { Iblog } from "../../models/blog";

const totalLikes = (blogs: Array<Iblog>) => blogs[0].likes;

const dummy = (blogs: Array<Iblog>) => blogs;

const favoriteBlog = (blogs: Array<Iblog>) => {
  const item = blogs.reduce((max, obj) => (max.likes > obj.likes ? max : obj));
  return { title: item.title, author: item.author, likes: item.likes };
};

const mostBlogs = (blogs: Array<Iblog>) => {
  const item = blogs.reduce((max, obj) => (max.blogs > obj.blogs ? max : obj));
  return { author: item.author, blogs: item.blogs };
};

const mostLikes = (blogs: Array<Iblog>) => {
  const item = blogs.reduce((max, obj) => (max.likes > obj.likes ? max : obj));
  return { author: item.author, likes: item.likes };
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
