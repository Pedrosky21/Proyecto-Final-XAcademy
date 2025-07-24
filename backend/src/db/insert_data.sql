USE padel;

-- POSICION
INSERT INTO padel.posicion (nombre) 
VALUES
('Drive'),
('Reves');


-- CATEGORIA
INSERT INTO padel.categoria (nombre)
VALUES
('Primera'),
('Segunda'),
('Tercera'),
('Cuarta'),
('Quinta'),
('Sexta'),
('Septima');


-- USUARIO
INSERT INTO padel.usuario (email, passwd)
VALUES
('pedroarreguez21@gmail.com', '123456'),
('pedro2@email.com', '123456');


-- JUGADOR
INSERT INTO padel.jugador (nombre, apellido, fechaNac, telefono, urlFoto, usuario_id, categoria_id, posicion_id)
VALUES
('Pedro', 'Arreguez', '2001-12-21', '12345678', 'url', 1, 7, 1);


-- CLUB
INSERT INTO padel.club (nombre, direccion, horaInicio, horaCierre, nombreResponsable, apellidoResponsable, 
telefonoClub, precioTurno, reglaCancelacion, reglaAdmision, cantCanchas, usuario_id)
VALUES
('Club 1', 'Direccion 123', '08:00', '20:00', 'Dueño', 'ApellidoDueño', 
'12345678', 1000, 'Regla Cancelacion', 'Regla Admision', 3, 2);
