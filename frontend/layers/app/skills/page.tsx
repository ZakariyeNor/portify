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
    <div>
        <SkillsPage />
    </div>
  )
}

export default Skills