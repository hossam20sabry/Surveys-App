import React from 'react';

function NotFound() {
    return (
        <div className='flex items-center justify-center flex-col h-screen'>
            <h1 className='text-3xl text-gray-900'>404 | Page not Found</h1>
            <a href="/" className="mt-4 font-semibold  hover:text-gray-900 focus:outline-red-500 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">Home</a>
        </div>
    );
}

export default NotFound;
