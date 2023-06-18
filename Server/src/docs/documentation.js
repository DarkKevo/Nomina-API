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
 *     Deducciones:
 *       type: object
 *       properties:
 *         monto:
 *           type: number
 *           description: Monto de Dinero de la Deducción
 *         descripcion:
 *           type: string
 *           description: Descripcion de la Deducción
 *       required:
 *         -monto
 *         -descripcion
 *       example:
 *         monto: 2500
 *         descripcion: Impuestos + Seguro + Transporte
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Deducciones-Edit:
 *       type: object
 *       properties:
 *         iddeducciones:
 *           type: string
 *           description: Id de la Deduccion a editar
 *         monto:
 *           type: number
 *           description: Monto de Dinero de la Deducción
 *         descripcion:
 *           type: string
 *           description: Descripcion de la Deducción
 *       required:
 *         -monto
 *         -descripcion
 *         -iddeducciones
 *       example:
 *         iddeducciones: 1
 *         monto: 2500
 *         descripcion: Impuestos + Seguro + Transporte
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Deducciones-Eliminar:
 *       type: object
 *       properties:
 *         iddeducciones:
 *           type: string
 *           description: Id de la Deduccion a Eliminar
 *       required:
 *         -iddeducciones
 *       example:
 *         iddeducciones: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleados:
 *       type: object
 *       properties:
 *         cedula:
 *           type: string
 *           description: Cedula del Empleado
 *         nombres:
 *           type: string
 *           description: Nombres del Empleado
 *         apellidos:
 *           type: string
 *           description: Apellidos del Empleado
 *         fecha_nacimiento:
 *           type: string
 *           description: fecha_nacimiento del Empleado
 *         direccion:
 *           type: string
 *           description: direccion del Empleado
 *         correo:
 *           type: string
 *           description: correo del Empleado
 *         codigo_cargo:
 *           type: string
 *           description: codigo del Empleado de cargo
 *         codigo_departamento:
 *           type: string
 *           description: codigo del Empleado de departamento
 *         codigo_deduccion:
 *           type: string
 *           description: codigo del Empleado de deduccion
 *         codigo_empresa:
 *           type: string
 *           description: codigo del Empleado de empresa
 *         estado:
 *           type: string
 *           description: estado del Empleado
 *       required:
 *         -cedula
 *         -nombres
 *         -apellidos
 *         -fecha_nacimiento
 *         -direction
 *         -correo
 *         -codigo_cargo
 *         -codigo_departamento
 *         -codigo_deduccion
 *         -codigo_empresa
 *         -estado
 *       example:
 *         cedula: V-30259086
 *         nombres: Kevin Alejandro
 *         apellidos: Araujo Gonzalez
 *         fecha_nacimiento: 2004/02/07
 *         direccion: La Arboleda
 *         correo: kevinaraujogonzalez@gmail.com
 *         codigo_cargo: 01
 *         codigo_departamento: 02
 *         codigo_deduccion: 01
 *         codigo_empresa: 1
 *         estado: activo
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleados-Eliminar:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: Id del Empleado a eliminar
 *       required:
 *         -id_empleado
 *       example:
 *         id_empleado: 3
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleados-Editar:
 *       type: object
 *       properties:
 *         cedula:
 *           type: string
 *           description: Cedula del Empleado
 *         nombres:
 *           type: string
 *           description: Nombres del Empleado
 *         apellidos:
 *           type: string
 *           description: Apellidos del Empleado
 *         fecha_nacimiento:
 *           type: string
 *           description: fecha_nacimiento del Empleado
 *         direccion:
 *           type: string
 *           description: direccion del Empleado
 *         correo:
 *           type: string
 *           description: correo del Empleado
 *         codigo_cargo:
 *           type: string
 *           description: codigo del Empleado de cargo
 *         codigo_departamento:
 *           type: string
 *           description: codigo del Empleado de departamento
 *         codigo_deduccion:
 *           type: string
 *           description: codigo del Empleado de deduccion
 *         codigo_empresa:
 *           type: string
 *           description: codigo del Empleado de empresa
 *         estado:
 *           type: string
 *           description: estado del Empleado
 *         idEmpleados:
 *           type: string
 *           description: id del empleado a editar
 *       required:
 *         -cedula
 *         -nombres
 *         -apellidos
 *         -fecha_nacimiento
 *         -direction
 *         -correo
 *         -codigo_cargo
 *         -codigo_departamento
 *         -codigo_deduccion
 *         -codigo_empresa
 *         -estado
 *         -idEmpleados
 *       example:
 *         cedula: V-30259086
 *         nombres: Kevin Alejandro
 *         apellidos: Araujo Gonzalez
 *         fecha_nacimiento: 2004/02/07
 *         direccion: La Arboleda
 *         correo: kevinaraujogonzalez@gmail.com
 *         codigo_cargo: 01
 *         codigo_departamento: 02
 *         codigo_deduccion: 01
 *         codigo_empresa: 12
 *         estado: activo
 *         idEmpleados: 3
 */

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

/**
 * @swagger
 * /ListarEmpleados:
 *   get:
 *     summary: Listar los Empleados existentes
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Empleados Registrados
 *       400:
 *         description: No hay Empleados existentes
 */

/**
 * @swagger
 * /RegistrarEmpleado:
 *   post:
 *     summary: Crear un nuevo Empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Empleados'
 *     responses:
 *       200:
 *         description: Empleado Creado
 *       400:
 *         description: Empleado ya Registrado (Existente)
 */

/**
 * @swagger
 * /EditarEmpleado:
 *   put:
 *     summary: Actualizar un Empleado existente
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Empleados-Editar'
 *     responses:
 *       200:
 *         description: Empleado Actualizado
 *       400:
 *         description: El Empleado no existe
 */

/**
 * @swagger
 * /EliminarEmpleado:
 *   delete:
 *     summary: Eliminar un Empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Empleados-Eliminar'
 *     responses:
 *       200:
 *         description: Empleado Eliminado
 *       400:
 *         description: El Empleado no existe
 */

/**
 * @swagger
 * /ListarDeducciones:
 *   get:
 *     summary: Listar las Deducciones existentes
 *     tags: [Deducciones]
 *     responses:
 *       200:
 *         description: Deducciones Registradas
 *       400:
 *         description: No hay Empleados existentes
 */

/**
 * @swagger
 * /RegistrarDeduccion:
 *   post:
 *     summary: Crear una nueva Deduccion
 *     tags: [Deducciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Deducciones'
 *     responses:
 *       200:
 *         description: Deduccion Creada
 *       400:
 *         description: Deduccion ya Registrada (Existente)
 */

/**
 * @swagger
 * /EditarDeduccion:
 *   put:
 *     summary: Actualizar una deduccion existente
 *     tags: [Deducciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Deducciones-Edit'
 *     responses:
 *       200:
 *         description: Deduccion Actualizado
 *       400:
 *         description: La Deduccion no existe
 */

/**
 * @swagger
 * /EliminarDeduccion:
 *   delete:
 *     summary: Eliminar una Deduccion
 *     tags: [Deducciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Deducciones-Eliminar'
 *     responses:
 *       200:
 *         description: Deduccion Eliminado
 *       400:
 *         description: La Deduccion no existe
 */