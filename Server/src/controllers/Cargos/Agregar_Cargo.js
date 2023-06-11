import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const CrearCargo = (req, res) => {
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

    const { cargo, monto_salario } = req.body;

    let codigo_salario;

    let verify = 'SELECT * FROM nomina_database.cargos where `cargo`= ' + `'${cargo}'`;

    let get_id = 'SELECT idsalario FROM nomina_database.salario where `monto_salario`= ' + `'${monto_salario}'`;

    let query = 'INSERT INTO `nomina_database`.`cargos` (`cargo`, `codigo_salario`) VALUES ';

    query += `('${cargo}',`;

    //Verificando la existencia del cargo
    conexion.query(verify, (err, result) => {
        if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
        } else {
            if (result.length == 0) {
                //Obteniendo el id del salario
                conexion.query(get_id, (err, results) => {
                    if (err) {
                        console.log(err);
                        conexion.end();
                        res.sendStatus(400);
                    } else {
                        //Guardando id
                        codigo_salario = results[0].idsalario;
                        //Guardando query
                        query += ` ${codigo_salario})`;

                        //Agregando el Cargo
                        conexion.query(query, (err, results) => {
                            if (err) {
                                console.log(err);
                                conexion.end();
                                res.sendStatus(400);
                            } else {
                                console.log(results);
                                conexion.end();
                                res.sendStatus(200);
                            }
                        });
                    }
                });
            } else {
                console.log("Ya existe el cargo");
                conexion.end();
                res.sendStatus(400);
            }
        }
    });
};
