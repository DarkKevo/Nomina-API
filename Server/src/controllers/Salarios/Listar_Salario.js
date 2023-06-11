import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

export const ListarSalario = (req, res) => {
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

    let query = 'SELECT * FROM nomina_database.salario';

    //Verificando la existencia de los salarios
    conexion.query(query, (err, result) => {
        if (err) {
            console.log(err);
            conexion.end();
            res.sendStatus(400);
        } else if (result.length == 0){
            //La Tabla de salario no tiene datos
            console.log(result);
            conexion.end();
            res.sendStatus(400);
        }else {
            //Salarios Listados
            console.log(result);
            conexion.end();
            res.sendStatus(200);
        }
    });
};
