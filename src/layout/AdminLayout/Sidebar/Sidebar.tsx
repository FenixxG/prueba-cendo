// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import React, { useEffect, useState } from 'react';
// import classNames from 'classnames';
// import { Button } from 'react-bootstrap';
// import SidebarNav from './SidebarNav';
// import Image from 'next/image';
// import { useRouter } from 'next/router';

// export default function Sidebar(props: { isShow: boolean; isShowMd: boolean }) {
//   const { isShow, isShowMd } = props;
//   const [isNarrow, setIsNarrow] = useState(false);

//   const router = useRouter();

//   const toggleIsNarrow = () => {
//     const newValue = !isNarrow;
//     localStorage.setItem('isNarrow', newValue ? 'true' : 'false');
//     setIsNarrow(newValue);
//   };

//   // On first time load only
//   useEffect(() => {
//     if (localStorage.getItem('isNarrow')) {
//       setIsNarrow(localStorage.getItem('isNarrow') === 'true');
//     }
//   }, [setIsNarrow]);

//   return (
//     <div
//       className={classNames('sidebar d-flex flex-column position-fixed h-100', {
//         'sidebar-narrow': isNarrow,
//         show: isShow,
//         'md-hide': !isShowMd,
//       })}
//       id='sidebar'>
//       <div className="sidebar-brand d-none d-md-flex align-items-center justify-content-center">
//       <Image
//               width={200}
//               height={100}
//               className="rounded-circle"
//               src="/assets/img/logo_pia_blanco.png"
//               alt="user@email.com"
//             />
//       </div>

//       <div className='sidebar-nav flex-fill'>
//         <SidebarNav />
//       </div>

//       <Button
//         variant="link"
//         className="sidebar-toggler d-none d-md-inline-block rounded-0 text-end pe-4 fw-bold shadow-none"
//         onClick={toggleIsNarrow}
//         type="button"
//         aria-label="sidebar toggler"
//       >
//         <FontAwesomeIcon className="sidebar-toggler-chevron" icon={faAngleLeft} fontSize={24} />
//       </Button>
//     </div>
//   )
// }

// export const SidebarOverlay = (props: { isShowSidebar: boolean; toggleSidebar: () => void }) => {
//   const { isShowSidebar, toggleSidebar } = props;

//   return (
//     <div
//       tabIndex={-1}
//       aria-hidden
//       className={classNames('sidebar-overlay position-fixed top-0 bg-dark w-100 h-100 opacity-50', {
//         'd-none': !isShowSidebar,
//       })}
//       onClick={toggleSidebar}
//     />
//   );
// };


// TODO EN UNO

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
// import {
//   faAngleLeft,
//   faChevronUp,
//   faFile,
//   faUserPlus,
//   faFileClipboard,
//   faFileUpload,
// } from '@fortawesome/free-solid-svg-icons';
// import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
// import { Accordion, AccordionContext, Button, Nav, useAccordionButton } from 'react-bootstrap';
// import classNames from 'classnames';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/router';

// // Componente principal del Sidebar
// export default function Sidebar(props: { isShow: boolean; isShowMd: boolean }) {
//   const { isShow, isShowMd } = props;
//   const [isNarrow, setIsNarrow] = useState(false);
//   const router = useRouter();

//   const toggleIsNarrow = () => {
//     const newValue = !isNarrow;
//     localStorage.setItem('isNarrow', newValue ? 'true' : 'false');
//     setIsNarrow(newValue);
//   };

//   useEffect(() => {
//     if (localStorage.getItem('isNarrow')) {
//       setIsNarrow(localStorage.getItem('isNarrow') === 'true');
//     }
//   }, [setIsNarrow]);

//   return (
//     <div
//       className={classNames('sidebar d-flex flex-column position-fixed h-100', {
//         'sidebar-narrow': isNarrow,
//         show: isShow,
//         'md-hide': !isShowMd,
//       })}
//       id='sidebar'>

//       <div className='sidebar-nav flex-fill'>
//         <SidebarNavContent />
//       </div>

//       <Button
//         variant="link"
//         className="sidebar-toggler d-none d-md-inline-block rounded-0 text-end pe-4 fw-bold shadow-none"
//         onClick={toggleIsNarrow}
//         type="button"
//         aria-label="sidebar toggler"
//       >
//         <FontAwesomeIcon className="sidebar-toggler-chevron" icon={faAngleLeft} fontSize={24} />
//       </Button>
//     </div>
//   )
// }

// // Componente Overlay
// export const SidebarOverlay = (props: { isShowSidebar: boolean; toggleSidebar: () => void }) => {
//   const { isShowSidebar, toggleSidebar } = props;

//   return (
//     <div
//       tabIndex={-1}
//       aria-hidden
//       className={classNames('sidebar-overlay position-fixed top-0 bg-dark w-100 h-100 opacity-50', {
//         'd-none': !isShowSidebar,
//       })}
//       onClick={toggleSidebar}
//     />
//   );
// };

// // Componentes de navegación
// type SidebarNavItemProps = {
//   href: string;
//   icon?: IconDefinition;
// } & PropsWithChildren;

// const SidebarNavItem = (props: SidebarNavItemProps) => {
//   const { icon, children, href } = props;

//   return (
//     <Nav.Item>
//       <Link href={href} passHref legacyBehavior>
//         <Nav.Link className='px-3 py-2 d-flex align-items-center'>
//           {icon ? <FontAwesomeIcon className='nav-icon ms-n3' icon={icon} /> : <span className='nav-icon ms-n3' />}
//           {children}
//         </Nav.Link>
//       </Link>
//     </Nav.Item>
//   );
// };

// const SidebarNavTitle = (props: PropsWithChildren) => {
//   const { children } = props;
//   return <li className='nav-title px-3 py-2 mt-3 text-uppercase fw-bold'>{children}</li>;
// };

// type SidebarNavGroupToggleProps = {
//   eventKey: string;
//   icon: IconDefinition;
//   setIsShow: (isShow: boolean) => void;
// } & PropsWithChildren;

// const SidebarNavGroupToggle = (props: SidebarNavGroupToggleProps) => {
//   const { activeEventKey } = useContext(AccordionContext);
//   const { eventKey, icon, children, setIsShow } = props;
//   const decoratedOnClick = useAccordionButton(eventKey);
//   const isCurrentEventKey = activeEventKey === eventKey;

//   useEffect(() => {
//     setIsShow(activeEventKey === eventKey);
//   }, [activeEventKey, eventKey, setIsShow]);

//   return (
//     <Button
//       variant='link'
//       type='button'
//       className={classNames('rounded-0 nav-link px-3 py-2 d-flex align-items-center flex-fill w-100 shadow-none', {
//         collapsed: !isCurrentEventKey,
//       })}
//       onClick={decoratedOnClick}>
//       <FontAwesomeIcon className='nav-icon ms-n3' icon={icon} />
//       {children}
//       <div className='nav-chevron ms-auto text-end'>
//         <FontAwesomeIcon size='xs' icon={faChevronUp} />
//       </div>
//     </Button>
//   );
// };

// type SidebarNavGroupProps = {
//   toggleIcon: IconDefinition;
//   toggleText: string;
// } & PropsWithChildren;

// const SidebarNavGroup = (props: SidebarNavGroupProps) => {
//   const { toggleIcon, toggleText, children } = props;
//   const [isShow, setIsShow] = useState(false);

//   return (
//     <Accordion as='li' bsPrefix='nav-group' className={classNames({ show: isShow })}>
//       <SidebarNavGroupToggle icon={toggleIcon} eventKey='0' setIsShow={setIsShow}>
//         {toggleText}
//       </SidebarNavGroupToggle>
//       <Accordion.Collapse eventKey='0'>
//         <ul className='nav-group-items list-unstyled'>{children}</ul>
//       </Accordion.Collapse>
//     </Accordion>
//   );
// };

// // Contenido principal de navegación
// const SidebarNavContent = () => {
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const role = localStorage.getItem('role');
//       setUserRole(role || '');
//     }
//   }, []);

//   return (
//     <ul className='list-unstyled'>
//       <div className='d-flex justify-content-center align-items-center'>
//         <Link href='/home'>
//           <Image
//             className='rounded-circle'
//             style={{ width: '100px', height: '100px', position: 'relative' }}
//             layout="responsive"
//             height={100}
//             width={200}
//             src='/assets/img/logo_pia_blanco.png'
//             alt='user@email.com'
//           />
//         </Link>
//       </div>

//       <ul className='list-unstyled'>
//         {userRole === 'ADM' && (
//           <>
//             <SidebarNavItem icon={faFile} href='/docspendientes'>
//               Creación de Registro
//             </SidebarNavItem>
//             <SidebarNavItem icon={faFileClipboard} href='/tipodoc'>
//               Tipo de Formato
//             </SidebarNavItem>
//             <SidebarNavItem icon={faUserPlus} href='/aggusuario'>
//               Agregar Usuario
//             </SidebarNavItem>
//             <SidebarNavItem icon={faFileUpload} href='/historico'>
//               Archivos Cargados
//             </SidebarNavItem>
//           </>
//         )}
//         {userRole === 'AUG' && (
//           <SidebarNavItem icon={faFileUpload} href='/historico'>
//             Archivos Cargados
//           </SidebarNavItem>
//         )}
//         {userRole !== 'ADM' && userRole !== 'AUG' && (
//           <>
//             <SidebarNavItem icon={faFile} href='/docspendientes'>
//               Creación de Registro
//             </SidebarNavItem>
//             <SidebarNavItem icon={faFileClipboard} href='/tipodoc'>
//               Tipo de Formato
//             </SidebarNavItem>
//             <SidebarNavItem icon={faFileUpload} href='/historico'>
//               Archivos Cargados
//             </SidebarNavItem>
//           </>
//         )}
//       </ul>
//     </ul>
//   );
// };

// TAILWIND
import React, { PropsWithChildren, useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { 
  FaAngleLeft, 
  FaChevronUp, 
  FaFile, 
  FaUserPlus, 
  FaFileAlt, 
  FaUpload,
  FaHome
} from 'react-icons/fa';

export default function Sidebar(props: { isShow: boolean; isShowMd: boolean }) {
  const { isShow, isShowMd } = props;
  const [isNarrow, setIsNarrow] = useState(false);
  const router = useRouter();

  const toggleIsNarrow = () => {
    const newValue = !isNarrow;
    localStorage.setItem('isNarrow', newValue ? 'true' : 'false');
    setIsNarrow(newValue);
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('isNarrow');
    if (storedValue) setIsNarrow(storedValue === 'true');
  }, []);

  return (
    <div className={classNames(
      'flex flex-col fixed h-full bg-gray-800 text-white transition-all duration-300 z-30',
      {
        'w-64': !isNarrow,
        'w-20': isNarrow,
        'left-0': isShow,
        '-left-full': !isShow,
        'md:left-0': isShowMd,
        'md:-left-full': !isShowMd
      }
    )}>
      <div className="flex-1 overflow-y-auto">
        <SidebarNavContent isNarrow={isNarrow} />
      </div>

      <button
        onClick={toggleIsNarrow}
        className="hidden md:inline-block absolute -right-5 top-1/2 bg-gray-800 p-2 rounded-r-full hover:bg-gray-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <FaAngleLeft className={`text-xl transition-transform ${isNarrow ? 'rotate-180' : ''}`} />
      </button>
    </div>
  )
}

export const SidebarOverlay = (props: { isShowSidebar: boolean; toggleSidebar: () => void }) => {
  return (
    <div
      onClick={props.toggleSidebar}
      className={classNames(
        'fixed inset-0 bg-black/50 z-20 transition-opacity',
        { 'hidden opacity-0': !props.isShowSidebar, 'opacity-100': props.isShowSidebar }
      )}
    />
  );
};

type SidebarNavItemProps = {
  href: string;
  icon?: React.ReactNode;
} & PropsWithChildren;

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const { icon, children, href } = props;
  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <li>
      <Link href={href} className={classNames(
        'flex items-center px-4 py-3 hover:bg-gray-700 transition-colors',
        { 'bg-gray-900': isActive }
      )}>
        {icon && <span className="mr-4 text-xl">{icon}</span>}
        <span className="whitespace-nowrap">{children}</span>
      </Link>
    </li>
  );
};

type SidebarNavGroupProps = {
  icon: React.ReactNode;
  title: string;
} & PropsWithChildren;

const SidebarNavGroup = (props: SidebarNavGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <li>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center px-4 py-3 hover:bg-gray-700 transition-colors"
      >
        <span className="mr-4 text-xl">{props.icon}</span>
        <span className="flex-1 text-left whitespace-nowrap">{props.title}</span>
        <FaChevronUp className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <ul className={classNames(
        'overflow-hidden transition-all',
        { 'max-h-0': !isOpen, 'max-h-96': isOpen }
      )}>
        {props.children}
      </ul>
    </li>
  );
};

const SidebarNavContent = ({ isNarrow }: { isNarrow: boolean }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserRole(localStorage.getItem('role') || '');
    }
  }, []);

  return (
    <ul className="py-4">
      <li className="mb-8 px-4">
        <Link href="/home" className="flex justify-center">
          <Image
            src="/assets/img/logo_pia_blanco.png"
            alt="Logo"
            width={isNarrow ? 60 : 100}
            height={isNarrow ? 60 : 100}
            className="rounded-full transition-all"
          />
        </Link>
      </li>

      <div className="space-y-2">
        {userRole === 'ADM' && (
          <>
            <SidebarNavItem href="/docspendientes" icon={<FaFile />}>
              Creación de Registro
            </SidebarNavItem>
            <SidebarNavItem href="/tipodoc" icon={<FaFileAlt />}>
              Tipo de Formato
            </SidebarNavItem>
            <SidebarNavItem href="/aggusuario" icon={<FaUserPlus />}>
              Agregar Usuario
            </SidebarNavItem>
            <SidebarNavItem href="/historico" icon={<FaUpload />}>
              Archivos Cargados
            </SidebarNavItem>
          </>
        )}

        {userRole === 'AUG' && (
          <SidebarNavItem href="/historico" icon={<FaUpload />}>
            Archivos Cargados
          </SidebarNavItem>
        )}

        {!['ADM', 'AUG'].includes(userRole) && (
          <>
            <SidebarNavItem href="/docspendientes" icon={<FaFile />}>
              Creación de Registro
            </SidebarNavItem>
            <SidebarNavItem href="/tipodoc" icon={<FaFileAlt />}>
              Tipo de Formato
            </SidebarNavItem>
            <SidebarNavItem href="/historico" icon={<FaUpload />}>
              Archivos Cargados
            </SidebarNavItem>
          </>
        )}
      </div>
    </ul>
  );
};