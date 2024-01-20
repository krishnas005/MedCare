import React from 'react';
import Image from 'next/image';
import img from '@/assets/img2.jpg';

const Img = () => {
  return (
    <main className="flex flex-col md:flex-row gap-14 mt-16 mb-16 ">
      <div className="lg:w-1/2 lg:pl-16 pl-2">
        <Image src={img} alt="img" width={720} height={350} />
      </div>
      <div className="lg:w-1/2 lg:p-[60px] lg:ml-8 ml-0 p-4 mt-0 lg:mt-[60px] ">
        <div className=" ">
        <div className="text-3xl lg:text-5xl  leading-normal mb-4 "><strong><span className="text-blue-700">Personalized healthcare</span><br />designed <span className="text-blue-700">for you!</span></strong></div>
        <div className="text-lg lg:text-lg text-gray-600 tracking-normal"><span>Shifting away from a one-size-fits</span><br /><span>all approach to the best care for</span><br /><span >each person.</span></div>
        </div>
      </div>
    </main>
  );
}

export default Img;
