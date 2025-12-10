import React from 'react'
import VisionLayout from './VisionLayout'

// Page-specific metadata
export const metadata = {
  title: "Vision | Portify",
  description: "Learn about my vision and goals for the future.",
  openGraph: {
    title: "Vision | Portify",
    description: "Learn about our vision and goals for the future.",
    url: "https://example.com/vision",
  },
}

const VisionPage = () => {
  return (
    <div>
        <VisionLayout />
    </div>
  )
}

export default VisionPage