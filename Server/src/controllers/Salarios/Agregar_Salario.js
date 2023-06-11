import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const CrearSalario = (req, res) => {
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

    const { monto_salario } = req.body;

    let verify = 'SELECT * FROM nomina_database.salario where `monto_salario`= ' + `'${monto_salario}'`;

    let query = 'INSERT INTO `nomina_database`.`salario` (`monto_salario`) VALUES ';

    query += `('${monto_salario}')`;

    //Verificando la existencia del salario
    conexion.query(verify, (err, result) => {
        if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
        } else {
            if (result.length == 0) {
                //Creando el Salario
                conexion.query(query, (err, results) => {
                    if (err) {
                        console.log(err);
                        conexion.end();
                        res.sendStatus(400);
                    } else {
                        //Agregando el Salario
                        console.log(results);
                        conexion.end();
                        res.sendStatus(200);
                    }
                });
            } else {
                console.log("Ya existe el salario");
                conexion.end();
                res.sendStatus(400);
            }
        }
    });
};
