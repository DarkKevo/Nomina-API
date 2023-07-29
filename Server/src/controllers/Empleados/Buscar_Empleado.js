import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const BuscarEmpleado = (req, res) => {
  var conexion = mysql.createConnection({
    host: host,
    port: port,
    user: username,
    password: password,
    multipleStatements: true,
  });

  conexion.connect(function (err) {
    if (err) {
      console.error('Error de conexion: ' + err.stack);
      return;
    }
  });

  const { idEmpleados } = req.body;

  let query =
  `SELECT E.idEmpleados,
	E.cedula,
	E.nombres,
	E.apellidos,
	E.fecha_nacimiento,
	E.direccion,
	E.correo,
	E.telefono,
	c.cargo codigo_cargo,
	d.departamento codigo_departamento,
	em.nombre codigo_empresa, 
	E.estado,
  E.numero_cuenta,
  E.antiguedad
FROM nomina_database.empleados E,
nomina_database.cargos c,
nomina_database.departamentos d,
nomina_database.empresas EM
where c.idcargos = e.codigo_cargo
and d.iddepartamentos = e.codigo_departamento
and em.idEmpresas = e.codigo_empresa
and e.idEmpleados =` + idEmpleados;

  //Verificando la existencia de los empleados
  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      //La Tabla de empleados no tiene datos
      console.log(result);
      conexion.end();
      res.sendStatus(400);
    } else {
      //Empleados Listados
      conexion.end();
      res.send(result[0]);
    }
  });
};
