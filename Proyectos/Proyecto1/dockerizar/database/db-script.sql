CREATE DATABASE IF NOT EXISTS so1db;

USE so1db;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

DROP TABLE IF EXISTS maquina;

CREATE TABLE maquina (
    nombre_maquina VARCHAR(50) NOT NULL,
    ip_maquina     VARCHAR(50),
    cpu            VARCHAR(50),
    ram            VARCHAR(50)
);

ALTER TABLE maquina ADD CONSTRAINT maquina_pk PRIMARY KEY ( nombre_maquina );

DROP TABLE IF EXISTS proceso;

CREATE TABLE proceso (
    pid                INTEGER NOT NULL,
    nombre_p           VARCHAR(50),
    usuario_p          VARCHAR(50),
    estado_p           VARCHAR(50),
    ram_p              INTEGER,
    FK_nombre_maquina  VARCHAR(50) NOT NULL
);

ALTER TABLE proceso
    ADD CONSTRAINT proceso_maquina_fk FOREIGN KEY ( FK_nombre_maquina )
        REFERENCES maquina ( nombre_maquina );