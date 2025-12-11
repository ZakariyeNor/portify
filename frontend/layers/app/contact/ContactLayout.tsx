import React from 'react'
import Button from '../components/ui/Button'
import { FaGithub } from 'react-icons/fa'
import { RiTwitterFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'

const ContactLayout = () => {
    return (
        <div className="flex flex-col justify-center items-center px-4 py-10 sm:py-16 lg:py-24">
            {/* Intro */}
            <div className="flex flex-col items-center space-y-2 max-w-3xl text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                    Get in Touch
                </h1>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                    Feel free to reach out for collaborations, questions, or opportunities.
                    I'd love to hear from you!
                </p>
            </div>

            {/* Contact Form */}
            <form className="flex flex-col space-y-4 mt-8 sm:mt-12 w-full max-w-3xl">
                {/* Name & Email */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex flex-col space-y-1 flex-1">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 rounded-lg p-2 placeholder-gray-400"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="flex flex-col space-y-1 flex-1">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="bg-white border border-gray-300 rounded-lg p-2 placeholder-gray-400"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium">Subject</label>
                    <input
                        type="text"
                        className="bg-white border border-gray-300 rounded-lg p-2 placeholder-gray-400"
                        placeholder="What is this about?"
                    />
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                        className="bg-white border border-gray-300 rounded-lg p-2 placeholder-gray-400 resize-none h-32 sm:h-40"
                        placeholder="Write your message here"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="button"
                        variant="primary"
                        className="w-40"
                        label="Send Message"
                    />
                </div>
            </form>

            <hr className="text-gray-400 border-b border-gray-100 w-[70%] mt-10" />

            {/* Contact links */}
            <div className="mt-10 flex flex-col items-center space-y-5">
                <h6>Or find me on</h6>

                {/* Icons */}
                <div className="flex flex-row items-center justify-center space-x-4 pt-5">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <FaGithub className="h-6 w-6" />
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <RiTwitterFill className="h-6 w-6" />
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <MdEmail className="h-6 w-6" />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ContactLayout
