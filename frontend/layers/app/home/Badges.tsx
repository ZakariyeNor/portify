import Marquee from "react-fast-marquee";
import React from 'react'
import Image from "next/image";

import {
    FaReact, FaHtml5, FaCss3Alt, FaJs, FaPython, FaFigma,
    FaDocker, FaGitAlt, FaGithub, FaLinux, FaServer
} from "react-icons/fa";

import {
    SiNextdotjs, SiTypescript, SiTailwindcss, SiDaisyui, SiPwa,
    SiJest, SiFlask, SiDjango, SiPostgresql, SiCloudinary,
    SiRedis, SiRailway, SiHeroku, SiVercel, SiJquery,
    SiAlpinedotjs, SiHtmx, SiBootstrap, SiPytest, SiCelery,
    SiMarkdown, SiJsonwebtokens, SiStripe,
    SiWagtail
} from "react-icons/si";

import { TbBrandDjango, TbBrandNextjs } from "react-icons/tb";
import { MdAppSettingsAlt } from "react-icons/md";
import { GrMultiple } from "react-icons/gr";




function Badges() {

    const badges = [
        { label: 'Next.js', color: 'text-black', bg: 'bg-gray-200', icon: <SiNextdotjs /> },
        { label: 'Design Thinking', color: 'text-purple-600', bg: 'bg-gray-200', icon: <MdAppSettingsAlt /> },
        { label: 'React', color: 'text-blue-500', bg: 'bg-gray-200', icon: <FaReact /> },
        { label: 'TypeScript', color: 'text-blue-600', bg: 'bg-gray-200', icon: <SiTypescript /> },
        { label: 'Tailwind CSS', color: 'text-teal-500', bg: 'bg-gray-200', icon: <SiTailwindcss /> },
        { label: 'DaisyUI', color: 'text-purple-500', bg: 'bg-gray-200', icon: <SiDaisyui /> },
        { label: 'PWA', color: 'text-indigo-600', bg: 'bg-gray-200', icon: <SiPwa /> },

        { label: 'HTML', color: 'text-orange-600', bg: 'bg-gray-200', icon: <FaHtml5 /> },
        { label: 'CSS', color: 'text-blue-600', bg: 'bg-gray-200', icon: <FaCss3Alt /> },
        { label: 'JavaScript', color: 'text-yellow-500', bg: 'bg-gray-200', icon: <FaJs /> },

        { label: 'Python', color: 'text-blue-600', bg: 'bg-gray-200', icon: <FaPython /> },
        { label: 'Figma', color: 'text-pink-600', bg: 'bg-gray-200', icon: <FaFigma /> },

        { label: 'UX', color: 'text-emerald-600', bg: 'bg-gray-200', icon: <MdAppSettingsAlt /> },
        { label: 'Agile Development', color: 'text-blue-700', bg: 'bg-gray-200', icon: <MdAppSettingsAlt /> },
        { label: 'Markdown.md', color: 'text-gray-700', bg: 'bg-gray-200', icon: <SiMarkdown /> },

        { label: 'PyTest', color: 'text-green-600', bg: 'bg-gray-200', icon: <SiPytest /> },
        { label: 'Jest', color: 'text-red-500', bg: 'bg-gray-200', icon: <SiJest /> },
        { label: 'FlaskApi', color: 'text-gray-700', bg: 'bg-gray-200', icon: <SiFlask /> },

        { label: 'Django', color: 'text-green-700', bg: 'bg-gray-200', icon: <SiDjango /> },
        {
            label: 'Django REST Framework',
            color: 'text-gray-800',
            bg: 'bg-gray-200',
            icon: (
                <Image
                    src="/badges/drf.png"
                    alt="DRF logo"
                    width={29}
                    height={29}
                    className="mr-2 object-contain"
                />
            ),
        },
        {
            label: 'AWS S3',
            color: 'text-red-800',
            bg: 'bg-gray-200',
            icon: (
                <Image
                    src="/badges/se.png"
                    alt="S3 logo"
                    width={30}
                    height={30}
                    className="mr-2 object-contain rounded-lg"
                />
            ),
        },

        { label: 'Djoser', color: 'text-sky-600', bg: 'bg-gray-200', icon: <MdAppSettingsAlt /> },

        { label: 'Celery', color: 'text-green-600', bg: 'bg-gray-200', icon: <SiCelery /> },
        { label: 'Redis', color: 'text-red-600', bg: 'bg-gray-200', icon: <SiRedis /> },

        { label: 'Tenants', color: 'text-green-600', bg: 'bg-gray-200', icon: <GrMultiple /> },
        { label: 'Wagtail', color: 'text-green-600', bg: 'bg-gray-200', icon: <SiWagtail /> },
        { label: 'Bootstrap', color: 'text-purple-700', bg: 'bg-gray-200', icon: <SiBootstrap /> },

        { label: 'Alpine.js', color: 'text-blue-500', bg: 'bg-gray-200', icon: <SiAlpinedotjs /> },

        { label: 'PostgreSQL', color: 'text-blue-600', bg: 'bg-gray-200', icon: <SiPostgresql /> },
        { label: 'Cloudinary', color: 'text-blue-500', bg: 'bg-gray-200', icon: <SiCloudinary /> },

        { label: 'Docker', color: 'text-blue-700', bg: 'bg-gray-200', icon: <FaDocker /> },
        { label: 'Railway', color: 'text-indigo-600', bg: 'bg-gray-200', icon: <SiRailway /> },
        { label: 'Heroku', color: 'text-purple-600', bg: 'bg-gray-200', icon: <SiHeroku /> },
        { label: 'Vercel', color: 'text-black', bg: 'bg-gray-200', icon: <SiVercel /> },

        { label: 'GitHub', color: 'text-black', bg: 'bg-gray-200', icon: <FaGithub /> },
        { label: 'Linux', color: 'text-yellow-600', bg: 'bg-gray-200', icon: <FaLinux /> },

        { label: 'Stripe', color: 'text-blue-600', bg: 'bg-gray-200', icon: <SiStripe /> }
    ];

    return (
        <div className="m-4 mt-auto pb-20" data-theme="light">
            <Marquee gradient>
                {badges.map((badge, idx) => (
                    <div className='badges' key={idx}>
                        <div
                            className={`badge-icons h-13 flex justify-center items-center mx-1 p-2 rounded-xl ${badge.bg}`}>
                            {React.cloneElement(badge.icon, { className: `mr-2 ${badge.color} text-2xl` })}
                            {badge.label}
                        </div>
                    </div>
                ))}
            </Marquee>

        </div>
    )
}

export default Badges