-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2022 a las 10:15:02
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `myboard3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id` int(11) NOT NULL,
  `Titulo` varchar(21) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `correo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodos`
--

CREATE TABLE `metodos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(21) NOT NULL,
  `descripcion` varchar(300) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `metodos`
--

INSERT INTO `metodos` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Sin Metodo', 'No hay ningun metodo seleccionado'),
(2, 'Pomodoro', 'Se basa en usar un temporizador para dividir el tiempo en intervalos fijos, llamados pomodoros, de 25 minutos de actividad, seguidos de 5 minutos de descanso, con pausas mas largas cada cuatro pomodoros.'),
(3, 'Por gustos', 'Consiste en empezar a hacer una tarea que te guste para calentar y una vez estes concentrado pasar a una que no te guste tanto.'),
(4, 'Por facilidad', 'Trata de empezar con algo que te sea facil para pasar a lo dificil, pero no hagas todo lo sencillo al principio ya que si te saturas con lo dificil te sera util volver a lo sencillo.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetivos`
--

CREATE TABLE `objetivos` (
  `id` int(6) NOT NULL,
  `idUsuario` int(6) NOT NULL,
  `titulo` varchar(21) NOT NULL,
  `descripcion` varchar(21) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha` varchar(30) NOT NULL,
  `idMet` int(11) DEFAULT NULL,
  `idRec` int(11) DEFAULT NULL,
  `idRut` int(11) DEFAULT NULL,
  `completado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `objetivos`
--

INSERT INTO `objetivos` (`id`, `idUsuario`, `titulo`, `descripcion`, `fecha`, `idMet`, `idRec`, `idRut`, `completado`) VALUES
(527, 14, 'Hacer el proyecto', 'DocumentaciÃ³n', 'SÃ¡bado, 28 de Mayo de 2022', 3, NULL, NULL, 1),
(535, 14, 'Sin tÃ­tulo', 'Sin especificar', 'Sin fecha lÃ­mite', 2, NULL, NULL, 0);

--
-- Disparadores `objetivos`
--
DELIMITER $$
CREATE TRIGGER `check_objetivo_dos1` BEFORE INSERT ON `objetivos` FOR EACH ROW BEGIN
	IF ((NEW.idMet>0) AND (NEW.idRec>0))THEN 
		signal sqlstate '45002' set MESSAGE_TEXT ='No puedes fijar dos objetivos al mismo tiempo';
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_objetivo_dos2` BEFORE INSERT ON `objetivos` FOR EACH ROW BEGIN
	IF ((NEW.idMet>0) AND (NEW.idRut>0))THEN 
		signal sqlstate '45002' set MESSAGE_TEXT ='No puedes fijar dos objetivos al mismo tiempo';
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_objetivo_dos3` BEFORE INSERT ON `objetivos` FOR EACH ROW BEGIN
	IF ((NEW.idRec>0) AND (NEW.idRut>0))THEN 
		signal sqlstate '45002' set MESSAGE_TEXT ='No puedes fijar dos objetivos al mismo tiempo';
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_objetivo_not_null` BEFORE INSERT ON `objetivos` FOR EACH ROW BEGIN
	IF ((NEW.idMet IS NULL ) AND (NEW.idRec IS NULL ) AND (NEW.idRut IS NULL ))THEN 
		signal sqlstate '45000' set MESSAGE_TEXT ='Tienes que tener al menos un objetivo';
	END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_objetivo_tres` BEFORE INSERT ON `objetivos` FOR EACH ROW BEGIN
	IF ((NEW.idMet>0) AND (NEW.idRec>0) AND (NEW.idRut>0))THEN 
		signal sqlstate '45001' set MESSAGE_TEXT ='No puedes fijar tres objetivos al mismo tiempo';
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas`
--

CREATE TABLE `recompensas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(21) NOT NULL,
  `cuandoSeRecibe` varchar(21) NOT NULL,
  `cantidad` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `recompensas`
--

INSERT INTO `recompensas` (`id`, `nombre`, `cuandoSeRecibe`, `cantidad`) VALUES
(1, 'Sin recompensa', '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutinas`
--

CREATE TABLE `rutinas` (
  `id` int(6) NOT NULL,
  `nombre` varchar(21) NOT NULL,
  `lugar` varchar(21) NOT NULL,
  `dificultad` varchar(21) NOT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rutinas`
--

INSERT INTO `rutinas` (`id`, `nombre`, `lugar`, `dificultad`, `descripcion`) VALUES
(1, 'Sin rutina', '', '', 'No se ha seleccionado ninguna rutina.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(6) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `contrasenna` varchar(50) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `foto` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasenna`, `admin`, `foto`) VALUES
(14, 'Alvaro', 'alvaronico.p@gmail.com', '49d2d6738ffff4dc89ad8c480073a3e4', 0, 'ladrillos.jpg'),
(18, 'admin', 'adminMyBoard@gmail.com', '1395cd9f080a7ed87431e42d96efca31', 1, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `metodos`
--
ALTER TABLE `metodos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `objetivos`
--
ALTER TABLE `objetivos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `objetivos_ibfk_1` (`idUsuario`),
  ADD KEY `objetivos_ibfk_2` (`idMet`),
  ADD KEY `objetivos_ibfk_3` (`idRec`),
  ADD KEY `objetivos_ibfk_4` (`idRut`);

--
-- Indices de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metodos`
--
ALTER TABLE `metodos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `objetivos`
--
ALTER TABLE `objetivos`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=537;

--
-- AUTO_INCREMENT de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rutinas`
--
ALTER TABLE `rutinas`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `objetivos`
--
ALTER TABLE `objetivos`
  ADD CONSTRAINT `objetivos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `objetivos_ibfk_2` FOREIGN KEY (`idMet`) REFERENCES `metodos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `objetivos_ibfk_3` FOREIGN KEY (`idRec`) REFERENCES `recompensas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `objetivos_ibfk_4` FOREIGN KEY (`idRut`) REFERENCES `rutinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
