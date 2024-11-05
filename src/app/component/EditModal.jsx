import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, blogData, onSave }) => {
  const [title, setTitle] = useState(blogData?.title || '');
  const [content, setContent] = useState(blogData?.content || '');
  useEffect(() => {
    setTitle(blogData?.title || '');
    setContent(blogData?.content || '');
  }, [blogData]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/blogs/update-blog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: blogData.id,
          title,
          content,
          token: localStorage.getItem('token'),
        }),
      });

      if (!response.ok) throw new Error('Failed to edit blog');

      onSave(); 
      onClose();
    } catch (error) {
      console.error('Error editing blog:', error);
      alert('There was an error updating the blog. Please try again.');
    }
  };

  if (!isOpen) return null; // Return null if modal is not open

  return (
    <div style = {{zIndex:"1"}} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className="border rounded w-full py-2 px-3 text-gray-700"
              rows="6"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
