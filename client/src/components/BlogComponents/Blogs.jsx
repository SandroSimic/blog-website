/* eslint-disable react/prop-types */
import moment from "moment";
import Blog from "./Blog";
import { useBlogContext } from "../../context/BlogContext";
import { useEffect } from "react";
import Spinner from "../Spinner";

const Blogs = ({ sortOrder, searchValue, blogData }) => {
  const { fetchAllBlogs, isLoading } = useBlogContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      await fetchAllBlogs(sortOrder);
    };

    fetchBlogs();
  }, [sortOrder]);

  const filteredBlogs = searchValue
    ? blogData.filter((blog) =>
        blog.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : blogData;

  if (isLoading) {
    return <Spinner />;
  }

  if (filteredBlogs.length === 0) {
    return <p className="emptyBlog">No blogs found</p>;
  }

  return (
    <section className="blogs-section">
      <h3 className="heading3">Articles</h3>
      <hr className="line" />
      {filteredBlogs.map((blog) => (
        <Blog
          key={blog._id}
          id={blog._id}
          title={blog.title}
          blogImage={blog.image}
          dateOfCreation={moment(blog.createdAt).format("MMMM Do YYYY")}
          content={blog.content}
          creator={blog.creator}
          creatorImg={blog.creatorImg}
        />
      ))}
    </section>
  );
};

export default Blogs;
