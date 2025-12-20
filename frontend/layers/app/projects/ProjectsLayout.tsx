'use client'
import api from '@/lib/axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { LuListFilter } from 'react-icons/lu'
import { MdOutlineSearch, MdOutlineUnfoldLess } from 'react-icons/md'
import Image from 'next/image'

// Project interface
interface projects {
    id: number
    name: string
    intro: string
    docs: string
    image: string
    tech: string[]
    main_tech: string[]
    category: string
}


const ProjectsLayout = () => {

    // Setup state management
    const [projects, setProjects] = useState<projects[] | null>(null);
    const [error, setError] = useState<string[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Categoriy dropdown interactivity
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [category, setCategory] = useState<string>('all');
    const [search, setSearch] = useState<string>('');

    // Categories list
    const categories = [
        { label: "All", value: "all" },
        { label: "Static Websites", value: "static" },
        { label: "Interactive Frontend", value: "interactive" },
        { label: "CLI Apps", value: "cli" },
        { label: "Full-Stack Web App", value: "fullstack" },
        { label: "E-Commerce Web App", value: "ecommerce" },
    ];

    // Get project list on mount
    useEffect(() => {
        const projectList = async () => {
            try {
                const response = await api.get('/api/projects/');
                if (response.data.length === 0) {
                    setError(["No projects fouund"])
                    setProjects(null)
                } else {
                    setProjects(response.data);
                    setError(null)
                }
            } catch (error: any) {
                setError([error.response?.data?.detail || "Something went wrong"])
                setProjects(null)
            } finally {
                setLoading(false)
            }
        }
        projectList();
    }, [])

    // Show loading if fetching
    if (loading) return <p className='flex justify-center items-center min-h-screen
            text-blue-600 font-extrabold text-6xl'>
        Loading...
    </p>;

    // Show error
    if (error) return <p className='flex justify-center items-center min-h-screen
        text-red-500 font-extrabold text-3xl'>{error.join(", ")}</p>;

    // Filter and search
    const filteredProjects = projects?.filter(project => {
        const matchesCategory = category == 'all' || project.category === category
        const matchesSearch = project.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        return matchesCategory && matchesSearch
    })

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
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='border border-gray-300 w-full p-2 pr-10 rounded-lg placeholder-gray-400'
                            placeholder='Search projects...'
                        />
                    </div>

                    {/* Category input */}
                    <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 relative">
                        <LuListFilter className='absolute top-1/2 left-3 -translate-y-1/2 text-2xl text-gray-400' />
                        <MdOutlineUnfoldLess
                            onClick={() => setCategoryOpen(prev => !prev)}
                            className='absolute top-1/2 right-3 -translate-y-1/2 text-2xl
                                        text-gray-400 cursor-pointer hover:text-black'
                        />
                        <input
                            type="text"
                            value={categories.find(c => c.value === category)?.value}
                            readOnly
                            className='border border-gray-300 w-full pl-10 pr-10 p-2 rounded-lg placeholder-black cursor-pointer hover:bg-gray-200'
                            placeholder='All Categories'
                            onClick={() => setCategoryOpen(prev => !prev)}
                        />

                        {/* Dropdown list */}
                        {categoryOpen && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-50">
                                {categories.map((c => (
                                    <div
                                        key={c.value}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setCategory(c.value)
                                            setCategoryOpen(false)
                                        }}
                                    >
                                        {c.label}
                                    </div>
                                )))}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Project cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects && filteredProjects.map((project) => (
                    <div key={project.id} className="card bg-base-100 w-full shadow-sm">
                        <div className="w-full h-64 overflow-hidden rounded-lg">
                            {project.image ? (
        <Image
          src={project.image}
          alt={project.name}
          width={300}
          height={300}
          loading="eager"
          className="w-full object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
                        </div>
                        <Link href={`/projects/${project.id}`}>
                            <div className="card-body">
                                <h2 className="card-title">{project.name}</h2>
                                <p>{project.intro}</p>

                                {/* Tech badges */}
                                <div className="pt-5 pb-5 flex flex-row flex-wrap space-y-2 space-x-1">
                                    {project.main_tech.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-blue-400/30 text-blue-700 font-bold 
                                        p-1 w-fit h-8 text-center rounded-xl"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default ProjectsLayout