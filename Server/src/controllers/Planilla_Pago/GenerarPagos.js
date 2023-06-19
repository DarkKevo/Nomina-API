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
    'SELECT cedula, apellidos, nombres, cargo, monto_salario, descripcion, monto FROM nomina_database.empleados inner join nomina_database.cargos on (empleados.codigo_cargo = cargos.idcargos) inner join nomina_database.salario on (cargos.codigo_salario = salario.idsalario) inner join nomina_database.deducciones on (empleados.codigo_deduccion = iddeducciones)';

  function GenerarData(Data) {
    let Data_Planilla = [];
    Data.forEach((element) => {
      let Object = {
        cedula: element.cedula,
        apellidos: element.apellidos,
        nombres: element.nombres,
        cargo: element.cargo,
        monto_deduccion: element.monto,
        descripcion: element.descripcion,
        monto_de_pago: parseInt(element.monto_salario) - parseInt(element.monto),
      };
      Data_Planilla.push(Object);
    });
    res.send(Data_Planilla);
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
      conexion.end();
      GenerarData(result);
    }
  });
};
