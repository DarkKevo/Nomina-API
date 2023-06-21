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

  const { idcargos, cargo, monto_salario } = req.body;

  let codigo_salario;

  let verify = 'SELECT * FROM nomina_database.cargos where `idcargos`= ' + `'${idcargos}'`;

  let get_id = 'SELECT idsalario FROM nomina_database.salario where `monto_salario`= ' + `'${monto_salario}'`;


  let update =
    'UPDATE nomina_database.cargos SET `cargo`= ' +
    `'${cargo}'`;

  //Verificando la existencia del cargo
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length != 0) {
        //Obteniendo el id del salario
        conexion.query(get_id, (err, results) => {
          if (err) {
            //No existe el salario
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else if (results == 0) {
            console.log("El salario no existe");
            conexion.end();
            res.sendStatus(400);
          } else {
            //Guardando id
            codigo_salario = results[0].idsalario;
            //Guardando query
            update += ', `codigo_salario`= ' + `'${codigo_salario}'` + 'where `idcargos`= ' + `'${idcargos}'`;
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
