// import DownloadButton from '@components/DownloadButton';
// import MyPagination from '@components/Pagination/Pagination';
// import { faEdit, faSearch, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useState, useEffect, ChangeEvent } from 'react';
// import { Button, ButtonGroup, Col, Form, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
// import Table from 'react-bootstrap/Table';
// import Swal from 'sweetalert2';
// import dotenv from 'dotenv';
// import FechaComponent from '@components/TableHistorico/fecha';
// dotenv.config();

// interface Format {
//     id: string;
//     name: string;
// }

// interface TableDocsPendientes {
//     page: number;
// }

// export const TableDocsPendientes: React.FC<TableDocsPendientes> = ({ page }) => {
//     const [userId, setUserId] = useState<number>(0);
//     const [data, setData] = useState<any[]>([]);
//     const [dataPerPage, setdataPerPage] = useState<number>(10);
//     const [currentPage, setcurrentPage] = useState<number>(1);
//     const [filterValue, setFilterValue] = useState<string>(''); // Step 1
//     const totalData = data.length;
//     const [showModal, setShowModal] = useState(false);
//     const [formats, setFormats] = useState<Format[]>([]);
//     const [selectedFormat, setSelectedFormat] = useState<string>('');
//     const [mostrarFechaComponent, setMostrarFechaComponent] = useState(false);
//     const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
//     const [airport, setAirport] = useState<string>('');
//     const [firstDate, setFirstDate] = useState<string>('');
//     const [lastDate, setLastDate] = useState<string>('');
//     const [showError, setShowError] = useState<boolean>(false);
//     const [firstDateFilter, setFirstDateFilter] = useState<string>('');
//     const [lastDateFilter, setLastDateFilter] = useState<string>('');

//     const role: string | null = typeof window !== 'undefined' ? localStorage.getItem('role') || ' ' : ' ';
//     const department: string | null = typeof window !== 'undefined' ? localStorage.getItem('department') || ' ' : ' ';
//     const email: string | null = typeof window !== 'undefined' ? localStorage.getItem('email') || ' ' : ' ';
//     const dateObj = new Date(firstDate);

//     const handleClearFilters = () => {
//         setFilterValue('');
//         setFirstDateFilter('');
//         setLastDateFilter('');
//     };

//     const resetPage = () => {
//         setcurrentPage(1);
//     }

//     const [formData, setFormData] = useState<any>({
//         // other form fields...
//         // creadoPor: '',
//         // tipoDocumento: '',
//         // description: '',
//         // caf: '',   // Add CAF field
//         // cna: '',   // Add CNA field
//         // cfa: '',   // Add CFA field
//     });

//     const lastIndex = currentPage * dataPerPage; //total de 10 (1 * 10 = 10)
//     const firstIndex = lastIndex - dataPerPage; //total de 0 (10 - 10 = 0)

//     const getToken = () => {
//         const token = localStorage.getItem('pia_token');
//         if (token) {
//             // Comprobar la expiración del token si tiene información de expiración (por ejemplo, con un timestamp)
//             // Si el token tiene información de expiración, puedes verificar si aún es válido
//             // Si el token no tiene información de expiración, puedes considerar que está siempre activo o implementar otra lógica de expiración

//             // Por ejemplo, supongamos que tu token tiene un campo 'expiresAt' que contiene la fecha de expiración en formato Unix timestamp
//             const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodifica y extrae la información del token
//             console.log(tokenData);
//             const expiresAt = tokenData.exp; // Suponiendo que existe un campo 'expiresAt' en tu token
//             const idUser = tokenData.sub;
//             setUserId(idUser);
//             // localStorage.setItem("idUser", idUser);
//             console.log('id DEL uSUARIO:', idUser);
//             console.log('id DEL uSUARIO con SET:', userId);

//             if (expiresAt) {
//                 const currentTimestamp = Math.floor(Date.now() / 1000); // Obtener el timestamp actual en segundos
//                 console.log('Tiempo actual: ', currentTimestamp);
//                 console.log('Tiempo vencimiento token: ', expiresAt);
//                 if (expiresAt < currentTimestamp) {
//                     // El token ha expirado
//                     localStorage.removeItem('pia_token'); // Eliminar el token expirado del localStorage
//                     return null; // Retornar null o manejar la expiración de otra manera
//                 }
//             }
//             return token; // Retornar el token si está presente y no ha expirado
//         } else {
//             return null; // Retornar null si el token no está presente en el localStorage
//         }
//     };

//     useEffect(() => {
//         const fetchDataWithSearch = async () => {
//             try {
//                 const role = localStorage.getItem('role');
//                 const department = localStorage.getItem('department');
//                 const email = localStorage.getItem('email');
//                 // console.log("Realizando solicitud a:", `http://10.120.1.68:191/api/files/filter/dynamic?param=${filterValue}&status=1`);
//                 const response = await fetch(`${process.env.BASE_URL}files/filter/duplex?param=${filterValue}&status=PENDIENTE&role=${role}&department=${department}&param1=${firstDateFilter}&param2=${lastDateFilter}&user=${email}`);
//                 if (!response.ok) {
//                     throw new Error(`Hubo un problema al obtener los datos. Código de estado: ${response.status}`);
//                 }
//                 const jsonData = await response.json();
//                 setData(jsonData);
//             } catch (error) {
//                 console.error('Hubo un error al obtener los datos:', error);
//             }
//         };

//         fetchDataWithSearch();
//     }, [filterValue, firstDateFilter, lastDateFilter]);

//     const handleFirstDate = (event: ChangeEvent<HTMLInputElement>) => {
//         const rawValue: string = event.target.value;
//         const date = new Date(rawValue);
//         date.setHours(date.getHours() - 6);
//         const formattedDateTime: string = date.toISOString().slice(0, 19).replace('T', ' ');
//         setFirstDate(formattedDateTime);

//         if (new Date(lastDate) < date) {
//             setLastDate(formattedDateTime);
//         }
//     };

//     const handleLastDate = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const rawValue: string = event.target.value;
//         const datelast = new Date(rawValue);
//         datelast.setHours(datelast.getHours() - 6);
//         const formattedDateTime: string = datelast.toISOString().slice(0, 19).replace('T', ' ');
//         setLastDate(formattedDateTime);

//         if (new Date(firstDate) > datelast) {
//             setFirstDate(formattedDateTime);
//         }
//     };

//     useEffect(() => {
//         try {
//             if (firstDate) {
//                 // Convertir la cadena de texto a objeto Date
//                 const [datePart, timePart] = firstDate.split(' ');

//                 // Comprobar si datePart y timePart están definidos
//                 if (datePart && timePart) {
//                     const [dayStr, monthStr, yearStr] = datePart.split('/');
//                     const [hoursStr, minutesStr, secondsStr] = timePart.split(':');

//                     const day = parseInt(dayStr);
//                     const month = parseInt(monthStr) - 1; // Restar 1 al mes porque en JavaScript los meses van de 0 a 11
//                     const year = parseInt(yearStr);
//                     const hours = parseInt(hoursStr) - 6;
//                     const minutes = parseInt(minutesStr);
//                     const seconds = parseInt(secondsStr);

//                     // Verificar si los valores de fecha y hora son números y válidos
//                     if (!isNaN(day) && !isNaN(month) && !isNaN(year) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
//                         // Asegurarse de que year, month, day, hours, minutes, y seconds son números
//                         const date = new Date(
//                             year,
//                             month,
//                             day,
//                             hours,
//                             minutes,
//                             seconds
//                         );

//                         // Verificar si la fecha es válida antes de formatearla
//                         if (!isNaN(date.getTime())) {
//                             // Formatear la fecha al formato requerido por el input datetime-local
//                             const formattedDate = date.toISOString().slice(0, 19);
//                             setFirstDate(formattedDate);
//                         } else {
//                             console.error("Fecha inválida:", firstDate);
//                         }
//                     } else {
//                         console.error("Valores de fecha y hora no válidos:", firstDate);
//                     }
//                 } else {
//                     console.error("No se pudo dividir la cadena de fecha y hora:", firstDate);
//                 }
//             }
//         } catch (error) {
//             console.log('Hubo un error con el formato de las fehcas', error)
//         }
//     }, [firstDate]);

//     useEffect(() => {
//         try {
//             if (lastDate) {
//                 // Convertir la cadena de texto a objeto Date
//                 const [datePart, timePart] = lastDate.split(' ');

//                 // Comprobar si datePart y timePart están definidos
//                 if (datePart && timePart) {
//                     const [dayStr, monthStr, yearStr] = datePart.split('/');
//                     const [hoursStr, minutesStr, secondsStr] = timePart.split(':');

//                     const day = parseInt(dayStr);
//                     const month = parseInt(monthStr) - 1; // Restar 1 al mes porque en JavaScript los meses van de 0 a 11
//                     const year = parseInt(yearStr);
//                     const hours = parseInt(hoursStr) - 6;
//                     const minutes = parseInt(minutesStr);
//                     const seconds = parseInt(secondsStr);

//                     // Verificar si los valores de fecha y hora son números y válidos
//                     if (!isNaN(day) && !isNaN(month) && !isNaN(year) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
//                         // Asegurarse de que year, month, day, hours, minutes, y seconds son números
//                         const date = new Date(
//                             year,
//                             month,
//                             day,
//                             hours,
//                             minutes,
//                             seconds
//                         );

//                         // Verificar si la fecha es válida antes de formatearla
//                         if (!isNaN(date.getTime())) {
//                             // Formatear la fecha al formato requerido por el input datetime-local
//                             const formattedDate = date.toISOString().slice(0, 19);
//                             setLastDate(formattedDate);
//                         } else {
//                             console.error("Fecha inválida:", lastDate);
//                         }
//                     } else {
//                         console.error("Valores de fecha y hora no válidos:", lastDate);
//                     }
//                 } else {
//                     console.error("No se pudo dividir la cadena de fecha y hora:", lastDate);
//                 }
//             }
//         } catch (error) {
//             console.log('Hubo un error con el formato de las fehcas', error)
//         }
//     }, [lastDate]);

//     const handleClick = () => {
//         setMostrarFechaComponent(!mostrarFechaComponent);
//         setIsCalendarOpen(!mostrarFechaComponent);
//     };

//     const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setFilterValue(e.target.value);
//         resetPage();
//     };

//     const handleFilterChangeDate = (jsonData: any[]) => {
//         // Realiza cualquier acción necesaria con los datos filtrados
//         console.log('Datos filtrados:', jsonData);
//         setData(jsonData);
//     };

//     const handleShowModal = (item: any) => {
//         // // Verificar si 'id' existe en el objeto item
//         // const itemId = item['id'] !== undefined ? item['id'] : 'valor_predeterminado';
//         setShowModal(true);
//         setFormData({
//             // other form fields...
//             creadoPor: item['Creado por'],
//             tipoDocumento: item['Tipo de documento'],
//             description: item['Descripcion'],
//             caf: item['CAF'],
//             cna: item['CNA'],
//             cfa: item['CFA'],
//             id: item['Codigo'],

//             // airport: item['Aeropuerto']
//         });
//         const indexDocumento = item['Tipo de documento'].indexOf(' ');
//         console.log(indexDocumento);
//         const cadenaDocumento = item['Tipo de documento'].substring(0, indexDocumento);

//         setSelectedFormat(cadenaDocumento);
//         setAirport(item['Aeropuerto']);
//         setFirstDate(item['Fecha y Hora Inicio']); // Reemplaza 'Fecha Inicial' con la clave real de tu fecha inicial
//         setLastDate(item['Fecha y Hora fin']); // Reemplaza 'Fecha Final' con la clave real de tu fecha final
//     };

//     useEffect(() => {
//         const fetchFormats = async () => {
//             try {
//                 const role = localStorage.getItem('role');
//                 const department = localStorage.getItem('department');
//                 const response = await fetch(`${process.env.BASE_URL}departments/formats/${department}`);

//                 if (!response.ok) {
//                     throw new Error('Hubo un problema al obtener los formatos');
//                 }
//                 const formatData = await response.json();
//                 setFormats(formatData);

//             } catch (error) {
//                 console.error('Hubo un error al obtener los formatos:', error);
//             }
//         };
//         fetchFormats();
//     }, []);

//     const handleFormatsChange = (event: ChangeEvent<HTMLSelectElement>) => {
//         const newSelectedFormat = event.target.value;
//         console.log('Nuevo formato seleccionado:', newSelectedFormat);
//         setSelectedFormat(newSelectedFormat);
//     };

//     // MANEJO CERRAR MODAL
//     const handleCloseModal = () => {
//         setShowModal(false);
//         setFormData({ ...formData }); //LIMPIA LA DATA DEL FORM CUANDO EL MODAL SE CIERRA
//     };

//     // MANEJO PARA ACTUALIZAR/EDITAR REGISTRO
//     const handleUpdateChanges = async () => {
//         try {
//             setShowError(false); //RESETEA EL ESTADO DE ERRORES CUANDO SE ENVIA EL FORM

//             if (!formData.caf || !formData.cna || !formData.cfa) {
//                 setShowError(true); //MUESTRA UN MENSAJE DE ERROR SI HACE FALTA UN CAMPO REQUERIDO
//                 return;
//             }

//             const confirmResult = await Swal.fire({
//                 title: '¿Está seguro que quiere aprobar el registro?',
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#02022C',
//                 cancelButtonColor: '#8A0808',
//                 confirmButtonText: 'Sí, quiero aprobarlo',
//                 cancelButtonText: 'Cancelar',
//             });

//             if (confirmResult.isConfirmed) {
//                 const url = `${process.env.BASE_URL}files/edit/${formData.id}`;

//                 console.log("Fecha para update: ", typeof (firstDate))

//                 const requestBody = {
//                     status: 'ARCHIVADO',
//                     caf: formData.caf,
//                     cna: formData.cna,
//                     cfa: formData.cfa,
//                     description: formData.description,
//                     airport: airport,
//                     format: selectedFormat,
//                     firstDateFormat: firstDate,
//                     lastDateFormat: lastDate
//                 };
//                 console.log('Cuerpo de la solicitud PUT:', JSON.stringify(requestBody));

//                 const response = await fetch(url, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(requestBody),
//                 });

//                 if (!response.ok) {
//                     throw new Error('Hubo un problema al actualizar los datos');
//                 }

//                 const role = localStorage.getItem('role');
//                 const department = localStorage.getItem('department');

//                 // Obtener los datos actualizados después de la eliminación
//                 const updatedResponse = await fetch(
//                     `${process.env.BASE_URL}files/filter/duplex?param=${filterValue}&status=PENDIENTE&role=${role}&department=${department}&param1=${firstDateFilter}&param2=${lastDateFilter}&user=${email}`
//                 );

//                 if (!updatedResponse.ok) {
//                     throw new Error('Hubo un problema al obtener los datos actualizados');
//                 }

//                 const updatedData = await updatedResponse.json();

//                 // Actualizar el estado 'data' con los nuevos datos
//                 setData(updatedData);

//                 // Muestra la alerta de éxito si la respuesta es exitosa
//                 Swal.fire({
//                     title: '¡Aprobado!',
//                     text: 'Su registro se aprobó con éxito.',
//                     icon: 'success',
//                     confirmButtonColor: '#02022C',
//                 });

//                 setShowModal(false);
//             } else {
//                 // Muestra la alerta de error si el usuario cancela la operación
//                 Swal.fire({
//                     title: 'Operación cancelada!',
//                     text: 'No se guardaron los cambios.',
//                     icon: 'info',
//                     confirmButtonColor: '#02022C',
//                 });
//             }
//         } catch (error) {
//             console.error('Error al guardar los cambios:', error);
//             // Muestra la alerta de error si hay un problema en la solicitud
//             Swal.fire({
//                 title: '¡Error!',
//                 text: 'No se editó el registro.',
//                 icon: 'error',
//                 confirmButtonColor: '#02022C',
//             });
//         }
//     };

//     // MANEJO DE ELIMINACION DE REGISTRO
//     const handleDelete = async (itemId: number) => {
//         try {
//             const confirmResult = await Swal.fire({
//                 title: '¿Está seguro que quiere eliminar el registro?',
//                 text: 'Esta acción es irreversible',
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#8A0808',
//                 cancelButtonColor: '#02022C',
//                 confirmButtonText: 'Sí, quiero eliminarlo',
//                 cancelButtonText: 'Cancelar',
//             });

//             if (confirmResult.isConfirmed) {
//                 const url = `${process.env.BASE_URL}files/delete/${itemId}`;

//                 const response = await fetch(url, {
//                     method: 'DELETE',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         // Agrega cualquier otra cabecera necesaria, como el token
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Hubo un problema al eliminar el registro');
//                 }

//                 const role = localStorage.getItem('role');
//                 const department = localStorage.getItem('department');

//                 // Obtener los datos actualizados después de la eliminación
//                 const updatedResponse = await fetch(
//                     `${process.env.BASE_URL}files/?status=PENDIENTE&role=${role}&depto=${department}`
//                 );

//                 if (!updatedResponse.ok) {
//                     throw new Error('Hubo un problema al obtener los datos actualizados');
//                 }

//                 const updatedData = await updatedResponse.json();

//                 // Actualizar el estado 'data' con los nuevos datos
//                 setData(updatedData);

//                 // Muestra la alerta de éxito si la respuesta es exitosa
//                 Swal.fire({
//                     title: '¡Eliminado!',
//                     text: 'El registro se eliminó con éxito.',
//                     icon: 'success',
//                     confirmButtonColor: '#8A0808',
//                 });
//             } else {
//                 // Muestra la alerta de cancelación si el usuario cancela la operación
//                 Swal.fire({
//                     title: 'Operación cancelada!',
//                     text: 'No se eliminó el registro.',
//                     icon: 'info',
//                     confirmButtonColor: '#02022C',
//                 });
//             }
//         } catch (error) {
//             console.error('Error al eliminar el registro:', error);
//             // Muestra la alerta de error si hay un problema en la solicitud
//             Swal.fire({
//                 title: '¡Error!',
//                 text: 'No se eliminó el registro.',
//                 icon: 'error',
//                 confirmButtonColor: '#02022C',
//             });
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // const response = await fetch(`${process.env.BASE_URL}files/?status=PENDIENTE&role=${role}&depto=${department}`);
//                 const response = await fetch(`${process.env.BASE_URL}files/filter/duplex?param=${filterValue}&status=PENDIENTE&role=${role}&department=${department}&param1=${firstDateFilter}&param2=${lastDateFilter}&user=${email}`);

//                 if (!response.ok) {
//                     throw new Error('Hubo un problema al obtener los datos');
//                 }
//                 const jsonData = await response.json();
//                 setData(jsonData);

//             } catch (error) {
//                 console.error('Hubo un error al obtener los datos:', error);
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <div className='text-center small'>
//             {/* Contenedor flexible para alinear los elementos */}
//             <div className="mb-3 d-flex justify-content-between align-items-center">

//                 {/* Formulario de búsqueda */}
//                 <Form>
//                     <InputGroup className="mb-3">
//                         <Button variant="outline-secondary">
//                             <FontAwesomeIcon icon={faSearch} />
//                         </Button>
//                         <FormControl
//                             placeholder="Buscar..."
//                             aria-label="Buscar..."
//                             aria-describedby="basic-addon2"
//                             value={filterValue}
//                             onChange={handleFilterChange}
//                         />
//                     </InputGroup>
//                 </Form>
//                 <div className="small calendar">
//                     {<FechaComponent parametro='PENDIENTE' onFilterChange={handleFilterChangeDate} firstDateFilterF={firstDateFilter} setFirstDate={setFirstDateFilter} lasDateF={lastDateFilter} setLastDateF={setLastDateFilter} onClearFilter={handleClearFilters} onPageReset={resetPage}
//                         rol={role} department={department} email={email} />}
//                 </div>
//             </div>

//             <Table responsive bordered>
//                 <thead>
//                     <tr>
//                         {/* Filtra las claves que no deseas mostrar en la tabla */}
//                         {data.length > 0 &&
//                             Object.keys(data[0])
//                                 .filter((key) => key !== 'Descripcion' && key !== 'Aeropuerto')
//                                 .map((key) => (
//                                     <th key={key} className='align-middle' style={{ color: '#02022C' }}>
//                                         {key}
//                                     </th>
//                                 ))}
//                         <th className='align-middle' style={{ color: '#02022C' }}>
//                             Acciones
//                         </th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {data
//                         .map((item, index) => (
//                             <tr key={index}>
//                                 {/* Muestra solo las claves deseadas en la tabla */}
//                                 {Object.entries(item)
//                                     .filter(([key]) => key !== 'Descripcion' && key !== 'Aeropuerto')
//                                     .map(([key, value], i) => (
//                                         <td key={i} className='align-middle'>
//                                             {String(value)}
//                                         </td>
//                                     ))}

//                                 <td className='text-center align-middle'>
//                                     <div className='d-flex justify-content-center'>
//                                         <Button size='sm' className='mx-1 edit-save-button' onClick={() => handleShowModal(item)}>
//                                             <FontAwesomeIcon icon={faEdit} />
//                                         </Button>
//                                         <Button size='sm' className='mx-1 delete-button' onClick={() => handleDelete(item['Codigo'])}>
//                                             <FontAwesomeIcon icon={faTrash} />
//                                         </Button>
//                                         <DownloadButton fileId={parseInt(item['Codigo'], 10)} />
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))
//                         .slice(firstIndex, lastIndex)}
//                 </tbody>
//             </Table>

//             <MyPagination
//                 dataPerPage={dataPerPage}
//                 currentPage={currentPage}
//                 setCurrentPage={setcurrentPage}
//                 totalData={totalData}
//             />
//             <Modal
//                 show={showModal}
//                 onHide={handleCloseModal}
//                 dialogClassName='modal-lg' // Ajusta el ancho del modal según tus necesidades
//                 centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Editar Documento Pendiente</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {/* Display "Creado Por" data */}
//                     <Form.Group controlId='formCreadoPor'>
//                         <Form.Label>Creado Por</Form.Label>
//                         <Form.Control
//                             type='text'
//                             value={formData.creadoPor}
//                             disabled // Make the field read-only
//                         />
//                     </Form.Group>

//                     {/* Display "Tipo de formato" data */}
//                     <Form.Group controlId='formFormato'>
//                         <Form.Label>Tipo de Formatos</Form.Label>
//                         <Form.Select
//                             // disabled
//                             value={selectedFormat}
//                             onChange={(e) => setSelectedFormat(e.target.value)}
//                             isInvalid={showError && !selectedFormat}
//                             required>
//                             <option value=''>Seleccione un formato</option>
//                             {formats.map((format) => (
//                                 <option key={format.id} value={format.id}>
//                                     {format.id} - {format.name}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                     </Form.Group>

//                     <Form.Group as={Col} controlId='formFechaInicialFormato'>
//                         <Form.Label>Fecha y Hora que se llenó el formato(o fecha inicial si es rango de fecha)</Form.Label>
//                         <Form.Control

//                             type='datetime-local'
//                             // type="datetime-local"
//                             value={firstDate}
//                             onChange={handleFirstDate}
//                             isInvalid={showError && !firstDate}
//                             required
//                         />
//                         <Form.Control.Feedback type='invalid'>Por favor, ingrese la fecha inicial.</Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group as={Col} controlId='formFechaFinalFormato'>
//                         <Form.Label>Fecha y Hora final en caso de ser rango de fechas</Form.Label>
//                         <Form.Control

//                             type='datetime-local'
//                             // type="datetime-local"
//                             value={lastDate}
//                             onChange={handleLastDate}

//                             isInvalid={showError && !lastDate}
//                             required
//                         />
//                         <Form.Control.Feedback type='invalid'>Por favor, ingrese la fecha final.</Form.Control.Feedback>
//                     </Form.Group>

//                     <Form.Group as={Col} controlId='Aeropuerto'>
//                         <Form.Label>Aeropuerto</Form.Label>
//                         <Form.Select
//                             value={airport}
//                             onChange={(e) => setAirport(e.target.value)}
//                             isInvalid={showError && !airport}
//                             required>
//                             <option disabled>Selecciona un Aeropuerto</option>
//                             <option>Aeropuerto Internacional Palmerola</option>
//                             {/* <option>Aeropuerto Internacional Toncontín</option> */}
//                         </Form.Select>
//                         <Form.Control.Feedback type='invalid'>Por favor, seleccione un aeropuerto.</Form.Control.Feedback>
//                     </Form.Group>

//                     {/* Display "Descripcion" data */}
//                     <Form.Group controlId='formDescripcion'>
//                         <Form.Label>Descripcion</Form.Label>
//                         <Form.Control
//                             as='textarea'
//                             rows={3}
//                             value={formData.description}
//                             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                         />
//                     </Form.Group>

//                     {/* Display "Descripcion" CAF */}
//                     <Form.Group controlId='formCAF'>
//                         <Form.Label>CAF</Form.Label>
//                         <Form.Control
//                             type='text'
//                             value={formData.caf}
//                             isInvalid={showError && !formData.caf}
//                             onChange={(e) => setFormData({ ...formData, caf: e.target.value })}
//                         />
//                         <Form.Control.Feedback type='invalid'>
//                             Por favor, rellene este campo para poder aprobarlo.
//                         </Form.Control.Feedback>
//                     </Form.Group>

//                     {/* Display "Descripcion" CNA */}
//                     <Form.Group controlId='formCNA'>
//                         <Form.Label>Tomo</Form.Label>
//                         <Form.Control
//                             type='text'
//                             value={formData.cna}
//                             isInvalid={showError && !formData.cna}
//                             onChange={(e) => setFormData({ ...formData, cna: e.target.value })}
//                         />
//                         <Form.Control.Feedback type='invalid'>
//                             Por favor, rellene este campo para poder aprobarlo.
//                         </Form.Control.Feedback>
//                     </Form.Group>

//                     {/* Display "Descripcion" CFA */}
//                     <Form.Group controlId='formCFA'>
//                         <Form.Label>CFA</Form.Label>
//                         <Form.Control
//                             type='text'
//                             value={formData.cfa}
//                             isInvalid={showError && !formData.cfa}
//                             onChange={(e) => setFormData({ ...formData, cfa: e.target.value })}
//                         />
//                         <Form.Control.Feedback type='invalid'>
//                             Por favor, rellene este campo para poder aprobarlo.
//                         </Form.Control.Feedback>
//                     </Form.Group>
//                 </Modal.Body>

//                 <Row className='mx-3 mb-3'>
//                     <Button
//                         type='submit'
//                         className='edit-save-button'
//                         onClick={handleUpdateChanges}
//                         style={{
//                             transition: 'background-color 0.3s',
//                         }}
//                     >
//                         Aprobar
//                     </Button>
//                 </Row>
//             </Modal>
//         </div>
//     );
// }

// export default TableDocsPendientes;