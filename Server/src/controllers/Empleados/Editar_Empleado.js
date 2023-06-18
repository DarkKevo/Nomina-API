import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const EditarEmpleado = (req, res) => {
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

  const {
    idEmpleados,
    cedula,
    nombres,
    apellidos,
    fecha_nacimiento,
    direccion,
    correo,
    codigo_cargo,
    codigo_departamento,
    codigo_deduccion,
    codigo_empresa,
    estado,
  } = req.body;

  let verify = 'SELECT * FROM nomina_database.empleados where `idEmpleados`= ' + `'${idEmpleados}'`;

  let update =
    'UPDATE nomina_database.empleados SET `cedula`= ' +
    `'${cedula}'` +
    ',`nombres`= ' +
    `'${nombres}'` +
    ', `apellidos`= ' +
    `'${apellidos}'` +
    ', `fecha_nacimiento`= ' +
    `'${fecha_nacimiento}'` +
    ', `direccion`= ' +
    `'${direccion}'` +
    ', `correo`= ' +
    `'${correo}'` +
    ', `codigo_cargo`= ' +
    `'${codigo_cargo}'` +
    ', `codigo_departamento`= ' +
    `'${codigo_departamento}'` +
    ', `codigo_deduccion`= ' +
    `'${codigo_deduccion}'` +
    ', `codigo_empresa`= ' +
    `'${codigo_empresa}'` +
    ', `estado`= ' +
    `'${estado}'` +
    'where `idEmpleados`= ' +
    `'${idEmpleados}'`;

  //Verificando la existencia del empleado
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando el empleado
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Empleado Actualizado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el empleado');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
