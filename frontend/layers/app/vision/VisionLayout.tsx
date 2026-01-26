'use client'
import React, { useEffect, useState } from 'react'
import { FaFlag } from 'react-icons/fa'
import { MdGroups3 } from 'react-icons/md'
import Button from '../components/ui/Button'
import api from '@/lib/axios'
import { VisionsType } from './VisonsTypes'
import Link from 'next/link'
import { iconsMap } from './Principles'
import { FiBook } from 'react-icons/fi'


const VisionLayout = () => {

  // State management
  const [visions, setVisions] = useState<VisionsType[] | null>(null);

  // Manage response
  const [error, setError] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Get visions content
  useEffect(() => {
    const VisionsData = async () => {
      try {
        const responses = await api.get('/api/visions/');
        if (responses.data.length === 0) {
          setError(["There is no visions found"])
          setVisions(null)
        } else {
          setVisions(responses.data)
          setError(null)
        }
      } catch (err: any) {
        setError([err.responses?.data.detail || "Something went wrong"])
        setVisions(null)
      } finally {
        setLoading(false)
      }
    }
    VisionsData();
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
    <div className="flex flex-col p-15 lg:p-25 min-h-screen">
      {/* Vision introduction */}
      {visions?.map((vision) => (
        <React.Fragment key={vision.id}>
          <div
            className="flex flex-col justify-center items-center space-y-2 px-4 sm:px-8 lg:px-16">
            <p className="text-blue-500 text-xs sm:text-sm uppercase font-bold">
              My Philosophy
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
              {vision.title}
            </h1>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center max-w-3xl">
              {vision.sub_title}
            </p>

            <div className="bg-blue-500/20 italic border-l-4 border-blue-800 rounded-r-lg mt-4 flex justify-center items-center px-4 py-6 sm:py-8 w-full max-w-4xl">
              <p className="text-center text-sm sm:text-base md:text-lg">
                {vision.vision_intro}
              </p>
            </div>
          </div>


          {/* Guiding principles */}
          {/* Header */}
          <div
            className="flex justify-center mt-10">
            <div className="uppercase text-gray-600 font-extrabold">
              {vision.principles_title}
            </div>
          </div>

          {/* Cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-9 gap-3 wrap-break-word">
            {/* Card 1 */}
            {vision.principles_list.map((principle) => {
              const Icon = iconsMap[principle.key] ?? FiBook;
              
              return (
              <div
                key={principle.id}
                className="shadow-xl/10 border border-gray-300/30 bg-white rounded w-full md:w-[90%]
                text-sm md:text-lg">
                {/* Icon */}
                <div className="relative w-fit">
                  <div className="absolute top-3 left-3 mb-2 text-blue-600">
                    <Icon className='w-8 h-6' />
                  </div>

                </div>
                {/* Content */}
                <h3 className="h3 font-bold mt-8 p-3 w-[70%] capitalize">
                  {principle.title}
                </h3>
                <p className="text-gray-400 -mt-3 p-3 w-[90%] mb-4">
                  {principle.content}
                </p>
              </div>
              )
            })}
          </div>

          {/* Long-term goals */}
          <div
            className="flex justify-center mt-10">
            <div className="uppercase text-gray-600 font-extrabold">
              {vision.longterm_title}
            </div>
          </div>

          <div className="mt-16">
            {vision.long_term_list.map((longTerm) => (
              <div
                key={longTerm.id}
                className="grid grid-cols-[40px_1fr] gap-x-2 capitalize">
                {[
                  {
                    year: longTerm.year,
                    title: longTerm.plan,
                    description: longTerm.description
                  }
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center gap-1">
                      {idx !== 0 && <div className="w-[1.5px] border-l-2 border-dotted border-gray-300 dark:border-gray-200 h-full grow"></div>}
                      <FaFlag className="text-blue-600 text-xl sm:text-2xl" />
                      <div className="w-[1.5px] border-l-2 border-dotted border-gray-300 dark:border-gray-400 h-full grow"></div>
                    </div>
                    <div className="flex flex-1 flex-col py-6 sm:py-8">
                      <p className="text-blue-500 text-base sm:text-sm font-extrabold">{item.year}</p>
                      <p className="text-gray-800 text-base sm:text-lg font-semibold">{item.title}</p>
                      <p className="text-gray-500 text-sm sm:text-base">{item.description}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
      {/* End */}
      <div className="flex flex-col justify-center items-center space-y-4 mt-5">
        <h1 className='font-light'>
          Ready yo build something great together
        </h1>
        <Link href='/projects'>
          <Button
            type='button'
            variant='success'
            className='w-fit action'
            label='View My Work'
          />
        </Link>
      </div>
    </div>
  )
}

export default VisionLayout