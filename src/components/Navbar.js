"use client";

import React, { useState,useContext } from 'react';
import Link from 'next/link';
import { useRouter,usePathname } from 'next/navigation';
import { CgProfile } from "react-icons/cg";
import {GlobalContext} from "@/context";
import Cookies from "js-cookie";



const Navbar = () => {
    const path = usePathname();
    const router = useRouter();
    const { user, isAuthUser, setIsAuthUser, setUser } = useContext(GlobalContext);
    function handleLogout() {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove('token');
        localStorage.clear();
        router.push('/');
    }
    return (
        <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center cursor-pointer">
                    <span className="self-center text-2xl font-bold whitespace-nowrap">
                        <Link href="/">MedCare</Link>
                    </span>
                </div>
                <div className="flex md:order-2 lg:gap-5 gap-3 text-[12px] md:px-5 md:py-3 md:text-[16px]">
                    {
                        isAuthUser ? <div className="ml-2 mt-1"><button onClick={()=> router.push('/account')}><CgProfile size={32}/></button> </div> : ""
                    }
                    {
                        isAuthUser ? <button
                        onClick={handleLogout}
                            className=" inline-block bg-black px-3 py-1  text-[10px] md:px-5 md:py-3 lg:text-xs font-medium uppercase tracking-wide text-white "
                            
                            // setLogged(true)

                            >
                            Logout
                        </button>
                            :
                            <button
                                className= {`inline-block bg-black px-3  text-[10px] md:px-5 md:py-3 lg:text-xs font-medium uppercase tracking-wide text-white ${path === "/login" ? "hidden" : ""}`}

                                onClick={() => router.push('/login')}>
                                Login
                            </button>
                    }
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar