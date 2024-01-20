
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-8 lg:p-12">
            <div className="container ">
                <div className="flex justify-between">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-semibold mb-2">Team Members</h2>
                        <p className="text-sm">Krishna Sharma</p>
                        <p className="text-sm">Pawandeep Singh</p>
                        <p className="text-sm">Prashant Mandal</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
                        <div className="flex items-center space-x-2">
                            <span className="text-xl">&#169; 2024 </span>
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
