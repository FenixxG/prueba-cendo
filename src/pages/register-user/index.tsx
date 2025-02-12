"use client"

import { useState } from "react"
import { FaSearch, FaCalendarAlt, FaPlusCircle, FaEdit, FaTrashAlt } from "react-icons/fa"
import { FiFileText, FiRefreshCw } from "react-icons/fi";
import { Sidebar } from "@/layout/AdminLayout/Sidebar"
import { Header } from "@/layout/AdminLayout/Header"
import { Footer } from "@/layout/AdminLayout/Footer"

interface Document {
    codigo: string
    creadoEl: string
    creadoPor: string
    tipoDocumento: string
    fechaHoraInicio: string
    fechaHoraFin: string
    departamento: string
    caf: string
    tomo: string
    cia: string
}

const documentos: Document[] = [
    {
        codigo: "336",
        creadoEl: "24/06/2024 14:53:49",
        creadoPor: "elvis.ordones@palmerola-airport.com",
        tipoDocumento: "FR-FAN-003 - Captura de fauna",
        fechaHoraInicio: "24/06/2024 14:53:00",
        fechaHoraFin: "24/06/2024 14:53:00",
        departamento: "Control de Fauna",
        caf: "001",
        tomo: "1",
        cia: "PAL",
    },
    {
        codigo: "335",
        creadoEl: "19/06/2024 15:47:23",
        creadoPor: "elvis.ordones@palmerola-airport.com",
        tipoDocumento: "FR-SMS-003 - Informe de la investigación de sucesos / incidentes",
        fechaHoraInicio: "19/06/2024 15:47:00",
        fechaHoraFin: "19/06/2024 15:47:00",
        departamento: "SMS",
        caf: "002",
        tomo: "1",
        cia: "PAL",
    },
]

export default function RegisterUser() {
    const [searchTerm, setSearchTerm] = useState("")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const username = "John Doe" // Este valor debería venir de tu sistema de autenticación

    const handleClearDates = () => {
        setDateFrom("")
        setDateTo("")
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header username={username} onToggleSidebar={() => { }} />
                <main className="flex-1 overflow-y-auto p-4">
                    <div className="max-w-7xl mx-auto space-y-4">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-900">Documentos Pendientes por aprobar</h1>
                                <button className="bg-[#1a1a2e] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#2a2a3e] transition-colors">
                                    <FaPlusCircle  size={20} />
                                    Registrar Nuevo Documento
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <FaSearch  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Fecha Inicio:</span>
                                        <div className="relative">
                                            <FaCalendarAlt 
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={20}
                                            />
                                            <input
                                                type="date"
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={dateFrom}
                                                onChange={(e) => setDateFrom(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Hasta:</span>
                                        <div className="relative">
                                            <FaCalendarAlt 
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={20}
                                            />
                                            <input
                                                type="date"
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                value={dateTo}
                                                onChange={(e) => setDateTo(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClearDates}
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                        title="Limpiar fechas"
                                    >
                                        <FiRefreshCw  size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Código
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Creado el
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Creado por
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Tipo de documento
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Fecha y Hora Inicio
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Fecha y Hora fin
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Departamento
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                CAF
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Tomo
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                CIA
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {documentos.map((doc, index) => (
                                            <tr key={doc.codigo} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{doc.codigo}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{doc.creadoEl}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{doc.creadoPor}</td>
                                                <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{doc.tipoDocumento}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{doc.fechaHoraInicio}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{doc.fechaHoraFin}</td>
                                                <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{doc.departamento}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{doc.caf}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{doc.tomo}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{doc.cia}</td>
                                                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <button className="text-blue-600 hover:text-blue-800">
                                                            <FaEdit size={18} />
                                                        </button>
                                                        <button className="text-gray-600 hover:text-gray-800">
                                                            <FiFileText size={18} />
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-800">
                                                            <FaTrashAlt  size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}

