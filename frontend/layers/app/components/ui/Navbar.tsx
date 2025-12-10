'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsBarChartSteps } from 'react-icons/bs'
import { RiMenu2Line } from 'react-icons/ri'
import Button from './Button'

const Navigation = () => {

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("Home");

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/" },
        { name: "Skills", href: "/" },
        { name: "Vision", href: "/" },
    ];

    return (
        <div className="navbar bg-base-100 shadow-sm relative">

            <div className="navbar-start relative">
                {/* Mobile icon */}
                <div
                    onClick={() => setOpen(prev => !prev)}
                    className="btn btn-ghost lg:hidden"
                >
                    <RiMenu2Line className="h-6 w-6" />
                </div>

                {/* Mobile dropdown (correctly positioned OUTSIDE navbar) */}
                <ul
                    className={`menu menu-sm bg-base-100 rounded-box shadow p-2 w-52
                    absolute left-0 top-full mt-2 z-50
                    ${open ? "block" : "hidden"}`}
                >
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={active === item.name ? "font-bold text-blue-600" : ""}
                                onClick={() => {
                                    setActive(item.name)
                                    setOpen(false)
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Logo */}
                <Link href="/" className="btn btn-ghost text-xl">
                    <BsBarChartSteps className="text-blue-600 text-2xl font-extrabold" />
                    <h1 className="pl-1 font-semibold">Portify</h1>
                </Link>
            </div>
            {/* Desktop nav */}
            <div className="lg:flex flex-row navbar-end">
                <div>
                    <ul className="hidden lg:flex menu menu-horizontal px-5 gap-2">
                         {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={active === item.name ? "font-extrabold text-blue-800" : ""}
                                    onClick={() => setActive(item.name)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:block">
                    <Link
                        href='/'
                        className="bg-blue-600 text-white rounded-lg action">
                            <Button
                                label='Contact Me'
                                type='button'
                                className='action'
                                onClick={() => console.log('Contact me')}
                                variant='primary'
                            />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation