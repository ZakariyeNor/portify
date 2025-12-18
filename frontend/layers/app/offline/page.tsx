
export const dynamic = 'force-static';

import React from 'react'
import Badges from '../home/Badges';

export default function Offline() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className='capitalize'>You're Offline</h1>
          <p>Please check your internet connection</p>
        </div>
      </div>
      <Badges />
    </div>

  );
}
