import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import { SaltRounds } from '../../index.js';

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
    telefono,
    codigo_cargo,
    codigo_departamento,
    codigo_empresa,
    numero_cuenta,
    estado
  } = req.body;

  let verify = 'SELECT * FROM nomina_database.empleados where `idEmpleados`= ' + `'${idEmpleados}'`;

  //let encripted_password = bcrypt.hashSync(pass, parseInt(SaltRounds));

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
    ', `telefono`= ' +
    `'${telefono}'` +
    ', `codigo_cargo`= ' +
    `'${codigo_cargo}'` +
    ', `codigo_departamento`= ' +
    `'${codigo_departamento}'` +
    ', `codigo_empresa`= ' +
    `'${codigo_empresa}'` +
    ', `numero_cuenta`= ' +
    `'${numero_cuenta}'` +
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
