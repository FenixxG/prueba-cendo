"use client"

import { useState } from "react"
import { Menu, User, LogOut } from "lucide-react"

interface HeaderProps {
    username: string
    onToggleSidebar: () => void
}

export function Header({ username, onToggleSidebar }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                    >
                        <User size={20} />
                        <span>{username}</span>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <button
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => {
                                    // Implementar lógica de cierre de sesión aquí
                                    console.log("Cerrar sesión")
                                }}
                            >
                                <LogOut size={16} className="inline mr-2" />
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

