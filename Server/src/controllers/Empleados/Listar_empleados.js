import mysql from 'mysql2';

import { host, port, username, password } from '../../Config/MySqlConfig.js';

import {paginate} from '../Pagination/Pagination.js'

export const ListarEmpleado = (req, res) => {

  let pagina = parseInt(req.query.page);
  let limite = parseInt(req.query.limit);

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

  let query =  `SELECT E.idEmpleados,
	E.cedula,
	E.nombres,
	E.apellidos,
	E.fecha_nacimiento,
	E.correo,
	E.telefono,
	c.cargo codigo_cargo,
	d.departamento codigo_departamento,
	em.nombre codigo_empresa, 
  E.numero_cuenta,
	E.antiguedad,
	E.estado
FROM nomina_database.empleados E,
nomina_database.cargos c,
nomina_database.departamentos d,
nomina_database.Empresas em
where c.idcargos = E.codigo_cargo
and d.iddepartamentos = E.codigo_departamento
and em.idEmpresas = E.codigo_empresa`;

  //Verificando la existencia de los empleados
  conexion.query(query, (err, result) => {
    if (err) {
      console.log(err);
      conexion.end();
      res.sendStatus(400);
    } else if (result.length == 0) {
      //La Tabla de empleados no tiene datos
      console.log(result);
      conexion.end();
      res.status(400).send({error:'no hay datos'})
    } else {
      //Empleados Listados
      conexion.end();
      res.send(paginate(result, pagina, limite));
    }
  });
};
