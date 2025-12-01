import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md">
                <h1 className="text-9xl font-bold text-red-500 mb-4">500</h1>
                <h2 className="text-3xl font-semibold mb-4">Internal Server Error</h2>
                <p className="text-lg mb-8 text-gray-600">
                    Oops! Something went wrong on our end. We are working to fix it.
                    Please try again later.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out font-medium"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default ServerError;
