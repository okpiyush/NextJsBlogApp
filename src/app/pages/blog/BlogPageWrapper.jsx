"use client";

import React, { Suspense } from 'react';
import BlogPage from './BlogPage';

// This component wraps BlogPage in a Suspense boundary
const BlogPageWrapper = () => {
  return (
    <Suspense fallback={<p>Loading blog data...</p>}>
      <BlogPage />
    </Suspense>
  );
};

export default BlogPageWrapper;
