"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EditModal from '@/app/component/EditModal';

const BlogPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [blogData, setBlogData] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const determinePermissions = (blog) => {
    const userId = localStorage.getItem('id');
    const userRole = localStorage.getItem('role');
    console.log(blog.belongsTo, userId, userRole);
    setIsEditable(userId === blog.belongsTo);
    setIsDeletable(userId === blog.belongsTo || userRole === 'admin');
  };

  const fetchBlog = async () => {
    if (!id) return;
    try {
      const response = await fetch(`/api/blogs/get-blog?id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog');

      const data = await response.json();
      determinePermissions(data.data);
      setBlogData(data.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      alert("Error fetching blog. Please try again later.");
    }
  };

  const deleteBlog = async () => {
    if (!id) return;
    try {
      const response = await fetch(`/api/blogs/delete-blog`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          token: localStorage.getItem('token'),
        }),
      });

      if (!response.ok) throw new Error('Failed to delete blog');
      alert('Blog deleted successfully.');
      window.location.href = '/pages/blogs';
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = () => {
    fetchBlog();
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blogData) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto m-10 bg-white rounded-lg shadow-md p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{blogData.title}</h1>
      <p className="text-gray-600 mb-4">Written by: {blogData.username}</p>

      <div className="text-gray-700 mb-8">
        <p>{blogData.content}</p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Comments ({blogData.comments?.length || 0})
      </h2>
      <div className="space-y-4">
        {blogData.comments?.map((comment) => (
          <div key={comment.id} className="p-2 bg-gray-100 shadow-md rounded-md">
            <p className="font-semibold">{comment.user}</p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center space-x-4">
        {isEditable && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
          >
            <h2 className="text-lg font-semibold mr-2">Edit</h2>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h4v4m-4-4L4 16l-4 4 4-4 12-12z" />
            </svg>
          </button>
        )}

        {isDeletable && (
          <button onClick={deleteBlog} className="flex items-center bg-red-500 hover:bg-red-600 text-white rounded-full p-2">
            <h2 className="text-lg font-semibold mr-2">Delete</h2>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 4H8l-1 1H2v2h2l1 13h14l1-13h2V5h-3l-1-1z" />
            </svg>
          </button>
        )}
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blogData={blogData}
        onSave={handleSave}
      />
    </div>
  );
};

export default BlogPage;
