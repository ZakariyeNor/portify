import React from 'react'
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    label?: string
    onClick?: () => void
    variant?: 'primary' | 'success' | 'info' | 'danger' | 'secondary'
    className?: string
    type?: 'submit' |'button' |'reset'
}

const Button = ({
    label, onClick, variant = 'primary', className, type = 'button'
}: ButtonProps) => {

    const baseStyles = 
            "px-4 py-2 rounded-lg font-medium transition-all active:scale-95";
        
        const variants: Record<string, string> = {
            primary: "bg-blue-600 hover:bg-blue-700 hover:bg-blue-500 text-white cursor-pointer",
            secondary: "bg-slate-200/80 text-black hover:bg-gray-400 font-bold cursor-pointer",
            danger: "bg-red-600 hover:bg-red-700 text-white cursor-pointer",
            success: "bg-green-600 hover:bg-green-700 text-white cursor-pointer",
        };

        const merged = twMerge(
            baseStyles, variants[variant], className
        )

  return (
    <button
        type={type}
        onClick={onClick}
        className={merged}
    >
        {label}
    </button>
  )
}

export default Button