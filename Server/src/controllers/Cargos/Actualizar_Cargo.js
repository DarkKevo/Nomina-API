import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ActualizarCargo = (req, res) => {
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

  const { idcargos, cargo, salario } = req.body;

  let verify = 'SELECT * FROM nomina_database.cargos where `idcargos`= ' + `'${idcargos}'`;

  let update = 'UPDATE nomina_database.cargos SET `cargo`= ' + `'${cargo}'` + ',`salario`= ' + `'${salario}'` + ' where `idcargos`= ' + `'${idcargos}'`;

  //Verificando la existencia del cargo
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Actualizando el Cargo
        conexion.query(update, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Cargo Actualizado
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('No existe el cargo');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
