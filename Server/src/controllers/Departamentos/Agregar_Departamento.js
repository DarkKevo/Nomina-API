import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const CrearDepartamento = (req, res) => {
  var conexion = mysql.createConnection({
    host: host,
    port: port,
    user: username,
    password: password,
    multipleStatements: true,
  });

  //

  conexion.connect(function (err) {
    if (err) {
      console.error('Error de conexion: ' + err.stack);
      return;
    }
  });

  const { departamento } = req.body;

  let verify = 'SELECT * FROM nomina_database.departamentos where `departamento`= ' + `'${departamento}'`;

  let query = 'INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ';

  query += `('${departamento}')`;

  //Verificando la existencia del Departamento
  conexion.query(verify, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else {
      if (result.length == 0) {
        //Creando el Departamento
        conexion.query(query, (err, results) => {
          if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
          } else {
            //Agregando el Departamento
            console.log(results);
            conexion.end();
            res.sendStatus(200);
          }
        });
      } else {
        console.log('Ya existe el Departamento :D');
        conexion.end();
        res.sendStatus(400);
      }
    }
  });
};
