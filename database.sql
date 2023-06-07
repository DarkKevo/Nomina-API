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


-- -----------------------------------------------------
-- Table `nomina_database`.`salario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`salario` (
  `idsalario` INT NOT NULL AUTO_INCREMENT,
  `monto_salario` INT NOT NULL,
  PRIMARY KEY (`idsalario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `nomina_database`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`cargos` (
  `idcargos` INT NOT NULL AUTO_INCREMENT,
  `cargo` VARCHAR(500) NOT NULL,
  `codigo_salario` INT NOT NULL,
  PRIMARY KEY (`idcargos`),
  INDEX `fk_salario_idx` (`codigo_salario` ASC) VISIBLE,
  CONSTRAINT `fk_salario`
    FOREIGN KEY (`codigo_salario`)
    REFERENCES `nomina_database`.`salario` (`idsalario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
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


-- -----------------------------------------------------
-- Table `nomina_database`.`Empleados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nomina_database`.`Empleados` (
  `idEmpleados` INT NOT NULL AUTO_INCREMENT,
  `cedula` VARCHAR(100) NOT NULL,
  `nombres` VARCHAR(500) NOT NULL,
  `apellidos` VARCHAR(500) NOT NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `direccion` VARCHAR(10000) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `codigo_cargo` INT NOT NULL,
  `codigo_departamento` INT NOT NULL,
  `codigo_deduccion` INT NOT NULL,
  `codigo_empresa` INT NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEmpleados`),
  INDEX `fk_empleados_idx` (`codigo_empresa` ASC) VISIBLE,
  INDEX `fk_cargo_idx` (`codigo_cargo` ASC) VISIBLE,
  INDEX `fk_deduccion_idx` (`codigo_deduccion` ASC) VISIBLE,
  INDEX `fk_departamento_idx` (`codigo_departamento` ASC) VISIBLE,
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
  CONSTRAINT `fk_deduccion`
    FOREIGN KEY (`codigo_deduccion`)
    REFERENCES `nomina_database`.`deducciones` (`iddeducciones`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_departamento`
    FOREIGN KEY (`codigo_departamento`)
    REFERENCES `nomina_database`.`departamentos` (`iddepartamentos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
