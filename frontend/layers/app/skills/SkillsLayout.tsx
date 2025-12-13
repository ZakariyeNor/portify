'use client'
import React, { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import { FiDownload } from 'react-icons/fi'
import { VscDebugBreakpointData } from 'react-icons/vsc'
import { SkillsData } from './Interface'
import api from '@/lib/axios'
import Link from 'next/link'
import { Certificate } from 'crypto'



const SkillsPage = () => {


  // Setup state management
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);

  // Manage response
  const [error, setError] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch and render them on page mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const resp = await api.get('/api/unified/');
        if (resp.data.length === 0) {
          setError(["No skills data found"])
          setSkillsData(null)
        } else {
          setSkillsData(resp.data)
          setError(null)
        }
        console.log(resp.data)
      } catch (errs: any) {
        setError([errs.resp?.data?.detail || "Something went wrong"])
        setSkillsData(null)
        console.log(errs)
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
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

      {/* Intro */}
      {skillsData && skillsData?.certificates.length > 0 && (
        <div className="flex flex-col space-y-4 relative">
          <h1 className="font-extrabold text-3xl">
            Skills & Education
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            {skillsData && skillsData.certificates[0].about}
          </p>

          {/* Download CV */}
          <div className="relative w-full ml-10 mb-10 -mt-5">
            <Link
              href={`http://localhost:8000${skillsData.certificates[0].resume}`}
              target="_blank"
              rel="noopener noreferrer"
              download={true}
            >
              <Button
                type="button"
                className="absolute right-10 top-5 w-full sm:w-[60%] md:w-[40%] lg:w-[30%]
                  flex items-center justify-center placeholder:mr-5"
                label="Download Resume"
              />
            </Link>
            <FiDownload className="absolute right-14 top-7 text-xl text-white cursor-pointer" />
          </div>
        </div>
      )}

      {/* Education */}
      <div className="mt-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Education</h2>
        {skillsData && skillsData.education.length > 0 && (

          <div className="grid grid-cols-[40px_1fr] gap-x-2">

            {skillsData.education.map((edu, idx) => (
              <React.Fragment key={edu.id}>
                <div className="flex flex-col items-center gap-1">
                  {idx !== 0 && <div className="w-[1.5px] bg-gray-300 dark:bg-gray-600 h-full grow"></div>}
                  <VscDebugBreakpointData className="text-blue-600 text-xl sm:text-2xl" />
                  <div className="w-[1.5px] bg-gray-300 dark:bg-gray-600 h-full grow"></div>
                </div>
                <div className="flex flex-1 flex-col py-6 sm:py-8">
                  <p className="text-gray-800 text-base sm:text-lg font-semibold">{edu.course}</p>
                  <div className="flex space-x-2">
                    <p className="text-gray-500 text-sm sm:text-base">{edu.school},</p>
                    <p className="text-gray-500 text-sm sm:text-base">{edu.period}</p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>


      {/* Technical Skills */}
      <div className="mt-12 flex flex-col">
        <h2 className="font-extrabold text-2xl mb-4">Technical Skills</h2>

        {skillsData &&
          skillsData.skill_categories.map((category) => (
            <div key={category.id} className="mt-6">
              <h5 className="font-semibold">{category.title}</h5>
              <div className="pt-2 flex flex-wrap gap-2">
                {category.skills.length > 0 ? (
                  category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-blue-400/30 text-blue-700 font-bold px-3 py-1 rounded-xl text-sm sm:text-base"
                    >
                      {skill.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm italic">No skills listed yet</p>
                )}
              </div>
            </div>
          ))}
      </div>


      {/* Certificates Carousel */}
      <div className="flex flex-col space-y-4 mt-12">
        <h2 className="font-extrabold text-3xl">Certificates</h2>

        {skillsData && skillsData.certificates.length > 0 && (
          <div className="carousel carousel-center space-x-4 p-2 overflow-x-auto">
            {skillsData.certificates.map((cert) => (
              <div
                key={cert.id}
                className="carousel-item shrink-0 w-[80%] sm:w-[60%] md:w-[45%] lg:w-[22%]"
              >
                <img
                  src={`http://localhost:8000${cert.image}`}
                  alt={cert.name}
                  className="h-48 w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default SkillsPage
