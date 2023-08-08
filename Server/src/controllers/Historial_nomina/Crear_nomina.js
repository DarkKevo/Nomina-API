import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const Agregarnomina = (req, res) => {
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

  const {id_nomina, fecha_inicial, fecha_final, monto_nomina} = req.body;

  let verify = 'SELECT * FROM nomina_database.historial_de_nomina where `id_nomina`= ' + `'${id_nomina}'`;


  let query =
  "INSERT INTO `nomina_database`.`historial_de_nomina` (`fecha_inicial`,`fecha_final`,`monto_nomina`) VALUES ";

query += `('${fecha_inicial}', '${fecha_final} ', '${monto_nomina}')`;



  //Verificando la existencia de la nomina
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        //Creando la nomina
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Agregando la nomina
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe la nomina');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
