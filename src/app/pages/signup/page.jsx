"use client"
import React, { useState } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('Failed to sign up');

      alert('Sign up successful! Redirecting to login...');
      window.location.href = '/pages/login';
    } catch (error) {
      console.error('Sign-up error:', error);
      alert('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSignUp}
        style={{ zIndex: "1", backgroundColor: "rgba(30, 33, 52, 0.7)" }}
        className="shadow-xl rounded-lg p-8 max-w-md w-full text-center"
      >
        <p className="text-gray-100 mb-6 text-xl">
          <span className="inline-block rounded-xl p-1 font-bold">
            Sign Up
          </span>
        </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-3 mb-4 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-3 mb-4 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
          placeholder="Password"
        />
        <input
          type="submit"
          value="Sign Up"
          className="block w-full p-3 rounded bg-gray-500 hover:bg-gray-400 text-white cursor-pointer transition duration-150"
        />
      </form>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://wallpapers.com/images/hd/aesthetic-tumblr-colorful-sky-fun4f4xidq2adnv4.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-70"></div>
    </div>
  );
};

export default SignUpForm;
