import mysql from "mysql2";

import { host, port, username, password } from "../../Config/MySqlConfig.js";

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
      console.error("Error de conexion: " + err.stack);
      return;
    }
  });

  const { id_empleado, horas, horas_extra } = req.body;
  const horas_de_trabajo = 8;

  let query = `SELECT * FROM nomina_database.empleados inner join nomina_database.cargos on (empleados.codigo_cargo = cargos.idcargos) inner join nomina_database.departamentos on (empleados.codigo_departamento = departamentos.iddepartamentos) where empleados.estado = 'activo' and idEmpleados = '${id_empleado}'`;

  let data =
    "SELECT `nombre`,`horas_trabajadas`, `horas_extras`, `idEmpleado` FROM nomina_database.pre_pagos where `idEmpleado`= " +
    `'${id_empleado}'`;

  let fecha = new Date();

  function agregar_horas(e) {
    conexion.query(data, (err, result) => {
      if (err) {
        console.log(err);
        conexion.end();
        res.sendStatus(400);
      } else {
        if (result.length != 0) {
          let horas_trabajadas = result[0].horas_trabajadas - horas;
          let horas_extras = result[0].horas_extras + horas_extra;

          let salario_diario = e[0].salario / 30;
          let salario_hora = salario_diario / horas_de_trabajo;
          let salario_dias_trabajados = horas_trabajadas * salario_hora;
          let monto_base = salario_dias_trabajados;
          let monto_extra = horas_extras * salario_hora;

          let total =
            monto_base + monto_extra + quincena_bonificacion - data1.suma_deducciones;
          let carga =
            "UPDATE nomina_database.pre_pagos SET `horas_trabajadas`= " +
            `'${horas_trabajadas}'` +
            ", `monto_base`= " +
            `'${monto_base}'` +
            ", `horas_extras`= " +
            `'${horas_extras}'` +
            ", `monto_extra`= " +
            `'${monto_extra}'` +
            "where `idEmpleado`= " +
            `'${id_empleado}'`;

          let registro =
            "INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES " +
            `('${
              result[0].nombre
            }','${horas}', '${horas_extra}', '${fecha.getFullYear()}/${
              fecha.getMonth() + 1
            }/${fecha.getDate()}', ${result[0].idEmpleado})`;

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
                  conexion.end();
                  res.sendStatus(200);
                }
              });
            }
          });
        } else {
          console.log("No existe el empleado o la Pre-Nomina");
          conexion.end();
          res.sendStatus(400);
        }
      }
    });
  }

  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400);
      conexion.end();
    } else if (result.length == 0) {
      res.status(400).send({
        error: "El empleado no esta activo o no existe",
      });
      conexion.end();
    } else {
      agregar_horas(result);
    }
  });
};
