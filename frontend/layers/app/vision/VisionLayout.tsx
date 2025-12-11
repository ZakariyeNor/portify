import React from 'react'
import { FaFlag } from 'react-icons/fa'
import { MdGroups3 } from 'react-icons/md'
import Button from '../components/ui/Button'

const VisionLayout = () => {
  return (
    <div className="flex flex-col m-10 p-5 lg:m-15 lg:p-10 min-h-screen">
      {/* Vision introduction */}
      <div className="flex flex-col justify-center items-center space-y-2 px-4 sm:px-8 lg:px-16">
        <p className="text-blue-500 text-xs sm:text-sm uppercase font-bold">
          My Philosophy
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
          My Vision & Philosophy
        </h1>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center max-w-3xl">
          A brief look into the principles that guide my work, my long-term goals, and my approach to design and development.
        </p>

        <div className="bg-blue-500/20 italic border-l-4 border-blue-800 rounded-r-lg mt-4 flex justify-center items-center px-4 py-6 sm:py-8 w-full max-w-4xl">
          <p className="text-center text-sm sm:text-base md:text-lg">
            "Design with Empathy, Build with Purpose. I believe the best solutions are born from a deep understanding of human needs and a relentless pursuit of craftsmanship."
          </p>
        </div>
      </div>


      {/* Guiding principles */}
      {/* Header */}
      <div className="flex justify-center mt-10">
        <div className="uppercase text-gray-600 font-extrabold">
          Guiding Principles
        </div>
      </div>

      {/* Cards */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-9 gap-3">
        {/* Card 1 */}
        <div className="shadow-md border border-gray-300/30 bg-white rounded w-[90%]">
          {/* Icon */}
          <div className="relative w-fit">
            <div className="absolute top-3 left-3 mb-2 text-blue-600">
              <MdGroups3 className='w-8 h-6' />
            </div>

          </div>
          {/* Content */}
          <h3 className="h3 font-bold mt-8 p-3 w-[70%]">
            Human-Centered Approach
          </h3>
          <p className="text-gray-400 -mt-3 p-3 w-[90%] mb-4">
            Prioritizing user needs and creatine truitve accessible
            experiences is at the core of my process.
          </p>
        </div>
        {/* Card 1 */}
        <div className="shadow-md border border-gray-300/30 bg-white rounded w-[90%]">
          {/* Icon */}
          <div className="relative w-fit">
            <div className="absolute top-3 left-3 mb-2 text-blue-600">
              <MdGroups3 className='w-8 h-6' />
            </div>

          </div>
          {/* Content */}
          <h3 className="h3 font-bold mt-8 p-3 w-[70%]">
            Human-Centered Approach
          </h3>
          <p className="text-gray-400 -mt-3 p-3 w-[90%] mb-4">
            Prioritizing user needs and creatine truitve accessible
            experiences is at the core of my process.
          </p>
        </div>
        {/* Card 1 */}
        <div className="shadow-md border border-gray-300/30 bg-white rounded w-[90%]">
          {/* Icon */}
          <div className="relative w-fit">
            <div className="absolute top-3 left-3 mb-2 text-blue-600">
              <MdGroups3 className='w-8 h-6' />
            </div>

          </div>
          {/* Content */}
          <h3 className="h3 font-bold mt-8 p-3 w-[70%]">
            Human-Centered Approach
          </h3>
          <p className="text-gray-400 -mt-3 p-3 w-[90%] mb-4">
            Prioritizing user needs and creatine truitve accessible
            experiences is at the core of my process.
          </p>
        </div>
        {/* Card 1 */}
        <div className="shadow-md border border-gray-300/30 bg-white rounded w-[90%]">
          {/* Icon */}
          <div className="relative w-fit">
            <div className="absolute top-3 left-3 mb-2 text-blue-600">
              <MdGroups3 className='w-8 h-6' />
            </div>

          </div>
          {/* Content */}
          <h3 className="h3 font-bold mt-8 p-3 w-[70%]">
            Human-Centered Approach
          </h3>
          <p className="text-gray-400 -mt-3 p-3 w-[90%] mb-4">
            Prioritizing user needs and creatine truitve accessible
            experiences is at the core of my process.
          </p>
        </div>

      </div>

      {/* Long-term goals */}
      <div className="flex justify-center mt-10">
        <div className="uppercase text-gray-600 font-extrabold">
          Long-Term Goals
        </div>
      </div>
      <div className="mt-16">

        <div className="grid grid-cols-[40px_1fr] gap-x-2">
          {[
            {
              year: "Year 1 Goal",
              title: "Master Advanced React Patterns",
              description: "Deepen my expertise in state management, performance optimization, and server-side components."
            },
            {
              year: "Year 3 Goal",
              title: "Lead a Full-Stack Project",
              description: "Take ownership of a project from conception to deployment, mentoring junior developers along the way."
            },
            {
              year: "Year 5 Goal",
              title: "Contribute to Open Source",
              description: "Become an active contributor to a major open-source project within the web development ecosystem."
            },
            {
              year: "Year 7 Goal",
              title: "Master Backend & DevOps Skills",
              description: "Focus on scalable backend architecture, API design, and deploying production-ready systems using modern DevOps practices."
            }
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1">
                {idx !== 0 && <div className="w-[1.5px] border-l-2 border-dotted border-gray-300 dark:border-gray-600 h-full grow"></div>}
                <FaFlag className="text-blue-600 text-xl sm:text-2xl" />
                <div className="w-[1.5px] border-l-2 border-dotted border-gray-300 dark:border-gray-600 h-full grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-6 sm:py-8">
                <p className="text-blue-500 text-base sm:text-sm font-extrabold">{item.year}</p>
                <p className="text-gray-800 text-base sm:text-lg font-semibold">{item.title}</p>
                <p className="text-gray-500 text-sm sm:text-base">{item.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* End */}
      <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className='font-light'>
          Ready yo build something great together
        </h1>
        <Button
          type='button'
          variant='success'
          className='w-fit'
          label='View My Work'
        />
      </div>
    </div>
  )
}

export default VisionLayout