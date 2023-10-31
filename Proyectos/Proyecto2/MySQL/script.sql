CREATE DATABASE calificaciones;
USE calificaciones;

CREATE TABLE alumno(
	carnet INTEGER NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (carnet)
);

CREATE TABLE calificacion (
    carnet INTEGER NOT NULL,
    nombre_curso VARCHAR(4) NOT NULL,
    nota INTEGER NOT NULL,
    semestre VARCHAR(2) NOT NULL,
    año INTEGER NOT NULL,
    FOREIGN KEY (carnet) REFERENCES alumno(carnet)
);