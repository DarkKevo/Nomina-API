import Express from 'express';

//Planilla
import { GenerarPagos } from '../controllers/Planilla_Pago/GenerarPagos.js';

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

//Usuarios
import { newUser } from '../controllers/Usuarios/newUser.js';
import { IniciarSesion } from '../controllers/Usuarios/loginUser.js';

export const routes = Express.Router();

//Usuarios
routes.post('/newUser', newUser);
routes.post('/loginUser', IniciarSesion);

//Deducciones
routes.get('/ListarDeducciones', ListarDeduccion);
routes.post('/RegistrarDeduccion', CrearDeduccion);
routes.put('/EditarDeduccion', ActualizarDeduccion);
routes.delete('/EliminarDeduccion', EliminarDeduccion);

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

//Generar Pagos
routes.get('/GenerarPagos', GenerarPagos);

//Departamentos
routes.get('/ListarDepartamento', ListarDepartamento);
routes.post('/CrearDepartamento', CrearDepartamento);
routes.put('/ActualizarDepartamento', ActualizarDepartamento);
routes.delete('/EliminarDepartamento', EliminarDepartamento);
