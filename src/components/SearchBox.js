"use client";

import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { data } from "@/assets/medicine_data.js";
// import styles from './SearchComponent.module.css'; // Import your CSS module

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [show, setShow] = useState(false);

    const handleSearch = () => {
        setShow(true);
    };

    const handleCloseModal = () => {
        setShow(false);
    };

    return (
        <div className="border-2 border-blue-800 rounded-xl lg:p-[68px] p-[40px] mt-6">
            <div className="text-center mb-4 py-6">
                <p className=" text-4xl mb-4">
                    <strong>Search for ingredients or possible allergies:</strong>
                </p>
                <p className="text-gray-700 mb-8">
                    Make informed decisions while buying that can make huge impact on health!
                </p>
                <div className="flex items-center justify-center h-20 rounded-lg border-black overflow-hidden ">
                    <input
                        type="text"
                        placeholder="Search for products"
                        className="w-1/2 px-3 py-2 rounded-l-full focus:border-blue-500 border-black transition-all duration-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded-r-full transition-all duration-300 hover:bg-blue-600 focus:outline-none"
                        onClick={handleSearch}
                    >
                        <IoMdSearch />
                    </button>
                </div>
            </div>

            {show && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg relative">
                        <button className="absolute top-2 right-3 text-gray-600 cursor-pointer text-3xl" onClick={handleCloseModal}>&times;</button>
                        <h2 className="text-2xl text-center font-bold mb-4">Search Results</h2>
                        <table className="w-full max-w-2xl table-auto border-collapse border border-blue-800">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border border-blue-800">Product Name</th>
                                    <th className="py-2 px-4 border border-blue-800">Price</th>
                                    <th className="py-2 px-4 border border-blue-800">Salt</th>
                                    <th className="py-2 px-4 border border-blue-800">Side Effects</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.filter((item) => searchQuery.toLowerCase() === '' ? item : item.product_name.toLowerCase().includes(searchQuery)).map((item) => (
                                    <tr key={item.id} className="">
                                        <td className="py-2 px-4 border-1 border-blue-800">{item.product_name}</td>
                                        <td className="py-2 px-4 border-1 border-blue-800">{item.product_price}</td>
                                        <td className="py-2 px-4 border-1 border-blue-800">{item.salt_composition}</td>
                                        <td className="py-2 px-4 border-1 border-blue-800">{item.side_effects}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SearchComponent;
