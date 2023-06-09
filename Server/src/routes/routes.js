import Express from 'express';

//Funciones
import { CrearEmpresa } from '../controllers/Empresas/Agregar_Empresa.js';

export const routes = Express.Router();

routes.post('/CrearEmpresa', CrearEmpresa);

