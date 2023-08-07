-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nomina_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nomina_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci ;
USE `nomina_database` ;

CREATE TABLE IF NOT EXISTS `nomina_database`.`bonificaciones` (
  `idbonificaciones` INT NOT NULL AUTO_INCREMENT,
  `descripcion_bonificacion` VARCHAR(500) NOT NULL,
  `monto_bonificacion` FLOAT NOT NULL,
  PRIMARY KEY (`idbonificaciones`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`respaldo_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`respaldo_pagos` (
  `id_pagos` INT NOT NULL AUTO_INCREMENT,
  `idEmpleado` INT NOT NULL,
  `cedula` VARCHAR(500) NOT NULL,
  `nombre` VARCHAR(500) NOT NULL,
  `departamento` VARCHAR(500) NOT NULL,
  `cargo` VARCHAR(500) NOT NULL,
  `cuenta` VARCHAR(500) NOT NULL,
  `correo` VARCHAR(500) NOT NULL,
  `dias` VARCHAR(500) NOT NULL,
  `dias_descanso` VARCHAR(500) NOT NULL,
  `fechas` VARCHAR(500) NOT NULL,
  `horas_trabajadas` INT NOT NULL,
  `monto_base` FLOAT NOT NULL,
  `horas_extras` INT NOT NULL,
  `monto_extra` FLOAT NOT NULL,
  `monto_deduccion` FLOAT NOT NULL,
  `monto_bonificacion` FLOAT NOT NULL,
  `pagoTotal` FLOAT NOT NULL,
  `fecha_pago` DATE NOT NULL,
  PRIMARY KEY (`id_pagos`))
ENGINE = InnoDB;

USE `nomina_database` ;

-- -----------------------------------------------------
-- Table `nomina_database`.`Bancos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Bancos` (
  `idbancos` INT(11) NOT NULL AUTO_INCREMENT,
  `codigo` DECIMAL(4,0) NOT NULL,
  `nombre` VARCHAR(5000) NOT NULL,
  `cuenta` DECIMAL(20,0) NOT NULL,
  PRIMARY KEY (`idbancos`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`vacaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`vacaciones` (
  `id_vac` INT(11) NOT NULL AUTO_INCREMENT,
  `id_empleado` INT NOT NULL,
  `nombres` VARCHAR(400) NOT NULL,
  `apellidos` VARCHAR(400) NOT NULL,
  `vacaciones_acumuladas` INT NOT NULL,
  `vacaciones_usadas` INT NOT NULL,
  PRIMARY KEY (`id_vac`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`bonificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`historialBonificacion` (
  `id_b` INT(11) NOT NULL AUTO_INCREMENT,
  `id_empleado` INT NOT NULL,
  `nombres` VARCHAR(400) NOT NULL,
  `bonificacion` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_b`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`deducciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`historialDeducciones` (
  `id_d` INT(11) NOT NULL AUTO_INCREMENT,
  `id_empleado` INT NOT NULL,
  `nombres` VARCHAR(400) NOT NULL,
  `deducciones` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id_d`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`Empresas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Empresas` (
  `idEmpresas` INT(11) NOT NULL AUTO_INCREMENT,
  `rif` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(500) NOT NULL,
  `direccion` VARCHAR(500) NOT NULL,
  `telefono` VARCHAR(500) NOT NULL,
  `correo` VARCHAR(500) NOT NULL,
  `imageURL` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idEmpresas`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Usuarios` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(500) NOT NULL,
  `username` VARCHAR(500) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`cargos` (
  `idcargos` INT(11) NOT NULL AUTO_INCREMENT,
  `cargo` VARCHAR(500) NOT NULL,
  `salario` FLOAT NOT NULL,
  PRIMARY KEY (`idcargos`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`deducciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`deducciones` (
  `iddeducciones` INT(11) NOT NULL AUTO_INCREMENT,
  `monto_deduccion` FLOAT NOT NULL,
  `descripcion_deduccion` VARCHAR(5000) NOT NULL,
  PRIMARY KEY (`iddeducciones`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`departamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`departamentos` (
  `iddepartamentos` INT(11) NOT NULL AUTO_INCREMENT,
  `departamento` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`iddepartamentos`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`empleados` (
  `idEmpleados` INT(11) NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(100) NOT NULL,
  `nombres` VARCHAR(500) NOT NULL,
  `apellidos` VARCHAR(500) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `direccion` VARCHAR(10000) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(100) NOT NULL,
  `codigo_cargo` INT(11) NOT NULL,
  `codigo_departamento` INT(11) NOT NULL,
  `codigo_empresa` INT(11) NOT NULL,
  `numero_cuenta` VARCHAR(20) NOT NULL,
  `antiguedad` DATE NOT NULL,
  `horas_trabajadas` INT(11) NOT NULL,
  `horas_extras` INT(11) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEmpleados`),
  INDEX `fk_empleados_idx` (`codigo_empresa` ASC) ,
  INDEX `fk_cargo_idx` (`codigo_cargo` ASC) ,
  INDEX `fk_departamento_idx` (`codigo_departamento` ASC) ,
  CONSTRAINT `fk_cargo`
    FOREIGN KEY (`codigo_cargo`)
    REFERENCES `nomina_database`.`cargos` (`idcargos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_departamento`
    FOREIGN KEY (`codigo_departamento`)
    REFERENCES `nomina_database`.`departamentos` (`iddepartamentos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_empleados`
    FOREIGN KEY (`codigo_empresa`)
    REFERENCES `nomina_database`.`Empresas` (`idEmpresas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`registro_horas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`registro_horas` (
  `id_registro` INT(11) NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(255) NOT NULL,
  `apellidos` VARCHAR(255) NOT NULL,
  `horas_laboradas` INT(11) NOT NULL,
  `horas_extras` INT(11) NOT NULL,
  `fecha` DATE NOT NULL,
  `idEmpleados` INT(11) NOT NULL,
  PRIMARY KEY (`id_registro`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;

-- -----------------------------------------------------
-- Table `nomina_database`.`setup_banco_file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`setup_banco_file` (
  `idfile` INT(11) NOT NULL AUTO_INCREMENT,
  `idbancos` INT(11) NOT NULL,
  `separadores` VARCHAR(5000) NOT NULL,
  `tipo_file` VARCHAR(5000) NOT NULL,
  `columnasfile` VARCHAR(5000) NOT NULL,
  PRIMARY KEY (`idfile`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Administracion');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Finanzas');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Contabilidad');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Recursos Humanos');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Auditoria');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Marketing');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Relaciones Publicas');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Ventas');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Logistica');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Seguridad');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Investigacion y Desarrollo');
INSERT INTO `nomina_database`.`departamentos` (`departamento`) VALUES ('Sistemas');

INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Director Ejecutivo (CEO)', '200');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Gestor de Seguridad', '100');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Reclutador', '80');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Analista Financiero', '100');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Supervisor', '80');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Auditor', '80');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Tesorero', '100');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Desarrollador Movil', '100');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Seguridad Informatica', '100');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Productor de Software', '100');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Analista de Mercado', '100');
INSERT INTO `nomina_database`.`cargos` (`cargo`, `salario`) VALUES ('Empleado (Normal)', '80');
INSERT INTO `nomina_database`.`deducciones` (`monto_deduccion`, `descripcion_deduccion`) VALUES ('4', 'Seguro Social SSO');
INSERT INTO `nomina_database`.`deducciones` (`monto_deduccion`, `descripcion_deduccion`) VALUES ('5', 'Regimen Prestacional');
INSERT INTO `nomina_database`.`deducciones` (`monto_deduccion`, `descripcion_deduccion`) VALUES ('1', 'Retención de Ley de Politica habitacional ');
INSERT INTO `nomina_database`.`deducciones` (`monto_deduccion`, `descripcion_deduccion`) VALUES ('10', 'Seguro Social Patronal');
INSERT INTO `nomina_database`.`deducciones` (`monto_deduccion`, `descripcion_deduccion`) VALUES ('2', 'Regimen Prestacional de Empleo');
INSERT INTO `nomina_database`.`deducciones` (`monto_deduccion`, `descripcion_deduccion`) VALUES ('2', 'Ley de Politica Habitacional (LPH)');

INSERT INTO `nomina_database`.`Bancos` (codigo   ,nombre    ,cuenta) VALUES (    0108       ,'Banco Provincial'     ,'010803781501000'    );


INSERT INTO `nomina_database`.`setup_banco_file` (idfile   ,idbancos    , separadores, tipo_file, columnasfile) VALUES (   1 , 1, ' ', 'txt','cuenta,cedula,monto, nombre , apellido');

INSERT INTO `nomina_database`.`bonificaciones` (`descripcion_bonificacion`, `monto_bonificacion`) VALUES ('Sin Bonificacion', 0);
INSERT INTO `nomina_database`.`bonificaciones` (`descripcion_bonificacion`, `monto_bonificacion`) VALUES ( 'Rendimiento', 250);
INSERT INTO `nomina_database`.`empresas` (`idEmpresas`, `rif`, `nombre`, `direccion`, `telefono`, `correo`, `imageURL`) VALUES ('1', 'J-31356421-4 ', 'Universidad Valle de Momboy', 'Carvajal', '02712351785', 'universidad@edu.ve', 'https://uvm.edu.ve/wp-content/uploads/2022/10/LOGO-RIF.png');




INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-30259086', 'Kevin Alejandro', 'Araujo Gonzalez', '2004-02-07', 'La Arboleda', 'kevinaraujogonzalez@gmail.com', '04145789632', '1', '1', '1', '01020304751247000125', '2022-05-01', '88', '0', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-30259085', 'Jose Mauricio', 'Camacho Angarita', '2004-02-07', 'Sabanalibre', 'jose@gmail.com', '04141234567', '1', '1', '1', '01020378150100067152', '2023-05-04', '32', '0', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-30259084', 'Victoria', 'Gonzalez', '2004-02-07', 'Carvajal', 'victoria@gmail.com', '04145789122', '1', '1', '1', '0108037815010006854', '2023-08-01', '24', '0', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-30259083', 'Yerson', 'Gonzalez', '2004-02-07', 'Carvajal', 'yerson@gmail.com', '04145789632', '1', '1', '1', '01020304751247000125', '2022-07-07', '24', '0', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-27268361', 'Roberto', 'Michelle', '2004-02-07', 'La Arboleda', 'roberto@gmail.com', '04145789632', '1', '1', '1', '01020304751247000125', '2023-03-02', '24', '0', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-27268081', 'Yumary', 'Valecillos', '2004-02-07', 'Trujillo', 'yumaryz@gmail.com', '04145789631', '1', '1', '1', '01080304751247000125', '2022-04-07', '8', '2', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-1512595', 'Juan Andres', 'Araujo Gonzalez', '2004-02-07', 'Trujillo', 'juanandres@gmail.com', '04145789632', '1', '1', '1', '01020304751247000125', '2023-04-12', '8', '0', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-30259087', 'Jose Carlos', 'Araujo Gonzalez', '2004-02-07', 'La Arboleda', 'josecarlos@gmail.com', '041457891234', '1', '1', '1', '01080304751247015425', '2023-05-01', '8', '2', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-30259088', 'Matheos Jose', 'Rosales', '2004-02-07', 'La Arboleda', 'matheus@gmail.com', '04145789632', '1', '1', '1', '0102058745247000125', '2023-05-07', '24', '7', 'activo');
INSERT INTO `nomina_database`.`empleados` (`cedula`, `nombres`, `apellidos`, `fecha_nacimiento`, `direccion`, `correo`, `telefono`, `codigo_cargo`, `codigo_departamento`, `codigo_empresa`, `numero_cuenta`, `antiguedad`, `horas_trabajadas`, `horas_extras`, `estado`) VALUES ('V-30259090', 'Orlando Jose', 'Angarita', '2004-02-07', 'Valera', 'orlando@gmail.com', '04145789157', '1', '1', '1', '01020304751247111358', '2023-01-10', '24', '4', 'activo');

INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-01', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-02', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-03', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-04', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-05', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-06', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-07', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-08', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-09', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-10', '1');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Kevin Alejandro', 'Araujo Gonzalez', '8', '0', '2023-07-11', '1');

INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Jose Mauricio', 'Camacho Angarita', '8', '0', '2023-07-11', '2');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Jose Mauricio', 'Camacho Angarita', '8', '0', '2023-07-12', '2');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Jose Mauricio', 'Camacho Angarita', '8', '0', '2023-07-13', '2');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Jose Mauricio', 'Camacho Angarita', '8', '0', '2023-07-14', '2');


INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Victoria', 'Gonzalez', '8', '0', '2023-07-13', '3');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Victoria', 'Gonzalez', '8', '0', '2023-07-14', '3');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Victoria', 'Gonzalez', '8', '0', '2023-07-15', '3');


INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Yerson', 'Gonzalez', '8', '0', '2023-07-13', '4');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Yerson', 'Gonzalez', '8', '0', '2023-07-14', '4');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Yerson', 'Gonzalez', '8', '0', '2023-07-15', '4');

INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Roberto', 'Michelle', '8', '0', '2023-07-13', '5');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Roberto', 'Michelle', '8', '0', '2023-07-14', '5');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Roberto', 'Michelle', '8', '0', '2023-07-15', '5');

INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Yumary', 'Valecillos', '8', '2', '2023-07-13', '6');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Juan Andres', 'Araujo Gonzalez', '8', '0', '2023-07-14', '7');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Jose Carlos', 'Araujo Gonzalez', '8', '2', '2023-07-15', '8');

INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Matheos Jose', 'Rosales', '8', '3', '2023-07-13', '9');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Matheos Jose', 'Rosales', '8', '2', '2023-07-14', '9');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Matheos Jose', 'Rosales', '8', '2', '2023-07-15', '9');

INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Orlando Jose', 'Angarita', '8', '0', '2023-07-13', '10');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Orlando Jose', 'Angarita', '8', '4', '2023-07-14', '10');
INSERT INTO `nomina_database`.`registro_horas` (`nombres`, `apellidos`, `horas_laboradas`, `horas_extras`, `fecha`, `idEmpleados`) VALUES ('Orlando Jose', 'Angarita', '8', '0', '2023-07-15', '10');

INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('1', 'Kevin Alejandro', 'Araujo Gonzalez', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('2', 'Jose Mauricio', 'Camacho Angarita', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('3', 'Victoria', 'Gonzalez', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('4', 'Yerson', 'Gonzalez', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('5', 'Roberto', 'Michelle', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('6', 'Yumary', 'Valecillos', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('7', 'Juan Andres', 'Araujo Gonzalez', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('8', 'Jose Carlos', 'Araujo Gonzalez', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('9', 'Matheos Jose', 'Rosales', '0', '0');
INSERT INTO `nomina_database`.`vacaciones` (`id_empleado`, `nombres`, `apellidos`, `vacaciones_acumuladas`, `vacaciones_usadas`) VALUES ('10', 'Orlando Jose', 'Angarita', '0', '0');


INSERT INTO `nomina_database`.`historialbonificacion` (`id_empleado`, `nombres`, `bonificacion`) VALUES ('1', 'Kevin Peña', 'Rendimiento');
INSERT INTO `nomina_database`.`historialbonificacion` (`id_empleado`, `nombres`, `bonificacion`) VALUES ('2', 'Jose Mauricio Camacho Angarita', 'Rendimiento');
INSERT INTO `nomina_database`.`historialbonificacion` (`id_empleado`, `nombres`, `bonificacion`) VALUES ('4', 'Yerson Gonzalez', 'Rendimiento');
INSERT INTO `nomina_database`.`historialbonificacion` (`id_empleado`, `nombres`, `bonificacion`) VALUES ('5', 'Roberto	Michelle', 'Rendimiento');
INSERT INTO `nomina_database`.`historialbonificacion` (`id_empleado`, `nombres`, `bonificacion`) VALUES ('10', 'Orlando Jose Angarita', 'Rendimiento');

