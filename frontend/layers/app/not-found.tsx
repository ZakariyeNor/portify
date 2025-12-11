import React from 'react'
import { MdError } from 'react-icons/md'
import { TbError404Off } from 'react-icons/tb'
import Button from './components/ui/Button'
import { GoDotFill } from 'react-icons/go'
import Link from 'next/link'

// Page-specific metadata
export const metadata = {
  title: "404 | Page Not Found",
  description: "Oops! The page you are looking for does not exist.",
  robots: "noindex, nofollow",
  openGraph: {
    title: "404 | Page Not Found",
    description: "Oops! The page you are looking for does not exist.",
  },
  twitter: {
    card: "summary",
    title: "404 | Page Not Found",
    description: "Oops! The page you are looking for does not exist.",
  },
}

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center 
            min-h-screen px-4 text-center space-y-8">

            {/* Error Icon */}
            <MdError className='text-blue-700 text-9xl sm:text-[9rem]' />

            {/* 404 Icon */}
            <TbError404Off className='text-black text-[8rem] sm:text-[12rem]' />

            {/* Heading */}
            <h1 className="font-extrabold text-4xl sm:text-6xl">
                Looks like you're lost.
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-base sm:text-xl max-w-2xl">
                The page you are looking for doesn't exist or has been moved.
                Sorry for the inconvenience, let's get you back on track.
            </p>

            {/* Return Button */}
            <Button
                type='button'
                variant='primary'
                label='Return to home'
                className='px-6 py-3'
            />

            {/* Links */}
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 justify-center items-center text-gray-500 font-bold text-lg">

                <div>
                    <Link href='/projects'>
                        View my work
                    </Link>
                </div>
                <GoDotFill />
                <div>
                    <Link href='/'>
                        Get In Touch
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
