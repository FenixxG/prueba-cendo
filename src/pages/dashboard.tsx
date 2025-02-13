"use client"

import { useState } from "react"
import Sidebar  from "@/layout/AdminLayout/Sidebar/Sidebar"
import { IoMenu } from "react-icons/io5";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isShow={isSidebarOpen} isShowMd={true} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <IoMenu size={24} />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-600">Bienvenido al sistema CENDO. Selecciona una opción del menú para comenzar.</p>
          </div>
        </main>
      </div>
    </div>
  )
}

