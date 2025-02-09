"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { UserPlus, FileText, CheckSquare, Upload, Menu } from "lucide-react"

const menuItems = [
    { icon: UserPlus, text: "Registrar Usuario", href: "/register-user" },
    { icon: FileText, text: "Documentos Pendientes", href: "/pending-documents" },
    { icon: CheckSquare, text: "Documentos Aprobados", href: "/approved-documents" },
    { icon: Upload, text: "Subir Documentos", href: "/upload-documents" },
]

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div
            className={`
        bg-[#1a1a2e] text-white h-screen
        ${isOpen ? "w-64" : "w-20"}
        transition-all duration-300 ease-in-out
        flex flex-col
      `}
        >
            <div className="flex justify-between items-center p-4">
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "w-40" : "w-0"}`}>
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/XPLLOGO-BXvX0flISRBU9JUdjWJGkjoHc0HVoQ.png"
                        alt="Palmerola International Airport Logo"
                        width={150}
                        height={56}
                        priority
                        className="max-w-full h-auto"
                    />
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-md hover:bg-[#2a2a3e] transition-colors duration-200"
                    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    <Menu size={24} />
                </button>
            </div>
            <nav className="mt-8 flex-grow">
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className="mb-4">
                            <Link
                                href={item.href}
                                className="flex items-center px-4 py-2 hover:bg-[#2a2a3e] transition-colors duration-200"
                            >
                                <item.icon
                                    size={24}
                                    className={`${isOpen ? "mr-4" : "mx-auto"} transition-all duration-300 ease-in-out`}
                                />
                                <span
                                    className={`
                    whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}
                  `}
                                >
                                    {item.text}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

