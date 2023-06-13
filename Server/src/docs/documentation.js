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

//Esquema de Datos de los Cargos

/**
 * @swagger
 * components:
 *   schemas:
 *     Cargos_Crear:
 *       type: object
 *       properties:
 *         cargo:
 *           type: string
 *           description: Nombre del cargo (Tabla - cargos)
 *         monto_salario: 
 *           type: int
 *           description: Monto del Salario (Tabla - salario)
 *       required:
 *         -cargo
 *         -monto_salario 
 *       example:
 *         cargo: Analista de Sistema
 *         monto_salario: 80
 */

/**
 * @swagger
 * /CrearCargo:
 *   post:
 *     summary: Registrar un nuevo cargo
 *     tags: [Cargos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Cargos_Crear'
 *     responses:
 *       200:
 *         description: Cargo Registrado
 *       400:
 *         description: Cargo ya Registrado (Existente)
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Cargos_Listar:
 *       type: object
 *       properties:
 *         idcargos:
 *           type: int
 *           description: Identificador del cargo
 *         cargo:
 *           type: string
 *           description: Nombre del cargo
 *         codigo_salario: 
 *           type: int
 *           description: Identificador del salario
 *       example:
 *         idcargos: 1
 *         cargo: Analista de Sistema
 *         codigo_salario: 1
 */

/**
 * @swagger
 * /ListarCargo:
 *   get:
 *     summary: Listar los cargos existentes
 *     tags: [Cargos]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Cargos_Listar'
 *     responses:
 *       200:
 *         description: Cargos Registrados
 *       400:
 *         description: No hay cargos existentes
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Cargos_Eliminar:
 *       type: object
 *       properties:
 *         idcargos:
 *           type: int
 *           description: Identificador del cargo
 *       required:
 *         -idcargos
 *       example:
 *         idcargos: 13
 */

/**
 * @swagger
 * /EliminarCargo:
 *   delete:
 *     summary: Eliminar un cargo
 *     tags: [Cargos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Cargos_Eliminar'
 *     responses:
 *       200:
 *         description: Cargo Eliminado
 *       400:
 *         description: El cargo no existe
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Cargos_Actualizar:
 *       type: object
 *       properties:
 *         idcargos:
 *           type: int
 *           description: Identificador del cargo que se va a actualizar
 *         cargo:
 *           type: string
 *           description: Nombre del cargo
 *         codigo_salario: 
 *           type: int
 *           description: Identificador del salario
 *       required:
 *         -idcargos
 *         -cargo
 *         -codigo_salario
 *       example:
 *         idcargos: 11
 *         cargo: Analista de Mercado
 *         codigo_salario: 1
 */

/**
 * @swagger
 * /ActualizarCargo:
 *   put:
 *     summary: Actualizar un cargo existente
 *     tags: [Cargos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Cargos_Actualizar'
 *     responses:
 *       200:
 *         description: Cargo Actualizado
 *       400:
 *         description: El cargo no existe
 */


//Esquema de Datos de los Salarios

/**
 * @swagger
 * components:
 *   schemas:
 *     Salarios_Crear:
 *       type: object
 *       properties:
 *         monto_salario: 
 *           type: int
 *           description: Monto del salario a agregar
 *       required:
 *         -monto_salario
 *       example:
 *         monto_salario: 300
 */

/**
 * @swagger
 * /CrearSalario:
 *   post:
 *     summary: Crear un nuevo salario
 *     tags: [Salarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Salarios_Crear'
 *     responses:
 *       200:
 *         description: Salario Creado
 *       400:
 *         description: Salario ya Registrado (Existente)
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Salarios_Listar:
 *       type: object
 *       properties:
 *         idsalario:
 *           type: int
 *           description: Identificador del salario
 *         monto_salario: 
 *           type: int
 *           description: Monto del salario
 *       example:
 *         idsalario: 5
 *         monto_salario: 200
 */

/**
 * @swagger
 * /ListarSalario:
 *   get:
 *     summary: Listar los salarios existentes
 *     tags: [Salarios]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Salarios_Listar'
 *     responses:
 *       200:
 *         description: Salarios Registrados
 *       400:
 *         description: No hay salarios existentes
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Salarios_Eliminar:
 *       type: object
 *       properties:
 *         idsalario:
 *           type: int
 *           description: Identificador del salario
 *       required:
 *         -idsalario
 *       example:
 *         idsalario: 3
 */

/**
 * @swagger
 * /EliminarSalario:
 *   delete:
 *     summary: Eliminar un salario
 *     tags: [Salarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Salarios_Eliminar'
 *     responses:
 *       200:
 *         description: Salario Eliminado
 *       400:
 *         description: El salario no existe
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Salarios_Actualizar:
 *       type: object
 *       properties:
 *         idsalario:
 *           type: int
 *           description: Identificador del salario que se va a actualizar
 *         monto_salario: 
 *           type: int
 *           description: Monto del salario
 *       required:
 *         -idsalario
 *         -monto_salario
 *       example:
 *         idsalario: 4
 *         monto_salario: 300
 */

/**
 * @swagger
 * /ActualizarSalario:
 *   put:
 *     summary: Actualizar un salario existente
 *     tags: [Salarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Salarios_Actualizar'
 *     responses:
 *       200:
 *         description: Salario Actualizado
 *       400:
 *         description: El salario no existe
 */


//Esquema de Datos de los Cargos

/**
 * @swagger
 * components:
 *   schemas:
 *     Departamentos_Crear:
 *       type: object
 *       properties:
 *         Departamento:
 *           type: string
 *           description: Departamento (Tabla - Departamentos)
 *       required:
 *         -departamento
 *       example:
 *         Departamento: Sistemas
 */


/**
 * @swagger
 * /CrearDepartamento:
 *   post:
 *     summary: Crear un nuevo Departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Departamentos_Crear'
 *     responses:
 *       200:
 *         description: Departamento Creado
 *       400:
 *         description: Departamento ya Registrado (Existente)
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Departamentos_Listar:
 *       type: object
 *       properties:
 *         iddepartamentos:
 *           type: int
 *           description: Id
 *         departamento: 
 *           type: int
 *           description: Departamento
 *       example:
 *         id: 1
 *         departamento: Sistemas
 */

/**
 * @swagger
 * /ListarDepartamentos:
 *   get:
 *     summary: Listar los departamentos existentes
 *     tags: [Departamentos]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Departamentos_Listar'
 *     responses:
 *       200:
 *         description: Departamentos Registrados
 *       400:
 *         description: No hay Departamentos existentes
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Departamentos_Eliminar:
 *       type: object
 *       properties:
 *         iddepartamento:
 *           type: int
 *           description: Id
 *       required:
 *         -iddepartamento
 *       example:
 *         iddepartamento: 1
 */

/**
 * @swagger
 * /EliminarDepartamento:
 *   delete:
 *     summary: Eliminar un departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Departamentos_Eliminar'
 *     responses:
 *       200:
 *         description: Departamento Eliminado
 *       400:
 *         description: El Departamento no existe
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Departamentos_Actualizar:
 *       type: object
 *       properties:
 *         iddepartamento:
 *           type: int
 *           description: Id
 *         departamento: 
 *           type: string
 *           description: Departamento
 *       required:
 *         -iddepartamento
 *         -departamento
 *       example:
 *         iddepartamento: 1
 *         Departamento: Recursos Humanos
 */

/**
 * @swagger
 * /ActualizarDepartamento:
 *   put:
 *     summary: Actualizar un Departamento existente
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Departamentos_Actualizar'
 *     responses:
 *       200:
 *         description: Departamentoo Actualizado
 *       400:
 *         description: El Departamento no existe
 */
