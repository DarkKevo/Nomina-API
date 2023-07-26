import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ListarEmpleado = (req, res) => {
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

  let query = `SELECT idEmpleados,
	cedula,
	nombres,
	apellidos,
	fecha_nacimiento,
	direccion,
	correo,
	telefono,
  codigo_cargo,
	codigo_departamento,
	codigo_empresa, 
	estado,
  numero_cuenta,
  antiguedad
FROM nomina_database.empleados`

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
      res.status(400).send({error:'no hay datos'})
    } else {
      //Empleados Listados
      conexion.end();
      res.send(result);
    }
  });
};
