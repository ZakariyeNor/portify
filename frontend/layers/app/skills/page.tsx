import React from 'react'
import SkillsPage from './SkillsLayout'

// Page-specific metadata
export const metadata = {
  title: "Skills & Education | Portify",
  description: "Explore my technical skills, academic background, and professional expertise.",
  openGraph: {
    title: "Skills & Education | Portify",
    description: "Explore my technical skills, academic background, and professional expertise.",
    url: "https://example.com/skills",
  },
}

const Skills = () => {
  return (
    <div className='flex flex-col m-10 p-5 lg:m-15 lg:p-5 bg-gray-600/20'>
        <SkillsPage />
    </div>
  )
}

export default Skills