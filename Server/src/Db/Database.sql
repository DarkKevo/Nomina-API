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
  `monto_bonificacion` INT NOT NULL,
  PRIMARY KEY (`idbonificaciones`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`respaldo_pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`respaldo_pagos` (
  `idrespaldo_pagos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(500) NOT NULL,
  `cargo` VARCHAR(500) NOT NULL,
  `cuenta` VARCHAR(500) NOT NULL,
  `pagoDiasLaborales` INT NOT NULL,
  `pagoDiasExtras` INT NOT NULL,
  `pagoDiasDescanso` INT NOT NULL,
  `pagoTotal` INT NOT NULL,
  `idEmpleado` INT NOT NULL,
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`idrespaldo_pagos`))
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
AUTO_INCREMENT = 2
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
  `salario` INT(11) NOT NULL,
  PRIMARY KEY (`idcargos`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_spanish2_ci;


-- -----------------------------------------------------
-- Table `nomina_database`.`deducciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`deducciones` (
  `iddeducciones` INT(11) NOT NULL AUTO_INCREMENT,
  `monto_deduccion` INT(11) NOT NULL,
  `descripcion_deduccion` VARCHAR(5000) NOT NULL,
  PRIMARY KEY (`iddeducciones`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
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
AUTO_INCREMENT = 13
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
  `codigo_deduccion` INT NOT NULL,
  `pass` VARCHAR(100) NOT NULL,
  `codigo_bonificaciones` INT NOT NULL,
  PRIMARY KEY (`idEmpleados`),
  INDEX `fk_empleados_idx` (`codigo_empresa` ASC) ,
  INDEX `fk_cargo_idx` (`codigo_cargo` ASC) ,
  INDEX `fk_departamento_idx` (`codigo_departamento` ASC) ,
  INDEX `fk_deduccion_idx` (`codigo_deduccion` ASC) ,
  INDEX `fk_bonificacion_idx` (`codigo_bonificaciones` ASC) ,
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
    ON UPDATE CASCADE,
  CONSTRAINT `fk_deduccion`
    FOREIGN KEY (`codigo_deduccion`)
    REFERENCES `nomina_database`.`deducciones` (`iddeducciones`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bonificacion`
    FOREIGN KEY (`codigo_bonificaciones`)
    REFERENCES `nomina_database`.`bonificaciones` (`idbonificaciones`)
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
AUTO_INCREMENT = 2
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
INSERT INTO `nomina_database`.`deducciones` (`monto_deduccion`, `descripcion_deduccion`) VALUES ('15', 'Impuestos + Seguro de Salud');
INSERT INTO `nomina_database`.`deducciones` (`monto_deduccion`, `descripcion_deduccion`) VALUES ('30', 'Impuestos + Seguro de Salud + Plan de Jubilacion');

INSERT INTO `nomina_database`.`Bancos` (codigo   ,nombre    ,cuenta) VALUES (    0108       ,'Banco Provincial'     ,'010803781501000'    );


INSERT INTO `nomina_database`.`setup_banco_file` (idfile   ,idbancos    , separadores, tipo_file, columnasfile) VALUES (   1 , 1, ' ', 'txt','cuenta,cedula,monto, nombre , apellido');

INSERT INTO `nomina_database`.`bonificaciones` (`descripcion_bonificacion`, `monto_bonificacion`) VALUES ( 'Maternidad', 150 );