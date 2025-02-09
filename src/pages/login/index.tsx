"use client"

import { useState, type FormEvent } from "react"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FaUser, FaLock } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff  } from "react-icons/io";
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
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            // Aquí iría la lógica de autenticación
            await new Promise((resolve) => setTimeout(resolve, 1000))
            router.push("/dashboard")
        } catch (err) {
            console.error(err)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div>
            <Head>
                <title>CENDO</title>
            </Head>
            <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
                <div className="w-full max-w-3xl flex rounded-lg overflow-hidden shadow-xl">
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
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1a1a2e] h-5 w-5" />
                                        <input
                                            type="email"
                                            placeholder="Usuario"
                                            required
                                            className="text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1a1a2e] h-5 w-5" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Contraseña"
                                            required
                                            className="text-black w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            {showPassword ? <IoMdEyeOff className="h-5 w-5" /> : <IoMdEye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="group w-full bg-[#1a1a2e] text-white py-3 px-4 rounded-md hover:bg-[#2a2a3e] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Iniciar Sesión
                                        <SlPlane className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

