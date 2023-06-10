import Express from 'express';

//Funciones
import { CrearEmpresa } from '../controllers/Empresas/Agregar_Empresa.js';
import { IniciarSesion } from '../controllers/Empresas/IniciarSesion.js';

export const routes = Express.Router();

routes.post('/CrearEmpresa', CrearEmpresa);
routes.post('/LoginEmpresa', IniciarSesion);
