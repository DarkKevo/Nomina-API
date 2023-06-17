import Express from 'express';

//Funciones
import { CrearEmpresa } from '../controllers/Empresas/Agregar_Empresa.js';
import { IniciarSesion } from '../controllers/Empresas/IniciarSesion.js';

//Empleados
import { Crear_Empleado } from '../controllers/Empleados/Registrar_Empleado.js';
import { ListarEmpleado } from '../controllers/Empleados/Listar_empleados.js';
import { EliminarEmpleado } from '../controllers/Empleados/Eliminar_Empleados.js';
import { EditarEmpleado } from '../controllers/Empleados/Editar_Empleado.js';

//Cargos
import { CrearCargo } from '../controllers/Cargos/Agregar_Cargo.js';
import { ListarCargo } from '../controllers/Cargos/Listar_Cargo.js';
import { EliminarCargo } from '../controllers/Cargos/Eliminar_Cargo.js';
import { ActualizarCargo } from '../controllers/Cargos/Actualizar_Cargo.js';

//Salarios
import { CrearSalario } from '../controllers/Salarios/Agregar_Salario.js';
import { ListarSalario } from '../controllers/Salarios/Listar_Salario.js';
import { EliminarSalario } from '../controllers/Salarios/Eliminar_Salario.js';
import { ActualizarSalario } from '../controllers/Salarios/Actualizar_Salario.js';

//Departamentos
import { ListarDepartamento } from '../controllers/Departamentos/Listar_Departamento.js';
import { CrearDepartamento } from '../controllers/Departamentos/Agregar_Departamento.js';
import { ActualizarDepartamento } from '../controllers/Departamentos/Actualizar_Departamento.js';
import { EliminarDepartamento } from '../controllers/Departamentos/Eliminar_Departamento.js';

export const routes = Express.Router();

//Empresa
routes.post('/CrearEmpresa', CrearEmpresa);
routes.post('/LoginEmpresa', IniciarSesion);

//Cargos
routes.post('/CrearCargo', CrearCargo);
routes.get('/ListarCargo', ListarCargo);
routes.delete('/EliminarCargo', EliminarCargo);
routes.put('/ActualizarCargo', ActualizarCargo);

//Salarios
routes.post('/CrearSalario', CrearSalario);
routes.get('/ListarSalario', ListarSalario);
routes.delete('/EliminarSalario', EliminarSalario);
routes.put('/ActualizarSalario', ActualizarSalario);

//Departamentos
routes.get('/ListarDepartamento', ListarDepartamento);
routes.post('/CrearDepartamento', CrearDepartamento);
routes.put('/ActualizarDepartamento', ActualizarDepartamento);
routes.delete('/EliminarDepartamento', EliminarDepartamento);

//Empleados
routes.get('/pene', () => {
    console.log('pene')
});