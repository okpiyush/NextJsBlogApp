import React from 'react';

const SignUpForm = () => {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-900">
      <form style= {{zIndex:"1", backgroundColor:"rgba(30, 33, 52, 0.7)"}} className="shadow-xl rounded-lg p-8 max-w-md w-full text-center">
        <p className="text-gray-100 mb-6 text-xl">
            <span className="inline-block rounded-xl p-1 font-bold">            
                Register
            </span>
        </p>
        <input
          type="text"
          className="block w-full p-3 mb-4 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          autoFocus
          required
          placeholder="Username"
        />
        <input
          type="password"
          className="block w-full p-3 mb-4 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
          placeholder="Password"
        />
        <input
          type="submit"
          value="Login"
          className="block w-full p-3 rounded bg-gray-500 hover:bg-gray-400 text-white cursor-pointer transition duration-150"
        />
      </form>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://wallpapers.com/images/hd/aesthetic-tumblr-colorful-sky-fun4f4xidq2adnv4.jpg')"}}></div>
      <div className="absolute inset-0 bg-black opacity-70"></div>
    </div>
  );
};

export default SignUpForm;
