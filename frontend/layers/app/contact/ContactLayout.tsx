'use client'

import React, { useState } from 'react'
import Button from '../components/ui/Button'
import api from '@/lib/axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { SiMaildotcom, SiProtonmail } from 'react-icons/si'
import { FaPhoneAlt } from 'react-icons/fa'


// Form Control
type ContactType = {
    name: string;
    subject: string;
    email: string;
    message: string;
}


const ContactLayout = () => {

    // Sate management
    const [formData, setFormData] = useState<ContactType>({
        name: '', email: '', subject: '', message: '',
    });

    // Control form submission data
    const [error, setError] = useState<{ [key: string]: string[] } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // On Form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // prevent page reload
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError(null);


        try {
            const sendForm = await api.post('/api/contact_us/', formData);

            toast.success("Message sent successfully!, we'll answer you in 24 hours.");

            // reset
            setFormData({ name: '', email: '', subject: '', message: '' });
            setError(null);

        } catch (errs: any) {
            toast.error("Failed to send message. Please try again.")
            if (errs.response?.data) {
                setError(errs.response.data);
            } else {
                setError({ non_field_errors: ["Something went wrong"] });
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex flex-col justify-center items-center px-4 py-10 sm:py-16 lg:py-25 min-h-screen">
            {/* Intro */}
            <div className="flex flex-col items-center space-y-2 max-w-3xl text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                    Get in Touch
                </h1>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                    Feel free to reach out for collaborations, questions, or opportunities.
                    I'd love to hear from you!
                </p>
                {/* Tech / Developer Inquiries */}
                <h2 className="text-white text-lg md:text-xl font-bold">Tech & Development</h2>
                <p className="text-gray-400 text-base md:text-lg">
                    ★ I'm a full-stack developer with real-world experience building web apps,
                    booking systems, and solutions for local businesses.
                </p>
                <p className="text-gray-400 text-base md:text-lg">
                    ★ Whether you're looking for a custom website, online booking system,
                    or just want to discuss tech ideas, I'm here to help.
                    Reach out and let's turn your ideas into reality!
                </p>

                {/* NGO / Co-Founder Inquiries */}
                <h2 className="text-white text-lg md:text-xl font-bold">NGO & Co-Founder Opportunities</h2>
                <p className="text-gray-400 text-base md:text-lg">
                    ★ I'm looking for passionate people to start a participatory NGO with me.
                    If you care about community-led projects, democratic systems, and building a sustainable organization,
                    reach out! Tell me a bit about yourself, your skills, and why you want to join this initiative.
                </p>

                {/* Closing */}
                <p className="text-gray-400 text-base md:text-lg font-semibold">
                    ★ Quick response guaranteed – I usually reply within 24 hours
                </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-8 sm:mt-12 w-full max-w-3xl">
                {/* Name & Email */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="flex flex-col space-y-1 flex-1">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-white border border-gray-300 rounded-lg p-2 placeholder-gray-400"
                            placeholder="Your Name"
                        />
                        {error?.name && (
                            <p className="text-red-600 font-extrabold text-md border p-3 mt-3 rounded-xl opacity-90 bg-gray-100/50">{error.name.join(", ")}</p>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1 flex-1">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-white border border-gray-300 rounded-lg p-2 placeholder-gray-400"
                            placeholder="your.email@example.com"
                        />
                        {error?.email && (
                            <p className="text-red-600 font-extrabold text-md border p-3 mt-3 rounded-xl opacity-90 bg-gray-100/50">{error.email.join(", ")}</p>
                        )}
                    </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium">Subject</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="bg-white border border-gray-300 rounded-lg p-2 placeholder-gray-400"
                        placeholder="What is this about?"
                    />
                    {error?.subject && (
                        <p className="text-red-600 font-extrabold text-md border p-3 mt-3 rounded-xl opacity-90 bg-gray-100/50">{error.subject.join(", ")}</p>
                    )}
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-white border border-gray-300 rounded-lg p-2 placeholder-gray-400 resize-none h-32 sm:h-40"
                        placeholder="Write your message here"
                    />
                    {error?.message && (
                        <p className="text-red-600 font-extrabold text-md border p-3 mt-3 rounded-xl opacity-90 bg-gray-100/50">{error.message.join(", ")}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-40 action"
                        label={loading ? "Sending..." : "Send Message"}
                        disabled={loading}
                    />
                </div>
            </form>

            <hr className="text-gray-400 border-b border-gray-100 w-[70%] mt-10" />

            {/* Contact links */}
            <div className="mt-10 flex flex-col items-center space-y-5">
                <h6>Find me on</h6>

                {/* Icons */}
                <div className="flex flex-row items-center justify-center space-x-4 pt-5">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <Link href='https://www.linkedin.com/in/zakariye-f-nor-67648a39b/' target='_blank' rel="noopener noreferrer">
                            <FaLinkedin className='h-6 w-9 text-blue-600' />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <Link href='https://x.com/ZakariyeNorX' target='_blank' rel="noopener noreferrer">
                            <FaXTwitter className="h-6 w-6" />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <Link href='mailto:theowner.me@engineer.com' target='_blank' rel="noopener noreferrer">
                            <SiMaildotcom className="h-6 w-6 text-blue-800" />
                        </Link>
                    </div>
                </div>
                {/* Call */}
                <div className="flex flex-col items-center space-y-7 mt-4">
                    <p className="text-gray-400 text-sm sm:text-base">
                        Or call me at
                    </p>
                    <a href="tel:+46701305100" className="flex items-center justify-center h-12 w-12 rounded-full icons">
                        <FaPhoneAlt className="h-6 w-6 text-green-600" />
                    </a>
                </div>
            </div>


        </div>
    )
}

export default ContactLayout
