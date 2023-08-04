import mysql from "mysql2";
import upload from "../../middleware/multer.js";
import cloudinary from "../../utilities/cloudinary.js";
import { host, port, username, password } from "../../Config/MySqlConfig.js";

export const CrearEmpresa = async (req, res) => {
  var conexion = mysql.createConnection({
    host: host,
    port: port,
    user: username,
    password: password,
    multipleStatements: true,
  });

  conexion.connect(function (err) {
    if (err) {
      console.error("Error de conexion: " + err.stack);
      return;
    }
  });

  try {
   /* const archivo = req.file;
    console.log("Archivo recibido:", archivo);
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No se proporcionó ningún archivo de imagen" });
    }
    const result = await cloudinary.uploader.upload(req.file);
    if (!result || !result.secure_url) {
      return res.status(500).json({ error: "Error al subir la imagen" });
    }

    const imageUrl = result.secure_url;*/
    const { rif, nombre, direccion, telefono, correo } = req.body;

    let verify = "SELECT * FROM nomina_database.Empresas";

    let query =
      "INSERT INTO `nomina_database`.`Empresas` (`idEmpresas`,`imageURL`,`rif`, `nombre`, `direccion` , `telefono` , `correo` ) VALUES ";

    query += `(1,'', '${rif} ', '${nombre}', '${direccion}', '${telefono}', '${correo}')`;

    conexion.query(verify, (err, result) => {
      if (err) {
        console.log(err);
        conexion.end();
        res.sendStatus(400);
      } else {
        if (result.length == 0) {
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
        } else {
          res.status(400).send({ error: "ya existe una empresa" });
          conexion.end();
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al subir la imagen" });
  }
};
