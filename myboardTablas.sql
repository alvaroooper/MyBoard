-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-03-2022 a las 11:59:57
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `myboard`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetivos`
--

CREATE TABLE `objetivos` (
  `id` int(6) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `titulo` varchar(21) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `descripcion` varchar(21) NOT NULL,
  `fecha` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `objetivos`
--

INSERT INTO `objetivos` (`id`, `usuario`, `titulo`, `tipo`, `descripcion`, `fecha`) VALUES
(146, 'Álvaro', 'Hacer el proyecto', 'Académico', 'De Cliente y Diseño', 'Miércoles, 2 de Marzo de 2022'),
(147, 'Álvaro', 'Preparar viaje', 'Personal', 'Erasmus Estonia', 'Lunes, 7 de Marzo de 2022'),
(151, 'Álvaro', '100kg sentadilla', 'Físico', '3 x 6 repeticiones', 'Sin fecha límite');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre` varchar(20) NOT NULL,
  `contrasenna` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre`, `contrasenna`) VALUES
('Álvaro', 'c6865cf98b133f1f3de596a4a2894630');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `objetivos`
--
ALTER TABLE `objetivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `objetivos`
--
ALTER TABLE `objetivos`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `objetivos`
--
ALTER TABLE `objetivos`
  ADD CONSTRAINT `objetivos_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE;
  
CREATE TABLE `objAcademicos` (
  `id` int(6) NOT NULL,
  `idObj` int(6) NOT NULL,
  `metodo` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `objAcademicos`
  ADD CONSTRAINT `objAc_ibfk_1` FOREIGN KEY (`idObj`) REFERENCES `objetivos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;



CREATE TABLE `objPersonales` (
  `id` int(6) NOT NULL,
  `idObj` int(6) NOT NULL,
  `recompensa` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `objPersonales`
  ADD CONSTRAINT `objPer_ibfk_1` FOREIGN KEY (`idObj`) REFERENCES `objetivos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE `objFisicos` (
  `id` int(6) NOT NULL,
  `idObj` int(6) NOT NULL,
  `rutina` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

ALTER TABLE `objFisicos`
  ADD CONSTRAINT `objFis_ibfk_1` FOREIGN KEY (`idObj`) REFERENCES `objetivos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

CREATE TABLE `metodos` (
  `id` int(6) NOT NULL,
  `idObjAc` int(6) NOT NULL,
  `nombre` varchar(21) NOT NULL,
  `descripcion` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

ALTER TABLE `metodos`
  ADD CONSTRAINT `metodos_ibfk_1` FOREIGN KEY (`idObjAc`) REFERENCES `objpersonales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

