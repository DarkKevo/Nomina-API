//Esquema General de Seguridad del JWT

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 * */ 

//Esquema de Datos de las Empresas

/**
 * @swagger
 * components:
 *   schemas:
 *     Empresas:
 *       type: object
 *       properties:
 *         rif:
 *           type: string
 *           description: Rif de la Empresa
 *         nombre:
 *           type: string
 *           description: Nombre de la Empresa
 *         direccion: 
 *           type: string
 *           description: Direccion de la Empresa
 *         telefono:
 *           type: string
 *           description: Telefono de la Empresa
 *         correo: 
 *           type: string
 *           description: Correo de la Empresa
 *         clave:
 *           type: string
 *           description: Password de la Empresa
 *       required:
 *         -rif
 *         -nombre
 *         -direccion 
 *         -telefono
 *         -correo
 *         -clave
 *       example:
 *         rif: J-3164521
 *         nombre: Ferrevenca C.A
 *         direccion: Calle 13
 *         telefono: 0271896521
 *         correo: ferrevenca@gmail.com
 *         clave: 23452ffg&%^55
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empresas-Login:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la Empresa
 *         clave:
 *           type: string
 *           description: Password de la Empresa
 *       required:
 *         -nombre
 *         -clave
 *       example:
 *         nombre: Ferrevenca C.A
 *         clave: 23452ffg&%^55
 */


/**
 * @swagger
 * /CrearEmpresa:
 *   post:
 *     summary: Registra una nueva empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Empresas'
 *     responses:
 *       200:
 *         description: Empresa Registrada
 *       400:
 *         description: Empresa ya Registrada
 */

/**
 * @swagger
 * /LoginEmpresa:
 *   post:
 *     summary: Inicia Sesion con tu Empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Empresas-Login'
 *     responses:
 *       200:
 *         description: Empresa Registrada
 *       401:
 *         description: Empresa o Password erronea
 */
