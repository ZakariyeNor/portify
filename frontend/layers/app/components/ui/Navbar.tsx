'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsBarChartSteps } from 'react-icons/bs'
import { RiMenu2Line } from 'react-icons/ri'
import Button from './Button'
import { usePathname } from 'next/navigation'
import Image from 'next/image'



const Navigation = () => {
    const pathName = usePathname()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Home')

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Vision', href: '/vision' },
  ]

  useEffect(() => {
    const current = menuItems.find(item => item.href === pathName)
    if (current) setActive(current.name)
    else setActive('')
  }, [pathName])

  return (
    <div className="navbar bg-base-100 shadow-sm relative" data-theme="light">
      <div className="navbar-start relative">
        {/* Mobile icon */}
        <div
          onClick={() => setOpen(prev => !prev)}
          className="btn btn-ghost lg:hidden"
        >
          <RiMenu2Line className="h-6 w-6" />
        </div>

        {/* Mobile dropdown */}
        <ul
          className={`menu menu-sm bg-base-100 rounded-box shadow p-2 w-52
                    absolute left-0 top-full mt-2 z-50
                    ${open ? 'block' : 'hidden'}`}
        >
          {menuItems.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`${
                  active === item.name ? 'font-bold text-blue-600' : ''
                }`}
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
          <Image
            src='/logo.png'
            alt='Logo Image'
            className='rounded-lg p-1'
            width={40}
            height={10}
          />
          <h1 className="pl-1 font-semibold">Portify</h1>
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="lg:flex flex-row navbar-end items-center gap-4">
        <ul className="hidden lg:flex menu menu-horizontal px-5 gap-2">
          {menuItems.map(item => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`${
                  active === item.name ? 'font-extrabold text-blue-800' : ''
                }`}
                onClick={() => setActive(item.name)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact button without extra background */}
        <Link href="/contact">
          <Button
            label="Contact Me"
            type="button"
            variant="primary"
            className="px-4 py-2 action"
          />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
