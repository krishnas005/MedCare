"use client"

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);
    const [pageLevelLoader, setPageLevelLoader] = useState(false);
    const [componentLevelLoader, setComponentLevelLoader] = useState({ loading: false, id: "" });
    const [addresses, setAddresses] = useState([]);

    const [addressFormData, setAddressFormData] = useState({
        DOB: "",
        medications: "",
        chronicDiseases: "",
        allergies: "",
        height: "",
        weight: ""
    })

    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        // console.log(Cookies.get('token'))
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            setUser(userData);
        } else {
            setIsAuthUser(false);
            setUser({});
        }
    }, [Cookies])


    return (
        <GlobalContext.Provider value={{
            isAuthUser, setIsAuthUser,user, setUser,
            pageLevelLoader, setPageLevelLoader, componentLevelLoader, setComponentLevelLoader,
            addresses, setAddresses,
            addressFormData, setAddressFormData,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}