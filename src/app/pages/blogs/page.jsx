"use client";
import BlogCard from '@/app/component/blog/blogCard';
import React, { useEffect } from 'react';

const Blogs = () => {
    const [blogs, setBlogs] = React.useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/blogs/get-blogs");
                const data = await response.json();
                setBlogs(data.blogs);
            } catch (error) {
                alert("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }} className="flex-wrap p-2">
            {blogs.length === 0 ? (
                <div className="text-center text-2xl font-bold text-white">No blogs found</div>
            ) : (
                blogs.map((blog) => (
                    <BlogCard id={blog.id} key={blog.id} title={blog.title} owner={blog.username} commentCount={blog.commentsLen} />
                ))
            )}
        </div>
    );
};

export default Blogs;
