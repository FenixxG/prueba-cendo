// Sidebar.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import {
  FaAngleLeft,
  FaChevronUp,
  FaFile,
  FaUserPlus,
  FaClipboardList,
  FaFileUpload,
} from 'react-icons/fa';

/* ======================================================
   Hook para manejar valores en el localStorage
   ====================================================== */
function useLocalStorage(key: string, initialValue: string = ''): [string, (val: string) => void] {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value !== null) {
      setStoredValue(value);
    }
  }, [key]);

  const setValue = (val: string) => {
    localStorage.setItem(key, val);
    setStoredValue(val);
  };

  return [storedValue, setValue];
}

/* ======================================================
   Configuración de navegación según el rol del usuario
   ====================================================== */
type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

const navConfig: Record<string, NavItem[]> = {
  ADM: [
    { label: 'Creación de Registro', icon: <FaFile />, href: '/docspendientes' },
    { label: 'Tipo de Formato', icon: <FaClipboardList />, href: '/tipodoc' },
    { label: 'Agregar Usuario', icon: <FaUserPlus />, href: '/aggusuario' },
    { label: 'Archivos Cargados', icon: <FaFileUpload />, href: '/historico' },
  ],
  AUG: [
    { label: 'Archivos Cargados', icon: <FaFileUpload />, href: '/historico' },
  ],
  DEFAULT: [
    { label: 'Creación de Registro', icon: <FaFile />, href: '/docspendientes' },
    { label: 'Tipo de Formato', icon: <FaClipboardList />, href: '/tipodoc' },
    { label: 'Archivos Cargados', icon: <FaFileUpload />, href: '/historico' },
  ],
};

/* ======================================================
   Componente para un item de navegación
   ====================================================== */
interface SidebarNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ href, icon, label }) => (
  <li>
    <Link href={href}>
      <a className="flex items-center px-3 py-2 hover:bg-gray-700 transition-colors">
        <span className="mr-2 text-lg">{icon}</span>
        <span>{label}</span>
      </a>
    </Link>
  </li>
);

/* ======================================================
   Componente opcional para grupos de navegación (Accordion)
   ====================================================== */
interface SidebarNavGroupProps {
  toggleIcon: React.ReactNode;
  toggleLabel: string;
  children: React.ReactNode;
}

const SidebarNavGroup: React.FC<SidebarNavGroupProps> = ({ toggleIcon, toggleLabel, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center">
          <span className="mr-2 text-lg">{toggleIcon}</span>
          <span>{toggleLabel}</span>
        </div>
        <FaChevronUp
          className={classNames('transition-transform duration-200', {
            'rotate-0': isOpen,
            'rotate-180': !isOpen,
          })}
        />
      </button>
      {isOpen && <ul className="pl-4">{children}</ul>}
    </li>
  );
};

/* ======================================================
   Componente de navegación lateral
   ====================================================== */
const SidebarNav: React.FC = () => {
  // Obtenemos el rol del usuario desde localStorage (si no existe, se usa "DEFAULT")
  const [userRole] = useLocalStorage('role', 'DEFAULT');
  const items = navConfig[userRole] || navConfig['DEFAULT'];

  return (
    <nav>
      <ul className="space-y-1">
        {/* Logo centralizado */}
        <li className="flex justify-center mb-3">
          <Link href="/home">
            <a>
              <Image
                className="rounded-full"
                src="/assets/img/logo_pia_blanco.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </a>
          </Link>
        </li>
        {/* Renderizado de items de navegación */}
        {items.map((item) => (
          <SidebarNavItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
        ))}
        {/* Ejemplo de grupo de navegación (opcional)
        <SidebarNavGroup toggleIcon={<FaFile />} toggleLabel="Grupo de Ejemplo">
          <SidebarNavItem href="/subitem1" icon={<FaFile />} label="Subitem 1" />
          <SidebarNavItem href="/subitem2" icon={<FaClipboardList />} label="Subitem 2" />
        </SidebarNavGroup>
        */}
      </ul>
    </nav>
  );
};

/* ======================================================
   Componente principal del Sidebar
   ====================================================== */
interface SidebarProps {
  isShow: boolean;
  isShowMd: boolean;
}

export default function Sidebar({ isShow, isShowMd }: SidebarProps) {
  const router = useRouter();
  const [isNarrow, setIsNarrow] = useLocalStorage('isNarrow', 'false');
  const narrow = isNarrow === 'true';

  const toggleIsNarrow = () => {
    setIsNarrow(narrow ? 'false' : 'true');
  };

  return (
    <aside
      className={classNames(
        "fixed top-0 left-0 h-full bg-gray-800 text-white flex flex-col transition-all duration-300",
        {
          // Ejemplo de ancho: ajusta según tus necesidades
          "w-20": narrow,
          "w-64": !narrow,
          // Control de visibilidad
          "hidden": !isShow,
          "md:hidden": !isShowMd,
        }
      )}
      id="sidebar"
    >
      <div className="flex-grow overflow-y-auto">
        <SidebarNav />
      </div>
      <button
        type="button"
        onClick={toggleIsNarrow}
        className="hidden md:block text-right pr-4 font-bold py-2 hover:bg-gray-700 transition-colors"
        aria-label="Toggle sidebar width"
      >
        <FaAngleLeft className="text-xl" />
      </button>
    </aside>
  );
}

/* ======================================================
   Componente Overlay del Sidebar
   ====================================================== */
interface SidebarOverlayProps {
  isShowSidebar: boolean;
  toggleSidebar: () => void;
}

export const SidebarOverlay: React.FC<SidebarOverlayProps> = ({ isShowSidebar, toggleSidebar }) => (
  <div
    className={classNames(
      "fixed inset-0 bg-black opacity-50 transition-opacity",
      {
        "block": isShowSidebar,
        "hidden": !isShowSidebar,
      }
    )}
    onClick={toggleSidebar}
  />
);
