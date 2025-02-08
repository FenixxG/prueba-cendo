"use client"

import { useState, type FormEvent } from "react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaUser, FaLock } from "react-icons/fa";
import { SlPlane } from "react-icons/sl";

interface LoginForm {
    username: string
    password: string
}

export default function Login() {
    const router = useRouter()
    const [formData, setFormData] = useState<LoginForm>({
        username: "",
        password: "",
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Aquí iría la lógica de autenticación
            await new Promise((resolve) => setTimeout(resolve, 1000))
            router.push("/dashboard")
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Head>
                <title>CENDO - Iniciar Sesión</title>
            </Head>
            <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
                <div className="w-full max-w-5xl flex rounded-lg overflow-hidden shadow-xl">
                    {/* Columna izquierda - Logo */}
                    <div className="hidden md:flex md:w-[45%] bg-[#1a1a2e] items-center justify-center p-12">
                        <Image
                            src="/assets/img/palmerola-logo.png"
                            alt="Palmerola International Airport Logo"
                            width={400}
                            height={150}
                            priority
                            className="max-w-full h-auto"
                        />
                    </div>

                    {/* Columna derecha - Formulario */}
                    <div className="w-full md:w-[55%] bg-white p-12">
                        <div className="max-w-md mx-auto">
                            <h1 className="text-[2rem] font-semibold text-[#1a1a2e] mb-2">Iniciar Sesión</h1>
                            <p className="text-gray-500 mb-8">Inicia sesión con tu cuenta</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="text"
                                            placeholder="Usuario"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                        <input
                                            type="password"
                                            placeholder="Contraseña"
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group w-full bg-[#1a1a2e] text-white py-3 px-4 rounded-md hover:bg-[#2a2a3e] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            "Iniciando sesión..."
                                        ) : (
                                            <>
                                                Iniciar Sesión
                                                <SlPlane className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

