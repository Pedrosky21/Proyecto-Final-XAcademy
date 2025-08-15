-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `userType` ENUM('Jugador', 'Club', 'Pendiente') NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`club`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`club` (
  `idclub` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `direccion` VARCHAR(255) NULL DEFAULT NULL,
  `horaInicio` TIME NULL DEFAULT NULL,
  `horaCierre` TIME NULL DEFAULT NULL,
  `nombreResponsable` VARCHAR(255) NULL DEFAULT NULL,
  `apellidoResponsable` VARCHAR(255) NULL DEFAULT NULL,
  `telefonoClub` VARCHAR(255) NULL DEFAULT NULL,
  `precioTurno` INT NULL DEFAULT NULL,
  `reglaCancelacion` VARCHAR(255) NULL DEFAULT NULL,
  `reglaAdmision` VARCHAR(255) NULL DEFAULT NULL,
  `usuario_idusuario` INT NOT NULL,
  PRIMARY KEY (`idclub`),
  INDEX `fk_clubes_usuarios1_idx` (`usuario_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_clubes_usuarios1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`materialpared`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`materialpared` (
  `idmaterialpared` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idmaterialpared`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`materialsuelo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`materialsuelo` (
  `idmaterialSuelo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idmaterialSuelo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`cancha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cancha` (
  `techada` TINYINT NOT NULL DEFAULT '1',
  `club_idclub` INT NOT NULL,
  `idcancha` INT NOT NULL AUTO_INCREMENT,
  `materialPared_idmaterialpared` INT NOT NULL,
  `materialSuelo_idmaterialSuelo` INT NOT NULL,
  PRIMARY KEY (`idcancha`),
  INDEX `fk_cancha_clubes1_idx` (`club_idclub` ASC) VISIBLE,
  INDEX `fk_cancha_materialPared1_idx` (`materialPared_idmaterialpared` ASC) VISIBLE,
  INDEX `fk_cancha_materialSuelo1_idx` (`materialSuelo_idmaterialSuelo` ASC) VISIBLE,
  CONSTRAINT `fk_cancha_clubes1`
    FOREIGN KEY (`club_idclub`)
    REFERENCES `mydb`.`club` (`idclub`),
  CONSTRAINT `fk_cancha_materialPared1`
    FOREIGN KEY (`materialPared_idmaterialpared`)
    REFERENCES `mydb`.`materialpared` (`idmaterialpared`),
  CONSTRAINT `fk_cancha_materialSuelo1`
    FOREIGN KEY (`materialSuelo_idmaterialSuelo`)
    REFERENCES `mydb`.`materialsuelo` (`idmaterialSuelo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idcategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`equipo` (
  `idequipo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idequipo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`estadopartido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`estadopartido` (
  `idestadoturno` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idestadoturno`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`estadoturno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`estadoturno` (
  `idestadoturno` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idestadoturno`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`turno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`turno` (
  `fechaHoraInicio` DATETIME NOT NULL,
  `fechaHoraFin` DATETIME NULL DEFAULT NULL,
  `idturno` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `cancha_idcancha` INT NOT NULL,
  `estadoturno_idestadoturno` INT NOT NULL,
  PRIMARY KEY (`idturno`),
  INDEX `fk_turno_cancha1_idx` (`cancha_idcancha` ASC) VISIBLE,
  INDEX `fk_turno_estadoturno1_idx` (`estadoturno_idestadoturno` ASC) VISIBLE,
  CONSTRAINT `fk_turno_cancha1`
    FOREIGN KEY (`cancha_idcancha`)
    REFERENCES `mydb`.`cancha` (`idcancha`),
  CONSTRAINT `fk_turno_estadoturno1`
    FOREIGN KEY (`estadoturno_idestadoturno`)
    REFERENCES `mydb`.`estadoturno` (`idestadoturno`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`partido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`partido` (
  `idpartido` INT NOT NULL AUTO_INCREMENT,
  `techada` TINYINT NULL DEFAULT NULL,
  `turno_idturno` INT NULL DEFAULT NULL,
  `materialPared_idmaterialpared` INT NOT NULL,
  `materialSuelo_idmaterialSuelo` INT NOT NULL,
  `estadopartido_idestadoturno` INT NOT NULL,
  PRIMARY KEY (`idpartido`),
  INDEX `fk_partido_turno1_idx` (`turno_idturno` ASC) VISIBLE,
  INDEX `fk_partido_materialPared1_idx` (`materialPared_idmaterialpared` ASC) VISIBLE,
  INDEX `fk_partido_materialSuelo1_idx` (`materialSuelo_idmaterialSuelo` ASC) VISIBLE,
  INDEX `fk_partido_estadopartido1_idx` (`estadopartido_idestadoturno` ASC) VISIBLE,
  CONSTRAINT `fk_partido_estadopartido1`
    FOREIGN KEY (`estadopartido_idestadoturno`)
    REFERENCES `mydb`.`estadopartido` (`idestadoturno`),
  CONSTRAINT `fk_partido_materialPared1`
    FOREIGN KEY (`materialPared_idmaterialpared`)
    REFERENCES `mydb`.`materialpared` (`idmaterialpared`),
  CONSTRAINT `fk_partido_materialSuelo1`
    FOREIGN KEY (`materialSuelo_idmaterialSuelo`)
    REFERENCES `mydb`.`materialsuelo` (`idmaterialSuelo`),
  CONSTRAINT `fk_partido_turno1`
    FOREIGN KEY (`turno_idturno`)
    REFERENCES `mydb`.`turno` (`idturno`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`equipoxpartido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`equipoxpartido` (
  `idequipoxpartido` INT NOT NULL AUTO_INCREMENT,
  `equipocreador` TINYINT NULL DEFAULT '1',
  `partido_idpartido` INT NOT NULL,
  `equipo_idequipo` INT NOT NULL,
  PRIMARY KEY (`idequipoxpartido`),
  INDEX `fk_equipoxpartido_partido1_idx` (`partido_idpartido` ASC) VISIBLE,
  INDEX `fk_equipoxpartido_equipo1_idx` (`equipo_idequipo` ASC) VISIBLE,
  CONSTRAINT `fk_equipoxpartido_equipo1`
    FOREIGN KEY (`equipo_idequipo`)
    REFERENCES `mydb`.`equipo` (`idequipo`),
  CONSTRAINT `fk_equipoxpartido_partido1`
    FOREIGN KEY (`partido_idpartido`)
    REFERENCES `mydb`.`partido` (`idpartido`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`franjahoraria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`franjahoraria` (
  `idfranjahoraria` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL DEFAULT NULL,
  `horaInicio` TIME NULL DEFAULT NULL,
  `horaFin` TIME NULL DEFAULT NULL,
  `partido_idpartido` INT NOT NULL,
  PRIMARY KEY (`idfranjahoraria`),
  INDEX `fk_franjahoraria_partido_idx` (`partido_idpartido` ASC) VISIBLE,
  CONSTRAINT `fk_franjahoraria_partido1`
    FOREIGN KEY (`partido_idpartido`)
    REFERENCES `mydb`.`partido` (`idpartido`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`posicion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`posicion` (
  `idposicion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idposicion`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`jugador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`jugador` (
  `idjugador` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `apellido` VARCHAR(255) NULL DEFAULT NULL,
  `fechaNac` DATE NULL DEFAULT NULL,
  `telefono` VARCHAR(255) NULL DEFAULT NULL,
  `urlFoto` VARCHAR(255) NULL DEFAULT NULL,
  `usuario_idusuario` INT NOT NULL,
  `categoria_idcategoria` INT NOT NULL,
  `posicion_idposicion` INT NOT NULL,
  PRIMARY KEY (`idjugador`),
  INDEX `fk_jugadores_usuarios1_idx` (`usuario_idusuario` ASC) VISIBLE,
  INDEX `fk_jugadores_categoria1_idx` (`categoria_idcategoria` ASC) VISIBLE,
  INDEX `fk_jugadores_posicion1_idx` (`posicion_idposicion` ASC) VISIBLE,
  CONSTRAINT `fk_jugadores_categoria1`
    FOREIGN KEY (`categoria_idcategoria`)
    REFERENCES `mydb`.`categoria` (`idcategoria`),
  CONSTRAINT `fk_jugadores_posicion1`
    FOREIGN KEY (`posicion_idposicion`)
    REFERENCES `mydb`.`posicion` (`idposicion`),
  CONSTRAINT `fk_jugadores_usuarios1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;
	

-- -----------------------------------------------------
-- Table `mydb`.`jugadorxequipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`jugadorxequipo` (
  `idjugadorxequipo` INT NOT NULL AUTO_INCREMENT,
  `creador` TINYINT NULL DEFAULT NULL,
  `jugador_idjugador` INT NOT NULL,
  `equipo_idequipo` INT NOT NULL,
  PRIMARY KEY (`idjugadorxequipo`),
  INDEX `fk_jugadorxequipo_jugadores1_idx` (`jugador_idjugador` ASC) VISIBLE,
  INDEX `fk_jugadorxequipo_equipo1_idx` (`equipo_idequipo` ASC) VISIBLE,
  CONSTRAINT `fk_jugadorxequipo_equipo1`
    FOREIGN KEY (`equipo_idequipo`)
    REFERENCES `mydb`.`equipo` (`idequipo`),
  CONSTRAINT `fk_jugadorxequipo_jugadores1`
    FOREIGN KEY (`jugador_idjugador`)
    REFERENCES `mydb`.`jugador` (`idjugador`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- Usuarios
INSERT INTO `mydb`.`usuario` (`email`, `password`) VALUES 
  ('miguelclub@gmail.com', 'miguelclub'),
  ('migueljugador@email.com', 'migueljugador'),
  ('pedroclub@gmail.com', 'pedroclub'),
  ('pedrojugador@email.com', 'pedrojugador'),
  ('pocheclub@gmail.com', 'pocheclub'),
  ('pochejugador@email.com', 'pochejugador');

-- Categoría (asumimos que la columna es `descripcion`, no `description`)
INSERT INTO `mydb`.`categoria` (`nombre`, `descripcion`) VALUES
  ('Principiante','Estoy aprendiendo'),
  ('Aficionado','Juego por diversión'),
  ('Avanzado','Me lo tomo en serio'),
  ('Profesional','Me lo tomo muy en serio');

-- Posición
INSERT INTO `mydb`.`posicion` (`nombre`, `descripcion`) VALUES
  ('Drive','Juego por derecha'),
  ('Reves','Juego por izquierda'),
  ('Ambas','Juego donde haga falta');

-- Material de pared
INSERT INTO `mydb`.`materialPared` (`nombre`) VALUES
  ('Ladrillo'),
  ('Concreto'),
  ('Vidrio común'),
  ('Vidrio reforzado');

-- Material de suelo
INSERT INTO `mydb`.`materialSuelo` (`nombre`) VALUES
  ('Cesped artificial'),
  ('Resina cintetica'),
  ('Cemento'),
  ('Hormigon poroso');

-- Estado turno
INSERT INTO `mydb`.`estadoturno` (`nombre`, `descripcion`) VALUES
  ('Disponible','Se puede reservar'),
  ('Reservado','Alguien piensa jugarlo'),
  ('Cobrado','Se pago'),
  ('En curso','Esta ocurriendo'),
  ('Finalizado','Ya termino');

-- Estado partido
INSERT INTO `mydb`.`estadopartido` (`nombre`, `descripcion`) VALUES
  ('Creado','Aun no tiene rival'),
  ('Pendiente reserva','Tiene rival'),
  ('Confirmado','Tiene una cancha'),
  ('En curso','Esta ocurriendo'),
  ('Finalizado','Ya termino');


-- Club
INSERT INTO `mydb`.`club` (
  nombre, direccion, horaInicio, horaCierre,
  nombreResponsable, apellidoResponsable,
  telefonoClub, precioTurno,
  reglaCancelacion, reglaAdmision,
  usuario_idusuario
) VALUES (
  'Club Central', 'Av. Padel 123', '08:00:00', '23:00:00',
  'Juan', 'Pérez',
  123456789, 1500,
  'Cancelar 24h antes', 'Solo socios',
  1
);

-- Cancha
INSERT INTO `mydb`.`cancha` (
  techada,
  club_idclub,
  materialPared_idmaterialpared,
  materialSuelo_idmaterialSuelo
) VALUES (
  1,  -- techada = true
  1,  -- club_idclub
  1,  -- materialPared_idmaterialpared
  1   -- materialSuelo_idmaterialSuelo
);


-- Turno
INSERT INTO mydb.turno (
  fechaHoraInicio,
  fechaHoraFin,
  nombre,
  cancha_idcancha,
  estadoturno_idestadoturno
) VALUES (
  '2025-08-05 14:00:00',
  '2025-08-05 15:00:00',
  'Turno de prueba',
  1,
  1
);
