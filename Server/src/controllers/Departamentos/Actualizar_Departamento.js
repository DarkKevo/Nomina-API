import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ActualizarDepartamento = (req, res) => {
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

    const { iddepartamentos, departamento } = req.body;

    let verify = 'SELECT * FROM nomina_database.departamentos where `iddepartamentos`= ' + `'${iddepartamentos}'`;

    let update = 'UPDATE nomina_database.departamentos SET `departamento`= ' + `'${departamento}'` + 'where `iddepartamentos`= ' + `'${iddepartamentos}'`;

    //Verificando la existencia del Departamento
    conexion.query(verify, (err, result) => {
        if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
        } else {
            if (result.length != 0) {
                //Actualizando el Departamento
                conexion.query(update, (err, results) => {
                    if (err) {
                        console.log(err);
                        conexion.end();
                        res.sendStatus(400);
                    } else {
                        //Departamento Actualizado
                        console.log(results);
                        conexion.end();
                        res.sendStatus(200);
                    }
                });
            } else {
                console.log("No existe el Departamento");
                conexion.end();
                res.sendStatus(400);
            }
        }
    });
};
