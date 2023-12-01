import React from 'react';

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-white text-8xl ' >Oops, not found</h1>
            <p className='text-white mt-5'>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;
