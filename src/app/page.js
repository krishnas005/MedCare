'use client'

import Navbar from "@/components/Navbar";
import Img from "@/components/Img";
import SearchBox from "@/components/SearchBox";
import Diet from "@/components/Diet";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col p-24 ">
        <Img />
        <div className="py-14"><SearchBox /></div>
        <Diet />
      </main>
      <Footer />
    </>
  );
}
