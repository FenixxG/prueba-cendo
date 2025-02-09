export function Footer() {
    return (
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} CENDO - Palmerola International Airport. Todos los derechos reservados.
                </p>
                <p className="text-sm text-gray-500">Versión 1.0.0</p>
            </div>
        </footer>
    )
}

