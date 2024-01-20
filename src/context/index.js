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
    const [allergie,setAllergie] = useState("")
    const [ages,setAge] = useState("")
    const [weights,setWeight] = useState("")
    const [heights,setHeight] = useState("")
    const [chronic,setChronic] = useState("")

    const protectedRoutes = [
        'account'
    ]

    const [addressFormData, setAddressFormData] = useState({
        age: "",
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

    useEffect(() => {
        if (
            path !== "/register" &&
            path !== "/" &&
            user &&
            Object.keys(user).length === 0 &&
            protectedRoutes.includes(path) > -1
        )
            router.push("/login");
    }, [user, path])

    return (
        <GlobalContext.Provider value={{
            isAuthUser, setIsAuthUser,user, setUser,
            pageLevelLoader, setPageLevelLoader, componentLevelLoader, setComponentLevelLoader,
            addresses, setAddresses, ages,setAge, weights,setWeight,
            addressFormData, setAddressFormData, allergie,setAllergie,heights,setHeight, chronic,setChronic
        }}>
            {children}
        </GlobalContext.Provider>
    )
}