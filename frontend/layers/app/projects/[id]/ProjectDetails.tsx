'use client'


import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Button from '@/app/components/ui/Button'
import { RxExternalLink } from 'react-icons/rx'
import Link from 'next/link'
import { IoCodeOutline } from "react-icons/io5";
import { IoIosCode } from 'react-icons/io'
import api from '@/lib/axios'
import { useParams } from 'next/navigation';
import { techColors } from './techColors'

interface individualProject {
    id: number;
    name: string;
    intro: string;
    docs: string;
    image: string;
    category: string;
    tech: string[];
}


const ProjectDetails = () => {

    // State management
    const [individualProject, setindividualProject] = useState<individualProject | null>(null);
    const [error, setError] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Get id from the url
    const params = useParams();
    const id = params.id;

    // Fetch project.id
    useEffect(() => {
        if (!id) return;
        const fetchOnePRoject = async () => {
            try {
                const res = await api.get(`/api/projects/${id}`);
                if (res.data.length === 0) {
                    setError(["There is no project with that id"]);
                    setindividualProject(null);
                } else {
                    setindividualProject(res.data);
                    setError(null);
                }
            } catch (err: any) {
                setError([err.res?.data?.detail || "Something went wrong"]);
            } finally {
                setLoading(false);
            }
        }
        fetchOnePRoject();
    }, [id])

    // Show loading if fetching
    if (loading) return <p className='flex justify-center items-center min-h-screen
            text-blue-600 font-extrabold text-6xl'>
        Loading...
    </p>;

    // Show error
    if (error) return <p className='flex justify-center items-center min-h-screen
        text-red-500 font-extrabold text-3xl'>{error.join(", ")}</p>;


    return (
        <div className="flex flex-col p-15 lg:p-25 min-h-screen">
            {/* Breadcrumbs */}
            <div className="breadcrumbs text-sm mb-4">
                <ul className="flex space-x-2">
                    <li><Link href='/'>Home</Link></li>
                    <li><Link href='/projects'>Projects</Link></li>
                    <li className="font-semibold">Project Detail</li>
                </ul>
            </div>

            {/* Intro */}
            {individualProject && (
                <>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                            {individualProject.name}
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                            {individualProject.intro}
                        </p>
                    </div>

                    {/* Image */}
                    <div className="w-full lg:w-3/3 mx-auto mb-6 rounded-lg overflow-hidden">
                        <Image
                            src={individualProject.image}
                            alt="Project detail image"
                            width={900}
                            height={650}
                            loading='eager'
                            className="w-full h-auto object-cover rounded-lg"
                            unoptimized
                        />
                    </div>

                    {/* Project Content */}
                    <div className="flex flex-col lg:flex-row lg:space-x-8">
                        {/* Left content */}
                        <div className="lg:w-2/3 flex flex-col space-y-6 mb-6 lg:mb-0">
                            <div>
                                <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-2">Project Overview</h2>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    {individualProject.docs}
                                </p>
                            </div>
                            <div>
                                <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-2">My Role & Responsibilities</h2>
                                <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                                    {individualProject.docs}
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
                                    {/* used tech */}
                                    {individualProject?.tech.map((tech, idx) => {
                                        const colors = techColors[tech] || { bg: "icons", text: "text-blue-600" };
                                        return (
                                            <div
                                                key={idx}
                                                className={`font-bold p-1 w-fit rounded-xl whitespace-nowrap ${colors.bg} ${colors.text}`}
                                            >
                                                {tech}
                                            </div>
                                        );
                                    })}
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
                </>
            )}
        </div>
    )
}

export default ProjectDetails