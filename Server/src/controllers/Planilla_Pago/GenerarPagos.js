import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const GenerarPagos = (req, res) => {
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

  let query =
    'SELECT cedula, idEmpleados, apellidos, nombres, cargo, numero_cuenta, salario FROM nomina_database.empleados inner join nomina_database.cargos on (empleados.codigo_cargo = cargos.idcargos)';

  var data_pagos = [];

  function resetRegistros() {
    let resetRegistros = `DELETE FROM nomina_database.registro_horas;`;
    let resetHoras = `UPDATE nomina_database.empleados set horas_trabajadas = 0, horas_extras = 0;`;

    conexion.query(resetRegistros, (err, res) => {
      if (err) {
        console.log(err);
        conexion.end();
        res.sendStatus(400);
      } else {
        conexion.query(resetHoras, (err, res) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            res.sendStatus(200);
            conexion.end();
          }
        });
      }
    });
  }

  function Calculo(array) {
    array.forEach((element, index) => {
      let days = `SELECT * FROM nomina_database.registro_horas WHERE idEmpleados = ${element.idEmpleados} and horas_extras > 0 and horas_laboradas > 0`;
      let days2 = `SELECT * FROM nomina_database.registro_horas WHERE idEmpleados = ${element.idEmpleados} and horas_laboradas = 0`;
      conexion.query(days, (err, resultado) => {
        if (err) {
          console.log(err);
          conexion.end();
          res.sendStatus(400);
        } else {
          conexion.query(days2, (err, resultado2) => {
            if (err) {
              conexion.end();
              res.sendStatus(400);
            } else {
              console.log(`Laborados n ${resultado.length} extras ${resultado2.length}`);
              let salario_diario = element.salario / 30;
              let dias_laborados = resultado.length * salario_diario;
              let dias_descanso = 4 * salario_diario;
              let dias_extra = salario_diario * 1.5 * resultado2.length;
              data_pagos.push({
                nombre: `${element.nombres} ${element.apellidos}`,
                cargo: element.cargo,
                cuenta: element.numero_cuenta,
                pago_de_dias_laborales: dias_laborados,
                pago_de_dias_extras: dias_extra,
                pago_dias_de_descanso: dias_descanso,
                pago_correspondiente_total: dias_laborados + dias_extra + dias_descanso,
              });
              if (index == array.length - 1) {
                conexion.end();
                resetRegistros();
                res.json(data_pagos);
              }
            }
          });
        }
      });
    });
  }

  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      console.log(result);
      conexion.end();
      res.sendStatus(400);
    } else {
      Calculo(result);
    }
  });
};
