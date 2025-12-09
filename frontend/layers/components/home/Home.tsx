'use client'
import React from 'react'
import Button from '../ui/Button'
import { FaGithub, FaPython } from 'react-icons/fa'
import { RiTwitterFill } from 'react-icons/ri'
import { MdApps } from 'react-icons/md'
import Image from 'next/image'


const HomePage = () => {
    
  return (
    <div className="flex flex-col">
        <div className="flex flex-col-reverse lg:flex lg:flex-row m-20 p-10 justify-between items-center h-full">
            {/* Right side the content */}
            <div className="flex flex-col spece-y-3 w-full lg:w-[50%]">
            <h1 className="font-extrabold text-4xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl">
                    Zakariye F. Nor
                </h1>

                <p className="text-blue-500 font-bold text-lg sm:text-xs md:text-base lg:text-xl xl:text-2xl pt-3">
                    A Full-Stack Developer with DevOps Skills
                </p>

                <p className="text-gray-600 font-normal pt-4">
                    A passionate full-stack developer specializing in building scalable e-commerce platforms with Django and 
                    powerful frontend applications using React (Next.js) and Django REST Framework. 
                    I create intuitive, high-performance digital experiences, integrating APIs, real-time features, 
                    and seamless payment solutions, and handle deployment and DevOps to ensure projects run smoothly 
                    from design to production.
                </p>
                <div className="pt-7 flex flex-row space-x-4">
                    <Button
                        label='View My Work'
                        type='button'
                        variant='primary'
                        className='action'
                        onClick={() => console.log('clicked the home primary button')}
                    />
                    <Button
                        label='Contact Me'
                        type='button'
                        variant='secondary'
                        className=''
                        onClick={() => console.log('clicked the home primary button')}
                    />
                </div>

                {/* Icobns */}
                <div className="flex flex-col">
                <div className="flex flex-row pt-5 space-x-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <FaGithub className='h-6 w-9' />
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <RiTwitterFill className='h-6 w-9' />
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <MdApps className='h-6 w-9' />
                    </div>
                </div>
                <div className="flex flex-row pt-1 space-x-4">
                <p className="text-gray-800">Github</p>
                <p className="text-gray-800">Twitter</p>
                <p className="text-gray-800">Projects</p>
                </div>
                </div>
            </div>

            {/* Left side the image*/}
            <div className="flex justify-center items-center w-full lg:w-[50%] h-full mb-5">
                <div className="shadow-lg bg-gray-700 w-[80%] h-full rounded-full">
                    <Image
                        src='/test.png'
                        alt='Profile phote test'
                        width={600}
                        height={600}
                        className='w-full rounded-lg lg:rounded-full'
                    />
                </div>
            </div>
        </div>
        {/* Buttom infinite badge scroll */}
          <div className="flex flex-row space-x-1 marquee">
              <div className='badges'>
                  <div className='icons h-13 flex justify-center items-center px-3 rounded-xl bg-gray-200'>
                      <FaPython className='mr-2 text-blue-600 text-2xl' />
                      Python
                  </div>
              </div>
          </div>


    </div>
  )
}

export default HomePage

