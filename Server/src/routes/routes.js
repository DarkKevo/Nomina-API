import Express from 'express';

//Funciones
import { CrearEmpresa } from '../controllers/Empresas/Agregar_Empresa.js';
import { IniciarSesion } from '../controllers/Empresas/IniciarSesion.js';

import { CrearCargo } from '../controllers/Cargos/Agregar_Cargo.js';
import { ListarCargo } from '../controllers/Cargos/Listar_Cargo.js';
import { EliminarCargo } from '../controllers/Cargos/Eliminar_Cargo.js';
import { ActualizarCargo } from '../controllers/Cargos/Actualizar_Cargo.js';

import { CrearSalario } from '../controllers/Salarios/Agregar_Salario.js';
import { ListarSalario } from '../controllers/Salarios/Listar_Salario.js';
import { EliminarSalario } from '../controllers/Salarios/Eliminar_Salario.js';
import { ActualizarSalario } from '../controllers/Salarios/Actualizar_Salario.js';


export const routes = Express.Router();

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
