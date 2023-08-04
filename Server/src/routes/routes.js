import Express from 'express';

//Planilla
import { GenerarPagos } from '../controllers/Planilla_Pago/GenerarPagos.js';
import { FiltrarPagos } from '../controllers/Planilla_Pago/Filtrar_Pagos.js';

//Registros
import { ListarRegistro } from '../controllers/Registro_De_Horas/ListarRegistro.js';

//Empleados
import { Crear_Empleado } from '../controllers/Empleados/Registrar_Empleado.js';
import { ListarEmpleado } from '../controllers/Empleados/Listar_empleados.js';
import { EliminarEmpleado } from '../controllers/Empleados/Eliminar_Empleados.js';
import { EditarEmpleado } from '../controllers/Empleados/Editar_Empleado.js';
import { BuscarEmpleado } from '../controllers/Empleados/Buscar_Empleado.js';

//Cargos
import { CrearCargo } from '../controllers/Cargos/Agregar_Cargo.js';
import { ListarCargo } from '../controllers/Cargos/Listar_Cargo.js';
import { EliminarCargo } from '../controllers/Cargos/Eliminar_Cargo.js';
import { ActualizarCargo } from '../controllers/Cargos/Actualizar_Cargo.js';
import { BuscarCargo } from '../controllers/Cargos/Buscar_Cargo.js';


//Departamentos
import { ListarDepartamento } from '../controllers/Departamentos/Listar_Departamento.js';
import { CrearDepartamento } from '../controllers/Departamentos/Agregar_Departamento.js';
import { ActualizarDepartamento } from '../controllers/Departamentos/Actualizar_Departamento.js';
import { EliminarDepartamento } from '../controllers/Departamentos/Eliminar_Departamento.js';

//Deducciones
import { CrearDeduccion } from '../controllers/Deducciones/CrearDeduccion.js';
import { ActualizarDeduccion } from '../controllers/Deducciones/EditarDeduccion.js';
import { ListarDeduccion } from '../controllers/Deducciones/ListarDeducciones.js';
import { EliminarDeduccion } from '../controllers/Deducciones/EliminarDeduccion.js';

//Bonificacion
import { agregarBonificacion } from '../controllers/Bonificaciones/agregarBonificaciones.js';
import { editarBonificacion } from '../controllers/Bonificaciones/editarBonificacion.js';
import { listarBonificacion } from '../controllers/Bonificaciones/listarBonificaciones.js';
import { EliminarBonificacion } from '../controllers/Bonificaciones/EliminarBonificacion.js';

//Usuarios
import { newUser } from '../controllers/Usuarios/newUser.js';
import { IniciarSesion } from '../controllers/Usuarios/loginUser.js';

//Bancos
import { ListarBanco } from '../controllers/Bancos/Listar_Banco.js';
import { ActualizaBanco } from '../controllers/Bancos/Actualizar_Bancos.js';
import { CrearBanco } from '../controllers/Bancos/Agregar_bancos.js';
import { EliminarBancos } from '../controllers/Bancos/Eliminar_Bancos.js';


//Setup
import { Listarsetup } from '../controllers/setup_file/Listar_setup.js';
import { ActualizarSetup } from '../controllers/setup_file/Actualizar_setup.js';
import { Agregarsetup } from '../controllers/setup_file/Agregar_setup.js';
import { EliminarSetup } from '../controllers/setup_file/Eliminar_setup.js';

//Empresas
import { ListarEmpresa } from '../controllers/Empresas/Listar_Empresa.js';
import { ActualizarEmpresa } from '../controllers/Empresas/Actualizar_Empresa.js';
import { CrearEmpresa } from '../controllers/Empresas/Agregar_Empresa.js';


//Empresas
import { descargartxt } from '../controllers/download_file/download.js';
export const routes = Express.Router();

//Vacaciones
import { ListarVacaciones } from '../controllers/vacaciones/Listar_vacaciones.js';
import { CalcularVacaciones } from '../controllers/vacaciones/calcular_vacaciones.js';
import { UsarVacaciones } from '../controllers/vacaciones/usar_vacaciones.js';


//Cargar Horas
import { CargarHoras } from '../controllers/Carga_Horas/Cargar_horas.js';
import { ListarHoras } from '../controllers/Carga_Horas/Listar_Horas.js';

//Usuarios
routes.post('/newUser', newUser);
routes.post('/loginUser', IniciarSesion);

//Deducciones
routes.get('/ListarDeducciones', ListarDeduccion);
routes.post('/RegistrarDeduccion', CrearDeduccion);
routes.put('/EditarDeduccion', ActualizarDeduccion);
routes.delete('/EliminarDeduccion', EliminarDeduccion);

//Bonificaciones
routes.get('/ListarBonificacion', listarBonificacion);
routes.post('/RegistrarBonificacion', agregarBonificacion);
routes.put('/EditarBonificacion', editarBonificacion);
routes.delete('/EliminarBonificacion', EliminarBonificacion);

//Empleados
routes.get('/ListarEmpleados', ListarEmpleado);
routes.post('/RegistrarEmpleado', Crear_Empleado);
routes.put('/EditarEmpleado', EditarEmpleado);
routes.delete('/EliminarEmpleado', EliminarEmpleado);
routes.post('/BuscarEmpleado', BuscarEmpleado);

//Cargos
routes.post('/CrearCargo', CrearCargo);
routes.get('/ListarCargo', ListarCargo);
routes.delete('/EliminarCargo', EliminarCargo);
routes.put('/ActualizarCargo', ActualizarCargo);
routes.post('/BuscarCargo', BuscarCargo);

//Generar Pagos
routes.get('/GenerarPagos', GenerarPagos);
routes.post('/FiltrarPagos', FiltrarPagos);

//Departamentos
routes.get('/ListarDepartamento', ListarDepartamento);
routes.post('/CrearDepartamento', CrearDepartamento);
routes.put('/ActualizarDepartamento', ActualizarDepartamento);
routes.delete('/EliminarDepartamento', EliminarDepartamento);

//Registros
routes.get('/ListarRegistros', ListarRegistro);


//Bancos
routes.get('/ListarBanco', ListarBanco);
routes.put('/ActualizaBanco', ActualizaBanco);
routes.post('/CrearBanco', CrearBanco);
routes.delete('/EliminarBancos', EliminarBancos);


//Setup
routes.get('/Listarsetup', Listarsetup);
routes.put('/ActualizarSetup', ActualizarSetup);
routes.post('/Agregarsetup', Agregarsetup);
routes.delete('/EliminarSetup', EliminarSetup);

//Empresa
routes.get('/ListarEmpresa', ListarEmpresa);
routes.put('/ActualizaEmpresa', ActualizarEmpresa);
routes.post('/CrearEmpresa', CrearEmpresa);

//Empresa
routes.get('/descargartxt', descargartxt);

//Vacaciones
routes.get('/ListarVacaciones', ListarVacaciones);
routes.get('/CalcularVacaciones', CalcularVacaciones);
routes.post('/UsarVacaciones', UsarVacaciones);


//Cargar horas
routes.post('/cargarHoras', CargarHoras);
routes.get('/listarHoras', ListarHoras);