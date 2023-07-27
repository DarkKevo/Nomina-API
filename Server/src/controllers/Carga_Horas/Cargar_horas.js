import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const CargarHoras = (req, res) => {
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

  const { id_empleado, horas, horas_extra } = req.body;

  let data =
    'SELECT `nombres`, `apellidos`, `horas_trabajadas`, `horas_extras`, `idEmpleados` FROM nomina_database.empleados where `idEmpleados`= ' +
    `'${id_empleado}'`;

  let fecha = new Date();

  conexion.query(data, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        let carga =
          'UPDATE nomina_database.empleados SET `horas_trabajadas`= ' +
          `'${result[0].horas_trabajadas + horas}'` +
          ', `horas_extras`= ' +
          `'${result[0].horas_extras + horas_extra}'` +
          'where `idEmpleados`= ' +
          `'${id_empleado}'`;

        let registro =
          'INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ' +
          `('${result[0].nombres}', '${
            result[0].apellidos
          }', '${horas}', '${horas_extra}', '${fecha.getFullYear()}/${fecha.getMonth()}/${fecha.getDate()}', ${result[0].idEmpleados})`;

        conexion.query(carga, (err, result2) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            conexion.query(registro, (err, result3) => {
              if (err) {
                console.log(err);
                conexion.end();
                res.sendStatus(400);
              } else {
                console.log(result3);
                conexion.end();
                res.sendStatus(200);
              }
            });
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
