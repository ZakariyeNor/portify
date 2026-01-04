'use client'

import React, { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { RiTwitterFill, RiTwitterXLine } from 'react-icons/ri'
import { MdApps } from 'react-icons/md'
import Image from 'next/image'
import Badges from './Badges'
import api from '@/lib/axios'
import Link from 'next/link'


// User info interface
interface userProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    intro: string;
    image: string;
}


const HomePage = () => {

    // State management
    const [userData, setUserData] = useState<userProfile[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string[] | null>(null);

    // Render user details on page mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/api/profile/');
                if (response.data.length === 0) {
                    setError(["No profile found"]);
                    setUserData(null);
                    
                } else {
                    setUserData(response.data);
                    setError(null);
                }
            } catch (error: any) {
                setError([error.response?.data?.detail || "Something went wrong"]);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [])
    

    // Show loading if fetching
    if (loading) return <p className='flex justify-center items-center min-h-screen
            text-blue-600 font-extrabold text-6xl'>
        Loading...
    </p>;

    // Show error
    if (error) return <p className='flex justify-center items-center min-h-screen
        text-red-500 font-extrabold text-3xl'>{error.join(", ")}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col-reverse lg:flex lg:flex-row sm:m-10 sm:p-5 lg:m-20 lg:p-10 justify-between items-center h-full">
                {/* Right side the content */}
                {userData && (
                    <>
                        <div className="flex flex-col spece-y-3 w-full lg:w-[50%] p-6">
                            <h1 className="font-extrabold text-4xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl">
                                {userData[0].first_name} {userData[0].last_name}
                            </h1>

                            <p className="text-blue-500 font-bold text-lg sm:text-xs md:text-base lg:text-xl xl:text-2xl pt-3">
                                A Full-Stack Developer with DevOps Skills
                            </p>

                            <p className="text-gray-600 font-normal pt-4">
                                {userData[0].intro}
                            </p>
                            <div className="pt-7 flex flex-row space-x-4">
                                <Link href='/projects'>
                                    <Button
                                        label='View My Work'
                                        type='button'
                                        variant='primary'
                                        className='action'
                                    />
                                </Link>

                                <Link href='/contact'>
                                    <Button
                                        label='Contact Me'
                                        type='button'
                                        variant='secondary'
                                        className=''
                                    />
                                </Link>
                            </div>

                            {/* Icobns */}
                            <div className="flex flex-col">
                                <div className="flex flex-row pt-5 space-x-6">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                                        <Link href='https://github.com/ZakariyeNor' target='_blank' rel="noopener noreferrer">
                                            <FaGithub className='h-6 w-9' />
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                                        <Link href='https://x.com/ZakariyeNorX' target='_blank' rel="noopener noreferrer">
                                            <RiTwitterXLine className='h-6 w-9' />
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                                        <Link href='https://www.linkedin.com/in/zakariye-f-nor-67648a39b/' target='_blank' rel="noopener noreferrer">
                                            <FaLinkedin className='h-6 w-9 text-blue-600' />
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex flex-row pt-1 space-x-4">
                                    <p className="text-gray-800">Github</p>
                                    <p className="text-gray-800">Twitter</p>
                                    <p className="text-gray-800">Linkedin</p>
                                </div>
                            </div>
                        </div>


                        {/* Left side the image*/}
                        <div className="flex justify-center items-center w-full lg:w-[50%] h-full p-6 mb-5">
                            <div className="w-full sm:w-[80%] h-full 
                                rounded-lg 
                                lg:rounded-full 
                                lg:shadow-lg">
                                <Image
                                    src={userData[0].image}
                                    alt="Profile Photo"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto rounded-lg lg:rounded-full shadow-xl/30 select-none"
                                    loading='eager'
                                    loader={({ src }) => src}
                                    unoptimized
                                    onContextMenu={(e) => e.preventDefault()}
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </>
                )}

            </div>
            {/* Buttom infinite badge scroll */}
            <Badges />
        </div>
    )
}

export default HomePage