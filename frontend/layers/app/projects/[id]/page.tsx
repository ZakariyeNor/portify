import React from 'react'
import ProjectDetails from './ProjectDetails'

// Page-specific metadata
export const metadata = {
  title: "Project Title | Portfolio",
  description: "Detailed overview of Project Title, technologies used, and role in development.",
  openGraph: {
    title: "Project Title | Portfolio",
    description: "Detailed overview of Project Title, technologies used, and role in development.",
    url: "https://example.com/projects/project-title",
  },
}

const ProjectDetailPage = () => {
  return (
    <div>
      <ProjectDetails />
    </div>
  )
}

export default ProjectDetailPage
