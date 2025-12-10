'use client'
import React from 'react'
import Image from 'next/image'
import Button from '@/app/components/ui/Button'
import { RxExternalLink } from 'react-icons/rx'
import Link from 'next/link'
import { IoCodeOutline } from "react-icons/io5";
import { IoIosCode } from 'react-icons/io'

const ProjectDetails = () => {
    return (
        <>
            <div className="flex flex-col m-4 sm:m-6 md:m-8 lg:m-10 p-4 sm:p-6 md:p-8 lg:p-10">
                {/* Breadcrumbs */}
                <div className="breadcrumbs text-sm mb-4">
                    <ul className="flex space-x-2">
                        <li><Link href='/'>Home</Link></li>
                        <li><Link href='/projects'>Projects</Link></li>
                        <li className="font-semibold">Project Detail</li>
                    </ul>
                </div>

                {/* Intro */}
                <div className="flex flex-col space-y-2 mb-6">
                    <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                        Project Title
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                        Project intro
                    </p>
                </div>

                {/* Image */}
                <div className="w-full lg:w-4/5 mx-auto mb-6 rounded-lg overflow-hidden">
                    <Image
                        src='/project_detail.png'
                        alt='Project detail image'
                        width={800}
                        height={450}
                        className='w-full h-auto object-cover rounded-lg'
                    />
                </div>

                {/* Project Content */}
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    {/* Left content */}
                    <div className="lg:w-2/3 flex flex-col space-y-6 mb-6 lg:mb-0">
                        <div>
                            <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-2">Project Overview</h2>
                            <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                Streamify's checkout process was redesigned from the ground up to address high cart abandonment rates. The primary goal was to create a frictionless experience for users, minimizing steps and distractions. We focused on a single-page architecture, Intelligent form validation, and multiple payment options to build trust and encourage completion.
                                Through extensive user research and A/B testing, we identified key pain points in the original flow. The new design incorporates a progress indicator, guest checkout options, and a clear summary of the order, resulting in a 25% increase in conversion rates and a significant improvement in customer satisfaction scores.
                            </p>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-2">My Role & Responsibilities</h2>
                            <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                As the lead UI/UX designer, I was responsible for the end-to-end design process. This included initial user research, wireframing, creating high-fidelity mockups in Figma, and developing an interactive prototype. I collaborated closely with product managers to define requirements and with developers to ensure a pixel-perfect implementation that was both functional and aesthetically pleasing.
                            </p>
                        </div>
                    </div>

                    {/* Right content */}
                    <div className="lg:w-1/3 flex flex-col space-y-6">
                        {/* Tech Stack */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 w-full">
                            <h3 className="font-semibold text-base sm:text-lg mb-3">Tech Stack</h3>

                            {/* Scrollable container */}
                            <div className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                {/* Example badges */}
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Figma</div>
                                <div className="bg-green-400/30 text-green-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Django</div>
                                <div className="bg-purple-400/30 text-purple-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">NextJS</div>
                                <div className="bg-yellow-400/30 text-yellow-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">DRF</div>
                                <div className="bg-pink-400/30 text-pink-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Stripe</div>
                                <div className="bg-indigo-400/30 text-indigo-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Tailwind</div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Figma</div>
                                <div className="bg-green-400/30 text-green-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Django</div>
                                <div className="bg-purple-400/30 text-purple-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">NextJS</div>
                                <div className="bg-yellow-400/30 text-yellow-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">DRF</div>
                                <div className="bg-pink-400/30 text-pink-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Stripe</div>
                                <div className="bg-indigo-400/30 text-indigo-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Tailwind</div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Figma</div>
                                <div className="bg-green-400/30 text-green-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Django</div>
                                <div className="bg-purple-400/30 text-purple-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">NextJS</div>
                                <div className="bg-yellow-400/30 text-yellow-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">DRF</div>
                                <div className="bg-pink-400/30 text-pink-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Stripe</div>
                                <div className="bg-indigo-400/30 text-indigo-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Tailwind</div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Figma</div>
                                <div className="bg-green-400/30 text-green-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Django</div>
                                <div className="bg-purple-400/30 text-purple-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">NextJS</div>
                                <div className="bg-yellow-400/30 text-yellow-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">DRF</div>
                                <div className="bg-pink-400/30 text-pink-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Stripe</div>
                                <div className="bg-indigo-400/30 text-indigo-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Tailwind</div>
                                <div className="bg-blue-400/30 text-blue-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Figma</div>
                                <div className="bg-green-400/30 text-green-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Django</div>
                                <div className="bg-purple-400/30 text-purple-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">NextJS</div>
                                <div className="bg-yellow-400/30 text-yellow-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">DRF</div>
                                <div className="bg-pink-400/30 text-pink-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Stripe</div>
                                <div className="bg-indigo-400/30 text-indigo-700 font-bold p-1 w-fit rounded-xl whitespace-nowrap">Tailwind</div>
                                {/* Add all other badges here */}
                            </div>
                        </div>

                        {/* Project Links */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 w-full flex flex-col space-y-3">
                            <h3 className="font-semibold text-base sm:text-lg">Project Links</h3>

                            {/* Live Project */}
                            <Link href='/'>
                                <div className="relative w-full">
                                    {/* Icon first */}
                                    <RxExternalLink className='absolute top-1/2 left-4 -translate-y-1/2 text-lg text-white' />
                                    <Button
                                        type='button'
                                        variant='primary'
                                        label='View Live Project'
                                        className='w-full action'
                                    />
                                </div>
                            </Link>

                            {/* Github Docs */}
                            <Link href='/'>
                                <div className="relative w-full">
                                    {/* Icon first */}
                                    <IoIosCode className='absolute top-1/2 left-4 -translate-y-1/2 text-lg text-white' />
                                    <Button
                                        type='button'
                                        variant='secondary'
                                        label='View Docs on Github'
                                        className='w-full action'
                                    />
                                </div>
                            </Link>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetails