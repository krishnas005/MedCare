'use client'

import Navbar from "@/components/Navbar";
import {useState} from 'react'
import Image from "next/image";
import Img from "@/components/Img";
import SearchBox from "@/components/SearchBox";
import Diet from "@/components/Diet";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar/>
      <Img/>
      <div className="py-14"><SearchBox /></div>
      <Diet/>
    </main>
  );
}
