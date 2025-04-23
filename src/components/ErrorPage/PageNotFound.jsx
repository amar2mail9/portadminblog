import React from 'react';

const PageNotFound = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center p-6 rounded-lg bg-gray-800 shadow-lg max-w-md">
                {/* 404 Image */}
                <div className="mb-6">
                    <img
                        loading='lazy'
                        src="https://s3-cdn.cmlabs.co/page/2023/01/24/a-guideline-on-how-to-fix-error-404-not-found-effectively-519451.png"
                        alt="404 error"
                        className="w-full h-full rounded-lg mx-auto mb-4"
                    />
                </div>

                {/* Main message */}
                <h1 className="text-4xl font-bold mb-2">Oops! Page Not Found</h1>
                <p className="text-lg mb-4">The page you're looking for doesn't exist or has been moved.</p>

                {/* Action Button */}
                <div>
                    <a
                        href="/"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-md transition-all duration-300"
                    >
                        Go Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
