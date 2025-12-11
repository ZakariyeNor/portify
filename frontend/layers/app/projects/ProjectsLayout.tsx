'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { LuListFilter } from 'react-icons/lu'
import { MdOutlineSearch, MdOutlineUnfoldLess } from 'react-icons/md'


const ProjectsLayout = () => {

    const [open, setOpen] = useState(false);
    
    return (
        <div className="flex flex-col sm:p-25 lg:p-25 min-h-screen">
            {/* Intro*/}
            <div className="flex flex-col space-y-2 ">
                <h1 className="font-extrabold text-3xl">
                    My Work
                </h1>
                <p className="text-gray-400">
                    A collection of my projects in web Design, Mobile Apps, and interactive, responsive,
                    high-performance user experiences across multiple platforms.
                </p>
            </div>

            {/* Search and filter */}
            <div className="flex flex-row space-x-9 mt-10 mb-10">
                <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
                    {/* Search input */}
                    <div className="w-full sm:w-2/3 md:w-2/3 lg:w-2/3 bg-white relative mb-3 sm:mb-0">
                        <MdOutlineSearch className='absolute top-1/2 right-3 -translate-y-1/2 text-2xl text-gray-400 cursor-pointer' />
                        <input
                            type="search"
                            className='border border-gray-300 w-full p-2 pr-10 rounded-lg placeholder-gray-400'
                            placeholder='Search projects...'
                        />
                    </div>

                    {/* Category input */}
                    <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 relative">
                        <LuListFilter className='absolute top-1/2 left-3 -translate-y-1/2 text-2xl text-gray-400' />
                        <MdOutlineUnfoldLess
                            onClick={() => setOpen(prev => !prev)}
                            className='absolute top-1/2 right-3 -translate-y-1/2 text-2xl
                                        text-gray-400 cursor-pointer hover:text-black'
                        />
                        <input
                            type="text"
                            className='border border-gray-300 w-full pl-10 pr-10 p-2 rounded-lg placeholder-black cursor-pointer hover:bg-gray-200'
                            placeholder='All Categories'
                            onClick={() => setOpen(prev => !prev)}
                        />

                        {/* Dropdown list */}
                        {open && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-50">
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(false)}>
                                    Static Websites

                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(false)}>
                                    Interactive Frontend

                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(false)}>
                                    CLI Apps

                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(false)}>
                                    Full-Stack Web App

                                </div>
                                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpen(false)}>
                                    E-Commerce Web App

                                </div>

                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Project cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ls-3 gap-5">
                <div className="card bg-base-100 w-full shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className='w-full' />
                    </figure>
                    <Link
                        href='/'
                    >
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>
                                A card component has a figure, a body part, and inside
                                body there are title and actions parts
                            </p>
                            <div className="pt-5 pb-5 flex flex-row space-x-1">
                                {/* Main tech used */}
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Figma
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Django / DRF
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    NextJS
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card bg-base-100 w-full shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className='w-full' />
                    </figure>
                    <Link
                        href='/'
                    >
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>
                                A card component has a figure, a body part, and inside
                                body there are title and actions parts
                            </p>
                            <div className="pt-5 pb-5 flex flex-row space-x-1">
                                {/* Main tech used */}
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Figma
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Django / DRF
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    NextJS
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card bg-base-100 w-full shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className='w-full' />
                    </figure>
                    <Link
                        href='/'
                    >
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>
                                A card component has a figure, a body part, and inside
                                body there are title and actions parts
                            </p>
                            <div className="pt-5 pb-5 flex flex-row space-x-1">
                                {/* Main tech used */}
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Figma
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Django / DRF
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    NextJS
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card bg-base-100 w-full shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className='w-full' />
                    </figure>
                    <Link
                        href='/'
                    >
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>
                                A card component has a figure, a body part, and inside
                                body there are title and actions parts
                            </p>
                            <div className="pt-5 pb-5 flex flex-row space-x-1">
                                {/* Main tech used */}
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Figma
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Django / DRF
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    NextJS
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card bg-base-100 w-full shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className='w-full' />
                    </figure>
                    <Link
                        href='/'
                    >
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>
                                A card component has a figure, a body part, and inside
                                body there are title and actions parts
                            </p>
                            <div className="pt-5 pb-5 flex flex-row space-x-1">
                                {/* Main tech used */}
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Figma
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Django / DRF
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    NextJS
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="card bg-base-100 w-full shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes"
                            className='w-full' />
                    </figure>
                    <Link
                        href='/'
                    >
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>
                                A card component has a figure, a body part, and inside
                                body there are title and actions parts
                            </p>
                            <div className="pt-5 pb-5 flex flex-row space-x-1">
                                {/* Main tech used */}
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Figma
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    Django / DRF
                                </div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-2 w-fit rounded-xl">
                                    NextJS
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProjectsLayout