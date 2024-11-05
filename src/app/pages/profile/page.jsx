"use client";
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', role: '', blogs: [] });

  // Fetch user data and blogs
  const fetchUserData = async () => {
    try {
      // Assume we fetch the user's name, role, and list of blogs here
      const response = await fetch('/api/blogs/get-blogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
        }),
    });
      const data = await response.json();

      setUser({
        name: data.name,
        role: data.role,
        blogs: data.blogs,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
          <p className="text-gray-600">Name: {user.name || 'Loading...'}</p>
          <p className="text-gray-600">Role: {user.role || 'Loading...'}</p>
        </div>
        <a href="/pages/add-blog" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Add Blog
        </a>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Blogs</h3>
        {user.blogs.length > 0 ? (
          <ul className="space-y-4">
            {user.blogs.map((blog) => (
              <li key={blog.id} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <h4 className="text-xl font-bold text-gray-800">{blog.title}</h4>
                <p className="text-gray-600 mt-2">{blog.content}...</p>
                <a
                  href={`/pages/blog?id=${blog.id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  Read more
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No blogs found. Create your first blog!</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
