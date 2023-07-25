import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const Crear_Empleado = (req, res) => {
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

  const { cedula, nombres, apellidos, fecha_nacimiento, direccion, correo, telefono, codigo_cargo, codigo_departamento, codigo_empresa, numero_cuenta,estado } =
    req.body;

  const fecha = new Date();
  const antiguedad = `${fecha.getFullYear()}-`+ `${fecha.getMonth() + 1}-`+`${fecha.getDate()}`;
  
  let verify = 'SELECT * FROM nomina_database.empleados where `cedula`= ' + `'${cedula}'`;

  let query =
    'INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ';

  query += `('${cedula}', '${nombres}', '${apellidos}', '${fecha_nacimiento}', '${direccion}', '${correo}', '${telefono}', '${codigo_cargo}', '${codigo_departamento}', '${codigo_empresa}', '${numero_cuenta}', '${antiguedad}', 0, 0, '${estado}')`;

  //Verificar la Existencia del Empleado
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe el cargo');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
