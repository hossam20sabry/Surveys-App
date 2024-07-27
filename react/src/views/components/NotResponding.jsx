import React from 'react';

function NotResponding() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <h1 className='text-3xl text-gray-900'>Not Responding</h1>
            <h3 className='text-2xl text-gray-500 mt-4'>Please try again later</h3>
            <a href="/" className="mt-4 font-semibold  hover:text-gray-900 focus:outline-red-500 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">Home</a>
        </div>
    );
}

export default NotResponding;
