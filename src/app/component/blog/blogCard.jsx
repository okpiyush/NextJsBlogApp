import React from 'react';

const BlogCard = ({ id,title, owner, commentCount }) => {
  return (
    <a href={`/pages/blog?id=${id}`} className="w-80 h-40 border rounded-lg shadow-md p-4 bg-white m-2 flex flex-col justify-between">

      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      
      <p className="text-gray-600">By: {owner}</p>
      
      <div className="flex items-center text-gray-500">
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 16.5A2.5 2.5 0 0018.5 14H5.5A2.5 2.5 0 003 16.5V18h18v-1.5z" />
        </svg>
        <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
      </div>
    </a>
  );
};

export default BlogCard;
