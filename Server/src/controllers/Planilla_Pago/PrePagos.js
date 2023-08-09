import mysql from "mysql2";

import { host, port, username, password } from "../../Config/MySqlConfig.js";

export const PrePagos = (req, res) => {
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

  const { fecha_ini, fecha_cul } = req.body;

  function date_short(dateString) {
    const date = new Date(Date.parse(dateString));
    const utcShortDate = date.toISOString().slice(0, 10);
    return utcShortDate;
  }

  let verify = "SELECT * FROM nomina_database.pre_pagos";
  let del = "DELETE FROM nomina_database.pre_pagos";
  let del_horas = "DELETE FROM nomina_database.registro_horas";

  let query =
    "SELECT * FROM nomina_database.empleados inner join nomina_database.cargos on (empleados.codigo_cargo = cargos.idcargos) inner join nomina_database.departamentos on (empleados.codigo_departamento = departamentos.iddepartamentos) where empleados.estado = 'activo'";

  var data_pagos = [];
  const horas_de_trabajo = 8;

  const fecha_corta = (f) => {
    const fecha = new Date(f);
    const fecha_c =
      `${fecha.getFullYear()}-` +
      `${fecha.getMonth() + 1}-` +
      `${fecha.getDate()}`;
    return fecha_c;
  };

  function respaldo(array) {
    array.forEach((element) => {
      let backup =
        "INSERT INTO nomina_database.pre_pagos (`id_pagos`,`idEmpleado`,`cedula`,`nombre`,`departamento`, `cargo`, `cuenta`,`correo`,`dias`,`fecha_ini`,`fecha_cul`,`horas_trabajadas`,`monto_base`, `horas_extras`, `monto_extra`, `monto_deduccion`, `monto_bonificacion`, `pagoTotal`, `fecha_pago`) VALUES" +
        `(${element.idEmpleado},${element.idEmpleado}, '${element.cedula}', '${
          element.nombre
        }', '${element.departamento}', '${element.cargo}', '${
          element.cuenta
        }', '${element.correo}', ${element.dias}, '${date_short(
          fecha_ini
        )}', '${date_short(fecha_cul)}', ${element.horas_trabajadas}, ${
          element.monto_base
        }, ${element.horas_extras}, ${element.monto_extra}, ${
          element.monto_deduccion
        }, ${element.monto_bonificacion}, ${element.pagoTotal}, '${
          element.fecha_pago
        }')`;

      conexion.query(backup, (err, res) => {
        if (err) {
          console.log(err);
          console.log({ error: "Error al guardar datos" });
          conexion.end();
        }
      });
    });
  }

  function calculo2(data1) {
    let quincena_bonificacion = (data1.suma_bonificaciones / 30) * data1.dias;
    let total =
      data1.monto_base + quincena_bonificacion - data1.suma_deducciones;
    let fecha = new Date();
    let hoy = fecha_corta(fecha);

    data_pagos.push({
      idEmpleado: data1.idEmpleado,
      cedula: data1.cedula,
      nombre: data1.nombre,
      departamento: data1.departamento,
      cargo: data1.cargo,
      cuenta: data1.cuenta,
      correo: data1.correo,
      dias: data1.dias,
      horas_trabajadas: data1.horas_totales,
      horas_extras: 0,
      monto_base: data1.monto_base,
      monto_extra: 0,
      monto_deduccion: data1.suma_deducciones,
      monto_bonificacion: quincena_bonificacion,
      pagoTotal: total,
      fecha_pago: hoy,
    });

    console.log(data_pagos);

    if (data1.index == data1.array - 1) {
      respaldo(data_pagos);
    }
  }

  function data_dedu(Historial_D, data1) {
    let suma_deducciones = 0;
    conexion.query(Historial_D, (err, r_d) => {
      if (err) {
        console.log(err);
        res.status(400);
        conexion.end();
      } else if (r_d.length == 0) {
        console.log("No tiene Deducciones");
        data1.suma_deducciones = suma_deducciones;
        calculo2(data1);
      } else {
        r_d.forEach((e2, i) => {
          let deduccion =
            "SELECT * FROM nomina_database.deducciones where descripcion_deduccion = " +
            `'${e2.deducciones}'`;
          conexion.query(deduccion, (err, r_dec) => {
            if (err) {
              console.log(err);
              res.status(400);
              conexion.end();
            } else {
              let quincena_deduccion =data1.salario_diario * data1.dias * (r_dec[0].monto_deduccion /100);
              suma_deducciones += quincena_deduccion;
              if (i == r_d.length - 1) {
                data1.suma_deducciones = suma_deducciones;
                calculo2(data1);
              }
            }
          });
        });
      }
      return;
    });
  }

  function data_boni(Historial_B, Historial_D, data1) {
    let suma_bonificaciones = 0;
    conexion.query(Historial_B, (err, r_b) => {
      if (err) {
        console.log(err);
        res.status(400);
        conexion.end();
      } else if (r_b.length == 0) {
        console.log("No tiene bonificaciones");
        data1.suma_bonificaciones = suma_bonificaciones;
        data_dedu(Historial_D, data1);
      } else {
        r_b.forEach((e, i) => {
          let bonificacion =
            "SELECT * FROM nomina_database.bonificaciones where descripcion_bonificacion = " +
            `'${e.bonificacion}'`;
          conexion.query(bonificacion, (err, r_bon) => {
            if (err) {
              console.log(err);
              res.status(400);
              conexion.end();
            } else {
              suma_bonificaciones += r_bon[0].monto_bonificacion;
              if (i == r_b.length - 1) {
                data1.suma_bonificaciones = suma_bonificaciones;
                data_dedu(Historial_D, data1);
              }
            }
          });
        });
      }
    });
  }

  function Calculo(array) {
    const fecha1 = new Date(Date.parse(fecha_cul));
    const fecha2 = new Date(Date.parse(fecha_ini));
    const diferencia = fecha1 - fecha2;
    const numeroDias = diferencia / (1000 * 60 * 60 * 24) + 1;
    const horas_totales = numeroDias * 8;
    array.forEach((element, index) => {
      let salario_diario = element.salario / 30;
      let salario_hora = salario_diario / horas_de_trabajo;
      let salario_dias_trabajados = horas_totales * salario_hora;
      let monto_base = salario_dias_trabajados;

      let Historial_B = `SELECT * FROM nomina_database.historialBonificacion WHERE id_empleado = ${element.idEmpleados}`;
      let Historial_D = `SELECT * FROM nomina_database.historialDeducciones WHERE id_empleado = ${element.idEmpleados}`;

      let data1 = {
        salario_mensual: element.salario,
        index: index,
        array: array.length,
        idEmpleado: element.idEmpleados,
        cedula: element.cedula,
        nombre: `${element.apellidos}, ${element.nombres}`,
        departamento: element.departamento,
        cargo: element.cargo,
        cuenta: element.numero_cuenta,
        correo: element.correo,
        dias: numeroDias,
        salario_diario,
        salario_hora,
        salario_dias_trabajados,
        monto_base,
        horas_totales,
      };

      data_boni(Historial_B, Historial_D, data1);
    });
  }

  function traer_empleados() {
    conexion.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        conexion.end();
      } else if (result.length == 0) {
        console.log(result);
        res.status(400).send({
          error: "No hay empleados registrados o activos",
        });
        conexion.end();
      } else {
        Calculo(result);
        res.status(200).send({ message: "Pre-Nomina Generada" });
      }
    });
  }

  function eliminar_H_horas() {
    conexion.query(del_horas, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        conexion.end();
      } else if (result.length != 0) {
        traer_empleados();
      }
    });
  }

  function eliminar_pre_nomina() {
    conexion.query(del, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400);
        conexion.end();
      } else if (result.length != 0) {
        eliminar_H_horas();
      }
    });
  }

  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400);
      conexion.end();
    } else if (result.length == 0) {
      traer_empleados();
    } else {
      eliminar_pre_nomina();
    }
  });
};
