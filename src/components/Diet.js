"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import img from '@/assets/img1.png';

const Diet = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <main className="flex flex-col md:flex-row gap-14 mt-16 mb-16">
                <div className="lg:w-1/2 lg:pl-16 pl-2">
                    <Image src={img} alt="img" width={720} height={350} />
                </div>
                <div className="lg:w-1/2 lg:p-[60px] lg:ml-8 ml-0 p-4 mt-0 lg:mt-[60px]">
                    <div className="text-3xl lg:text-5xl  leading-normal mb-4 mt-14">
                        <strong>Get personalised diet plan and exercises!</strong>
                    </div>
                    <div className="text-lg lg:text-lg text-white">
                        <button className="disabled:bg-gray-400 bg-green-600 rounded-lg px-8 py-2" onClick={openModal}>
                            Get now
                        </button>
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg">
                                <div className="text-2xl mb-4 flex">
                                    <div className="flex-grow pr-4 border-r-2 border-gray-500">
                                        <div className="mb-2 font-bold">Do&apos;s:</div>
                                        <ol className="list-decimal ml-4">
                                            <li>Eat less salt</li>
                                            <li>Include more fruits and vegetables</li>
                                            <li>Include whole grain cereals</li>
                                            <li>Maintain a healthy weight.</li>
                                            <li>Include lean meat, fish, and poultry.</li>
                                            <li>Include low-fat dairy products.</li>
                                        </ol>
                                    </div>

                                    <div className="flex-grow pl-4">
                                        <div className="mb-2 font-bold">Don&apos;ts:</div>
                                        <ol className="list-decimal ml-4">
                                            <li>Alcohol</li>
                                            <li>Smoking</li>
                                            <li>Sedentary lifestyle</li>
                                            <li>Sleep deprived</li>
                                        </ol>
                                    </div>
                                </div>

                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Diet;
