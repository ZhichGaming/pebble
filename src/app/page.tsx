import Image from 'next/image';
import React from 'react';
import Gravel from '@/assets/gravel.png'

export default function LandingPage() {
  return (
      <div className="flex flex-row items-center flex-grow px-4 h-screen">
        <div className="flex flex-col max-w-3/5 items-start pl-14">
          <h1 className="text-6xl text-left font-bold mb-4 w-4/5">
             Let’s pave our road to success one {' '}
            <span className="text-[#595F39]">Pebble</span>
            {' '} at a time
          </h1>
          <p className="text-xl text-left text-gray-600">
            A Pebble alone is useless but many Pebbles makes a road
          </p>
        </div>
        <div className="flex w-2/5 items-center justify-center">
        <Image className="pr-14" src={Gravel} alt="Pebbles" title="Pebbles"></Image>
        </div>
        
      </div>
  );
}
