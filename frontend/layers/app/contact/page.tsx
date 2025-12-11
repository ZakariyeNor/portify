import React from 'react'
import ContactLayout from './ContactLayout'

// Page-specific metadata
export const metadata = {
  title: "Contact | Portify",
  description: "Get in touch with me to discuss projects, collaborations, or inquiries. I’m happy to connect and answer any questions you have.",
  openGraph: {
    title: "Contact | Portify",
    description: "Reach out to discuss projects, collaborations, or inquiries. Let’s connect and explore opportunities together.",
    url: "https://example.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Portify",
    description: "Reach out to discuss projects, collaborations, or inquiries. Let’s connect and explore opportunities together.",
  },
}


const ContactPage = () => {
  return (
    <div className='bg-gray-100/20 min-h-screen'>
        <ContactLayout />
    </div>
  )
}

export default ContactPage