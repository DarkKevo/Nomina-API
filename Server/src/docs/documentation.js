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
 *     Listar-Registro:
 *       type: object
 *       properties:
 *         nombres:
 *           type: string
 *           description: Nombre del Empleado
 *         apellidos:
 *           type: string
 *           description: apellido del Empleado
 *         horas_laboradas:
 *           type: string
 *           description: Horas Laboradas
 *         horas_extras:
 *           type: string
 *           description: Horas Extras
 *         fecha: 
 *           type: string
 *           description: Fecha del Registro
 *       required:
 *         -nombres
 *         -apellidos
 *         -horas_laboradas
 *         -horas_extras
 *         -fecha
 */

/**
 * @swagger
 * /ListarRegistros:
 *   get:
 *     summary: Listar los Registros de Horas
 *     tags: [Registros]
 *     responses:
 *       200:
 *         description: Registros Cargados
 *       400:
 *         description: No hay Registros
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Carga_Horas:
 *       type: object
 *       properties:
 *         id_empleado:
 *           type: string
 *           description: Id del Empleado a cargar horas
 *         horas: 
 *           type: string
 *           description: Horas Laboradas
 *         horas_extra:
 *           type: string
 *           description: Horas Extra laboradas
 *       required:
 *         -id_empleado
 *         -horas
 *         -horas_extra
 *       example:
 *         id_empleado: 1
 *         horas: 10
 *         horas_extra: 5
 */

/**
 * @swagger
 * /cargarHoras:
 *   post:
 *     summary: Registra Horas Laborales
 *     tags: [Horas Laborales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Carga_Horas'
 *     responses:
 *       200:
 *         description: Horas Registradas
 *       400:
 *         description: Ha ocurrido un error 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pagos:
 *       type: object
 *       properties:
 *         cedula:
 *           type: string
 *           description: Cedula del Empleado
 *         apellidos:
 *           type: string
 *           description: Apellidos del Empleado
 *         nombres:
 *           type: string
 *           description: Nombres del Empleado
 *         cargo:
 *           type: string
 *           description: Cargo del Empleado
 *         monto_deduccion: 
 *           type: string
 *           description: Monto a Restar por Deduccion
 *         descripcion:
 *           type: string
 *           description: Descripcion de la Deduccion
 *         monto_de_pago: 
 *           type: string
 *           description: Monto a Pagar
 *       required:
 *         -cedula
 *         -apellidos
 *         -nombres
 *         -cargo
 *         -monto_deduccion
 *         -descripcion
 *         -monto_de_pago
 *       example:
 *         cedula: V-30259086
 *         apellidos: Araujo Gonzalez
 *         nombres: Kevin Alejandro
 *         cargo: Gerente
 *         monto_deduccion: 25
 *         descripcion: Seguro Social
 *         monto_de_pago: 230
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
 *         telefono:
 *           type: string
 *           description: telefono del Empleado
 *         codigo_cargo:
 *           type: string
 *           description: codigo del Empleado de cargo
 *         codigo_departamento:
 *           type: string
 *           description: codigo del Empleado de departamento
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
 *         -telefono
 *         -codigo_cargo
 *         -codigo_departamento
 *         -codigo_empresa
 *         -estado
 *       example:
 *         cedula: V-30259086
 *         nombres: Kevin Alejandro
 *         apellidos: Araujo Gonzalez
 *         fecha_nacimiento: 2004/02/07
 *         direccion: La Arboleda
 *         correo: kevinaraujogonzalez@gmail.com
 *         telefono: 04145789632
 *         codigo_cargo: 01
 *         codigo_departamento: 01
 *         codigo_empresa: 01 
 *         estado: activo
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleados-Eliminar:
 *       type: object
 *       properties:
 *         idEmpleados:
 *           type: int
 *           description: Id del Empleado a eliminar
 *       required:
 *         -idEmpleados
 *       example:
 *         idEmpleados: 2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empleados-Buscar:
 *       type: object
 *       properties:
 *         idEmpleados:
 *           type: int
 *           description: Id del Empleado a Buscar
 *       required:
 *         -idEmpleados
 *       example:
 *         idEmpleados: 2
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
 *         telefono:
 *           type: string
 *           description: telefono del Empleado
 *         codigo_cargo:
 *           type: string
 *           description: codigo del Empleado de cargo
 *         codigo_departamento:
 *           type: string
 *           description: codigo del Empleado de departamento
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
 *         -telefono
 *         -codigo_cargo
 *         -codigo_departamento
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
 *         telefono: 04141236789
 *         codigo_cargo: 01
 *         codigo_departamento: 02
 *         codigo_empresa: 1
 *         estado: activo
 *         idEmpleados: 3
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuarios:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: nombre del empleado
 *         apellido:
 *           type: string
 *           description: apellido del empleado
 *         user:
 *           type: string
 *           description: nombre de usuario
 *         pass:
 *           type: string
 *           description: clave
 *       required:
 *         -nombre
 *         -apellido
 *         -user
 *         -pass
 *       example:
 *         nombre: Kevin
 *         apellido: Araujo
 *         user: DarkKevo
 *         pass: gew#$%^#dghd
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User-Login:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: usuario del empleado
 *         pass:
 *           type: string
 *           description: Password del empleado
 *       required:
 *         -user
 *         -pass
 *       example:
 *         user: DarkKevo
 *         pass: gew#$%^#dghd
 */

/**
 * @swagger
 * /newUser:
 *   post:
 *     summary: Registra un nuveo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Usuarios'
 *     responses:
 *       200:
 *         description: Usuario Registrado
 *       400:
 *         description: Usuario ya Registrado
 */

/**
 * @swagger
 * /loginUser:
 *   post:
 *     summary: Inicia Sesion con tu Empresa
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/User-Login'
 *     responses:
 *       200:
 *         description: Usuario Registrado
 *       400:
 *         description: Clave erronea
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
 *           description: Nombre del cargo
 *         salario:
 *           type: int
 *           description: Monto del Salario
 *       required:
 *         -cargo
 *         -salario
 *       example:
 *         cargo: Analista de Sistema
 *         salario: 80
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
 *         salario:
 *           type: int
 *           description: Salario del cargo
 *       example:
 *         idcargos: 1
 *         cargo: Analista de Sistema
 *         salario: 100
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
 *         salario:
 *           type: int
 *           description: Salario del cargo
 *       required:
 *         -idcargos
 *         -cargo
 *         -salario
 *       example:
 *         idcargos: 11
 *         cargo: Analista de Mercado
 *         salario: 200
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

//Esquema de Datos de los Departamentos

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
 *         departamento: Sistemas
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
 * /ListarDepartamento:
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
 *         iddepartamentos: 1
 *         departamento: Recursos Humanos
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
 * /BuscarEmpleado:
 *   post:
 *     summary: Buscar un Empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Empleados-Buscar'
 *     responses:
 *       200:
 *         description: Empleado Encontrado
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

/**
 * @swagger
 * /GenerarPagos:
 *   get:
 *     summary: Listar los Pagos 
 *     tags: [Pagos]
 *     responses:
 *       200:
 *         description: Pagos por Realizar
 *       400:
 *         description: No hay Pagos existentes
 */
