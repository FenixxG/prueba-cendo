// import React, { useState, useEffect, ChangeEvent, FormEvent, use } from 'react';
// import { Col, Row, Button } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import TableHistorico from './index';
// import IconSvg from '../../../public/broom-solid.png'
// import TableDocsPendientes from '@components/TableDocsPendientes';

// interface FechaComponentProps {
//     onFilterChange: (jsonData: any[]) => void;
//     parametro: string;
//     firstDateFilterF: string;
//     rol: string;
//     department: string;
//     setFirstDate: React.Dispatch<React.SetStateAction<string>>;
//     lasDateF: string;
//     setLastDateF: React.Dispatch<React.SetStateAction<string>>;
//     onClearFilter: () => void;
//     onPageReset: () => void;
//     email: string;

// }


// export const FechaComponent: React.FC<FechaComponentProps> = ({ parametro, onFilterChange, setFirstDate, lasDateF, setLastDateF, onClearFilter, onPageReset, rol, department, email }) => {

//     const [firstDateFilter, setFirstDateFilter] = useState<string>('');
//     const [lastDate, setLastDate] = useState<string>('');
//     const [filterDateValue, setFilterDateValue] = useState<string>('');
//     const [filterLastDateValue, setfilterLastDateValue] = useState<string>('');
//     const [shouldUpdate, setShouldUpdate] = useState(true);
//     const [shouldUpdateStartDate, setShouldUpdateStartDate] = useState(true);
//     const [shouldUpdateEndDate, setShouldUpdateEndDate] = useState(true);
//     const [isDateComponentVisible, setIsDateComponentVisible] = useState(false);
//     const [searchValue, setSearchValue] = useState<string>('');
//     const [isHovered, setIsHovered] = useState(false);


//     const [filteredJsonData, setFilteredJsonData] = useState<any[]>([]);


//     const handleFirstDateFilter = (event: ChangeEvent<HTMLInputElement>) => {
//         // const formattedDate: string = dateObject.toISOString().slice(0, 10);
//         try {

//             const rawValue: string = event.target.value;
//             const formattedDateTime: string = new Date(rawValue).toISOString().slice(0, 10);
//             setFirstDate(formattedDateTime); // Actualizar el estado con la nueva fecha seleccionada
//             setFirstDateFilter(formattedDateTime); // Actualizar el estado con la nueva fecha seleccionada
//             setFilterDateValue(formattedDateTime);
//             setShouldUpdate(true);
//             handleDatePage();
//         } catch (error) {
//             console.log(error);
//         }
//     };


//     const handleLastDateFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
//         try {
//             const rawValue: string = event.target.value;
//             const formattedDateTime: string = new Date(rawValue).toISOString().slice(0, 10);
//             setLastDateF(formattedDateTime);
//             setLastDate(formattedDateTime);
//             setfilterLastDateValue(formattedDateTime);
//             setShouldUpdate(true);
//             handleDatePage();

//         } catch (error) {
//             console.log(error);
//         }



//     };

//     const handleDatePage = () => {
//         onPageReset();
//     }



//     // const handleFilterChange = async() => {
//     //   try {
//     //     const responseFilter = await fetch(`${process.env.BASE_URL}files/filter/dynamic?param=${filterDateValue}`);
//     //     if (!responseFilter.ok) {
//     //         throw new Error(`Hubo un problema al obtener los datos. Código de estado: ${responseFilter.status}`);
//     //     }
//     //     const jsonData = await responseFilter.json();
//     //     onFilterChange(jsonData); // Llamar a la función de devolución de llamada
//     // } catch (error) {
//     //     console.error("Hubo un error al obtener los datos:", error);
//     // } // Step 4
//     // };
//     useEffect(() => {
//         const fetchDataWithDateSearch = async () => {
//             try {
//                 if (filterDateValue.trim() !== '' && filterLastDateValue.trim() !== '') {
//                     const responseFilter = await fetch(`${process.env.BASE_URL}files/filter/duplex?status=${parametro}&role=${rol}&department=${department}&param1=${filterDateValue}&param2=${lasDateF}&user=${email}`);
//                     console.log("Respuesta recibida:", responseFilter);
//                     console.log('FECHA INICIO', filterDateValue);
//                     console.log('FECHA FINAL', lasDateF);
//                     console.log('PARAMETRO', parametro);

//                     if (!responseFilter.ok) {
//                         throw new Error(`Hubo un problema al obtener los datos. Código de estado: ${responseFilter.status}`);
//                     }

//                     const jsonData = await responseFilter.json();
//                     // Solo llamamos a onFilterChange si el jsonData es diferente al filtrado actual
//                     if (JSON.stringify(jsonData) !== JSON.stringify(filteredJsonData)) {
//                         setFilteredJsonData(jsonData);
//                         onFilterChange(jsonData);

//                     }

//                 }
//             } catch (error) {
//                 console.error("Hubo un error al obtener los datos:", error);
//             }
//         };


//         fetchDataWithDateSearch();
//     }, [filterDateValue, filterLastDateValue, onFilterChange, filteredJsonData, parametro, onPageReset]);




//     // Llama a la función de limpiar filtro en el componente padre



//     const handleClearButtonClick = () => {
//         setFirstDate('');
//         setLastDate('');
//         setFirstDateFilter('');


//         onClearFilter();
//         setFilterDateValue(' ');
//         // setfilterLastDateValue(' ');






//     };



//     return (
//         <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '20px' }}>
//             <Form.Group controlId="formFechaInicialFormato" style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
//                 <Form.Label style={{ fontWeight: 'bold', marginBottom: '3px', marginRight: '10px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Fecha Inicio: </Form.Label>
//                 <Form.Control style={{ marginBottom: '3px' }}
//                     type='date'
//                     value={firstDateFilter}
//                     onChange={handleFirstDateFilter}
//                 />
//             </Form.Group>

//             <Form.Group controlId="formFechaFinalFormato" style={{ display: 'flex', alignItems: 'center' }}>
//                 <Form.Label style={{ fontWeight: 'bold', marginBottom: '3px', marginRight: '10px', fontSize: '0.9rem', whiteSpace: 'nowrap' }}> Hasta: </Form.Label>
//                 <Form.Control style={{ marginBottom: '3px' }}
//                     type='date'
//                     value={lastDate}
//                     onChange={handleLastDateFilter}
//                     required
//                 />
//             </Form.Group>


//             <Button
//                 variant="secondary"
//                 onClick={handleClearButtonClick}
//                 onMouseOver={() => setIsHovered(true)}
//                 onMouseOut={() => setIsHovered(false)}
//                 style={{
//                     border: 'none',
//                     backgroundColor: isHovered ? '#e0e0e0' : 'white',
//                     marginLeft: '5px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '2px 8px',
//                     transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
//                 }}
//             >
//                 <img src={IconSvg.src} alt="Limpiar Campos" style={{ width: '20px', height: '20px' }} />
//             </Button>




//         </div>

//     );
// }

// export default FechaComponent;