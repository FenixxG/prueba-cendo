"use client"

import { NextPage } from "next";
import { FaUser, FaLock } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { SlPlane } from "react-icons/sl";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Login: NextPage = () => {
    const [hovered, setHovered] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const router = useRouter();

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if (!validateEmail(formData.username)) {
            setEmailError("Correo electrónico inválido");
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error("Usuario o contraseña incorrecta");
                return;
            }

            toast.success("Inicio de Sesión exitoso");
            localStorage.setItem("pia_token", data.accessToken);
            localStorage.setItem("user_id", data.userInfo.sub);
            localStorage.setItem("email", data.userInfo.email);
            localStorage.setItem("role", data.userInfo.role);
            localStorage.setItem("department", data.userInfo.department);

            setTimeout(() => {
                router.push("/home");
            }, 2000);

        } catch (error) {
            toast.error("Error en la conexión");
            console.error("Error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Head>
                <title>CENDO - Iniciar Sesión</title>
            </Head>

            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="flex flex-col sm:flex-row items-center bg-gray-800 ring-2 ring-blue-500 p-8 rounded-2xl shadow-xl">
                    {/* Columna Izquierda - Logo */}
                    <div className="hidden sm:flex items-center justify-center pr-8 border-r-2 border-blue-500 h-96">
                        <Image
                            src="/assets/img/logo_pia_blanco.png"
                            alt="Palmerola International Airport Logo"
                            width={300}
                            height={150}
                            className="h-auto"
                        />
                    </div>

                    {/* Columna Derecha - Formulario */}
                    <div className="sm:pl-8">
                        <h1 className="text-3xl font-bold text-white mb-4">Iniciar Sesión</h1>

                        <form onSubmit={submitHandler} className="space-y-6">
                            {/* Input Email */}
                            <div>
                                <label className="text-white block mb-2">Usuario</label>
                                <div className="relative">
                                    <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
                                    <input
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.username}
                                        onChange={(e) => {
                                            setFormData({ ...formData, username: e.target.value });
                                            setEmailError("");
                                        }}
                                        required
                                    />
                                </div>
                                {emailError && (
                                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                                )}
                            </div>

                            {/* Input Contraseña */}
                            <div>
                                <label className="text-white block mb-2">Contraseña</label>
                                <div className="relative">
                                    <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-500 hover:text-blue-400"
                                    >
                                        {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Botón de Submit */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                                onMouseOver={() => setHovered(true)}
                                onMouseOut={() => setHovered(false)}
                            >
                                {submitting ? "Cargando..." : "Iniciar Sesión"}
                                <SlPlane className={`transition-transform ${hovered ? "translate-x-1 -translate-y-1" : ""}`} />
                            </button>
                        </form>
                    </div>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </>
    );
};

export default Login;