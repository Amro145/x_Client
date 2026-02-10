import React from "react";
import Sidbar from "./Home/sidebar/Sidebar";
import Rightbar from "./Home/Rightpar/Rightbar";
import MobileNav from "./Home/MobileNav";

const Layout = ({ children }) => {
    return (
        <div className="bg-black min-h-screen">
            <div className="flex justify-center text-white max-w-7xl mx-auto">
                {/* Left Sidebar - Fixed on desktop */}
                <div className="hidden md:block w-fit lg:w-72 sticky top-0 h-screen">
                    <Sidbar />
                </div>

                {/* Main Content */}
                <div className="flex-1 max-w-[600px] border-x border-gray-800 min-h-screen pb-20 md:pb-0">
                    {children}
                </div>

                {/* Right Sidebar - Fixed on large screens */}
                <div className="hidden lg:block w-80 sticky top-0 h-screen py-4 px-4">
                    <Rightbar />
                </div>
            </div>
            <MobileNav />
        </div>
    );
};

export default Layout;
