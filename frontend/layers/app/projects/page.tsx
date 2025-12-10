import React from 'react'
import ProjectsLayout from './ProjectsLayout'

// Page-specific metadata
export const metadata = {
  title: "Projects | Portify",
  description: "Showcasing my projects, case studies, and portfolio work.",
  openGraph: {
    title: "Projects | Portify",
    description: "Showcasing my projects, case studies, and portfolio work.",
    url: "https://example.com/projects",
  },
}

const ProjectsPage = () => {


    return (
        <div className="flex flex-col m-10 p-5 lg:m-15 lg:p-5">
            <ProjectsLayout />
        </div>
    )
}

export default ProjectsPage