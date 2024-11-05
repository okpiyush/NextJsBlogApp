"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import EditModal from '@/app/component/EditModal';
import EditCommentModal from '@/app/component/EditCommentModal';
const BlogPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [blogData, setBlogData] = useState(null);
  const [currComment, setCurrComment] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentData, setCommentData] = useState(null);

  const determinePermissions = (blog) => {
    const userId = localStorage.getItem('id');
    const userRole = localStorage.getItem('role');
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
      console.error(e);
    }
  };

  const handleSave = () => {
    fetchBlog();
  };

  const handleCommentChange = (e) => {
    setCurrComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (!id || !currComment) return;
    try {
      const response = await fetch(`/api/comment/add-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: currComment,
          commentOf: id,
          token: localStorage.getItem('token'),
        }),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      setCurrComment('');
      fetchBlog();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      console.log(commentId)
      const response = await fetch(`/api/comment/delete-comment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: commentId,
          token: localStorage.getItem('token'),
        }),
      });
      if (!response.ok) throw new Error('Failed to delete comment');
      fetchBlog();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditComment = (comment) => {
    setCommentData(comment);
    setIsCommentModalOpen(true);
  };

  const commentActionable = (commentUserId) => {
    const userId = localStorage.getItem('id');
    const userRole = localStorage.getItem('role');
    return {
      isEditable: userId === commentUserId,
      isDeletable: userId === commentUserId || userRole === 'admin',
    };
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blogData) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto m-10 bg-white rounded-lg shadow-md p-10">
      <div className="flex justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-800">
          {blogData.title}
        </h1>
        <div className="flex space-x-4">
          {isEditable && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
            >
              <span className="text-sm font-semibold mr-2">Edit</span>
            </button>
          )}
          {isDeletable && (
            <button
              onClick={deleteBlog}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
            >
              <span className="text-sm font-semibold mr-2">Delete</span>
            </button>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-4">Written by: {blogData.username}</p>
      <div className="text-gray-700 mb-8">{blogData.content}</div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Comments ({blogData.comments?.length || 0})
      </h2>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="w-full p-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Add a comment"
            value={currComment}
            onChange={handleCommentChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>

        {blogData.comments?.map((comment) => (
          <div key={comment.id} className="p-2 flex flex-col bg-gray-100 shadow-md rounded-md">
            <p className="flex justify-between font-semibold">
              {comment.user}
              <div className="flex space-x-4">
                {commentActionable(comment.belongsTo).isEditable && (
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="flex items-center bg-blue-500 hover:bg-blue-600 font-normal text-white rounded-full p-1"
                  >
                    Edit
                  </button>
                )}
                {commentActionable(comment.belongsTo).isDeletable && (
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white font-normal rounded-full p-1"
                  >
                    Delete
                  </button>
                )}
              </div>
            </p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blogData={blogData}
        onSave={handleSave}
      />
      <EditCommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        commentData={commentData}
        onSave={handleSave}
      />
    </div>
  );
};

export default BlogPage;
