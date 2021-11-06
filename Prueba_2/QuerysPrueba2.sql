/* Create DB*/
CREATE DATABASE prueba2;
use prueba2;

/* Create Tables*/
CREATE TABLE logDial
(
    idLlamada VARCHAR(10),
    fechaDeLlamada DATE,
    tiempoDialogo INT,
    telefono VARCHAR(10),
    tipoDeLlamada varchar(15)
)

CREATE TABLE costos (
    tipoDeLlamada varchar(15),
    costo decimal(10,4)
);

/*IMPORT EXCEL DATA USING FUNCTIONS FROM ImportFromExcel LIBRARY */

/* registros con tipo de llamada Cel LD durante el mes febrero */
SELECT *
FROM   logDial
WHERE  tipoDeLlamada = 'Cel LD ' AND Month(Date) in (2)

/*promedio de tiempo de dialogo con tipo Cel LD durante febrero */
SELECT AVG(tiempoDialogo) FROM   logDial
WHERE  tipoDeLlamada = 'Cel LD ' AND Month(Date) in (2);