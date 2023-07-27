-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema nomina_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nomina_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nomina_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci ;
USE `nomina_database` ;

-- -----------------------------------------------------
-- Table `nomina_database`.`Empresas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Empresas` (
  `idEmpresas` INT NOT NULL AUTO_INCREMENT,
  `rif` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(500) NOT NULL,
  `direccion` VARCHAR(500) NOT NULL,
  `telefono` VARCHAR(500) NOT NULL,
  `correo` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idEmpresas`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `nomina_database`.`Usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(500) NOT NULL,
  `username` VARCHAR(500) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nomina_database`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`cargos` (
  `idcargos` INT NOT NULL AUTO_INCREMENT,
  `cargo` VARCHAR(500) NOT NULL,
  `salario` INT NOT NULL,
  PRIMARY KEY (`idcargos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nomina_database`.`deducciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`deducciones` (
  `iddeducciones` INT NOT NULL AUTO_INCREMENT,
  `monto` INT NOT NULL,
  `descripcion` VARCHAR(5000) NOT NULL,
  PRIMARY KEY (`iddeducciones`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nomina_database`.`departamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`departamentos` (
  `iddepartamentos` INT NOT NULL AUTO_INCREMENT,
  `departamento` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`iddepartamentos`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `nomina_database`.`registro_horas` (
  `id_registro` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(255) NOT NULL,
  `apellidos` VARCHAR(255) NOT NULL,
  `horas_laboradas` INT NOT NULL,
  `horas_extras` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `idEmpleados` INT NOT NULL,
  PRIMARY KEY (`id_registro`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `nomina_database`.`Empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`empleados` (
  `idEmpleados` INT NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(100) NOT NULL,
  `nombres` VARCHAR(500) NOT NULL,
  `apellidos` VARCHAR(500) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `direccion` VARCHAR(10000) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(100) NOT NULL,
  `codigo_cargo` INT NOT NULL,
  `codigo_departamento` INT NOT NULL,
  `codigo_empresa` INT NOT NULL,
  `numero_cuenta` VARCHAR(20) NOT NULL,
  `antiguedad` DATE NOT NULL,
  `horas_trabajadas` INT NOT NULL,
  `horas_extras` INT NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEmpleados`),
  INDEX `fk_empleados_idx` (`codigo_empresa` ASC) ,
  INDEX `fk_cargo_idx` (`codigo_cargo` ASC) ,
  INDEX `fk_departamento_idx` (`codigo_departamento` ASC) ,
  CONSTRAINT `fk_empleados`
    FOREIGN KEY (`codigo_empresa`)
    REFERENCES `nomina_database`.`Empresas` (`idEmpresas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cargo`
    FOREIGN KEY (`codigo_cargo`)
    REFERENCES `nomina_database`.`cargos` (`idcargos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_departamento`
    FOREIGN KEY (`codigo_departamento`)
    REFERENCES `nomina_database`.`departamentos` (`iddepartamentos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `nomina_database`.`Bancos` (
  `idbancos` INT NOT NULL AUTO_INCREMENT,
  `codigo` numeric(4) not null,
  `nombre` VARCHAR(5000) NOT NULL,
  `cuenta` numeric(20) not null,
  PRIMARY KEY (`idbancos`))
ENGINE = InnoDB;


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
INSERT INTO `nomina_database`.`deducciones` (`monto`, `descripcion`) VALUES ('15', 'Impuestos + Seguro de Salud');
INSERT INTO `nomina_database`.`deducciones` (`monto`, `descripcion`) VALUES ('30', 'Impuestos + Seguro de Salud + Plan de Jubilacion');
INSERT INTO `nomina_database`.`Empresas` (`rif`, `nombre`, `direccion`, `telefono`, `correo`) VALUES ('J-31356421-4', 'Universidad Valle de Momboy', 'Carvajal', '02712351785', 'universidad@uvm.edu.ve');

INSERT INTO `nomina_database`.`Bancos` (codigo   ,nombre    ,cuenta) VALUES (    0108       ,'Banco Provincial'     ,'010803781501000'    );