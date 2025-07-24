CREATE SCHEMA IF NOT EXISTS `padel` DEFAULT CHARACTER SET utf8;
USE `padel`;

-- -----------------------------------------------------
-- Table `padel`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `padel`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(255) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `padel`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `padel`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `padel`.`posicion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `padel`.`posicion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `padel`.`jugador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `padel`.`jugador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `apellido` VARCHAR(45) NULL,
  `fechaNac` DATE NULL,
  `telefono` INT NULL,
  `urlFoto` VARCHAR(45) NULL,
  `usuario_id` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  `posicion_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_jugador_usuario_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_jugador_categoria_idx` (`categoria_id` ASC) VISIBLE,
  INDEX `fk_jugador_posicion_idx` (`posicion_id` ASC) VISIBLE,
  CONSTRAINT `fk_jugador_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `padel`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_jugador_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `padel`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_jugador_posicion`
    FOREIGN KEY (`posicion_id`)
    REFERENCES `padel`.`posicion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `padel`.`club`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `padel`.`club` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `direccion` VARCHAR(45) NULL,
  `horaInicio` TIME NULL,
  `horaCierre` TIME NULL,
  `nombreResponsable` VARCHAR(45) NULL,
  `apellidoResponsable` VARCHAR(45) NULL,
  `telefonoClub` INT NULL,
  `precioTurno` INT NULL,
  `reglaCancelacion` VARCHAR(45) NULL,
  `reglaAdmision` VARCHAR(45) NULL,
  `cantCanchas` INT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_club_usuario_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_club_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `padel`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

