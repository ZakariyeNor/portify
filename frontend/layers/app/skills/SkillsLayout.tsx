import React from 'react'
import Button from '../components/ui/Button'
import { FiDownload } from 'react-icons/fi'
import { VscDebugBreakpointData } from 'react-icons/vsc'

const SkillsPage = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 py-8">

      {/* Intro */}
      <div className="flex flex-col space-y-4 relative">
        <h1 className="font-extrabold text-3xl">
          Skills & Education
        </h1>
        <p className="text-gray-400 text-base sm:text-lg">
          I have built a strong foundation in full-stack development, mastering Next.js, React, Django, and REST APIs. Alongside academic achievements, I’ve cultivated practical skills in Tailwind, TypeScript, and PWA development, preparing me for complex web projects and real-world applications.
        </p>

        {/* Download CV */}
        <div className="relative w-full ml-10 mb-10 -mt-5">
          <Button
            type="button"
            className="absolute right-10 top-5 w-full sm:w-[60%] md:w-[40%] lg:w-[30%] flex items-center justify-center placeholder:mr-5"
            label="Download Resume"
          />
          <FiDownload className="absolute right-14 top-7 text-xl text-white cursor-pointer" />
        </div>
      </div>

      {/* Education */}
      <div className="mt-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Education</h2>

        <div className="grid grid-cols-[40px_1fr] gap-x-2">
          {[
            {
              title: "Full-Stack Web Development Bootcamp",
              school: "CodeAcademy, 2021 – 2022"
            },
            {
              title: "Bachelor of Science in Computer Science",
              school: "UC Berkeley, 2017 – 2021"
            },
            {
              title: "Mastering React & Next.js",
              school: "Udemy, 2022 – 2023"
            },
            {
              title: "Django REST Framework & Backend Mastery",
              school: "Self-Study, 2023 – 2024"
            }
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1">
                {idx !== 0 && <div className="w-[1.5px] bg-gray-300 dark:bg-gray-600 h-full grow"></div>}
                <VscDebugBreakpointData className="text-blue-600 text-xl sm:text-2xl" />
                <div className="w-[1.5px] bg-gray-300 dark:bg-gray-600 h-full grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-6 sm:py-8">
                <p className="text-gray-800 text-base sm:text-lg font-semibold">{item.title}</p>
                <p className="text-gray-500 text-sm sm:text-base">{item.school}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      <div className="mt-12 flex flex-col">
        <h2 className="font-extrabold text-2xl mb-4">Technical Skills</h2>

        {[
          { title: "Programming Languages", skills: ["Figma", "Django", "NextJS", "TypeScript", "Tailwind"] },
          { title: "Frameworks & Libraries", skills: ["React", "NextJS", "Django", "Tailwind", "Alpine.js"] },
          { title: "Databases & Background Jobs", skills: ["PostgreSQL", "Redis", "Celery", "Django ORM"] },
          { title: "DevOps", skills: ["Docker", "GitHub Actions", "Railway", "Render"] },
          { title: "Design Tools & Thinking", skills: ["Figma", "Miro", "Adobe XD", "Canva"] }
        ].map((group, idx) => (
          <div key={idx} className="mt-6">
            <h5 className="font-semibold">{group.title}</h5>
            <div className="pt-2 flex flex-wrap gap-2">
              {group.skills.map((skill, sidx) => (
                <div key={sidx} className="bg-blue-400/30 text-blue-700 font-bold px-3 py-1 rounded-xl text-sm sm:text-base">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certificates Carousel */}
      <div className="flex flex-col space-y-4 mt-12">
        <h2 className="font-extrabold text-3xl">Certificates</h2>

        <div className="carousel carousel-center space-x-4 p-2 overflow-x-auto">
          {[
            "/project_detail.png",
            "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
            "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
            "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
            "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
            "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
            "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
          ].map((src, idx) => (
            <div
              key={idx}
              className="carousel-item shrink-0 w-[80%] sm:w-[60%] md:w-[45%] lg:w-[22%]"
            >
              <img
                src={src}
                alt={`Certificate ${idx + 1}`}
                className="h-48 w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsPage
