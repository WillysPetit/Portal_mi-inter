-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-07-2025 a las 17:35:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `portal-mi-inter`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `Id_Administrador` int(11) NOT NULL,
  `Nombre` varchar(15) NOT NULL,
  `Correo` varchar(25) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `Usuario` varchar(25) NOT NULL,
  `Id_Supervisor` int(10) NOT NULL,
  `Id_Servicio` int(10) NOT NULL,
  `Apellido` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `Id_Clientes` int(11) NOT NULL,
  `Correo` varchar(45) NOT NULL,
  `Nombre` varchar(22) NOT NULL,
  `Password` varchar(22) NOT NULL,
  `Id_Reporte` int(11) NOT NULL,
  `Apellido` varchar(12) NOT NULL,
  `Cedula` varchar(20) NOT NULL,
  `Usuario` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`Id_Clientes`, `Correo`, `Nombre`, `Password`, `Id_Reporte`, `Apellido`, `Cedula`, `Usuario`) VALUES
(1, 'w.petit@gmail.com', 'Willys', '123456', 1, 'Petit', '30945447', 'wfpd'),
(2, 'angel@gmail.com', 'Angel', '123', 0, 'Camacho', '30945110', 'angelito'),
(3, 'roberto@gmail.com', 'Roberto', '123', 0, 'roberto', '31255255', 'robertico'),
(4, 'roberto@gmail.com', 'Roberto', '123', 0, 'roberto', '31255255', 'robertico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasarela`
--

CREATE TABLE `pasarela` (
  `Id` int(11) NOT NULL,
  `id_Clientes` int(11) NOT NULL,
  `Plan` varchar(45) NOT NULL,
  `Monto` varchar(45) NOT NULL,
  `Banco` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reporte`
--

CREATE TABLE `reporte` (
  `Id_Reporte` int(11) NOT NULL,
  `Tipo_Reporte` int(10) NOT NULL,
  `Descripcion` varchar(65) NOT NULL,
  `Fecha_creada` date NOT NULL,
  `Fecha_resuelto` date NOT NULL,
  `Id_Cliente` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_cliente`
--

CREATE TABLE `servicio_cliente` (
  `Id_Servicio` int(11) NOT NULL,
  `Nombre` varchar(25) NOT NULL,
  `Identificacion` varchar(25) NOT NULL,
  `Correo` varchar(35) NOT NULL,
  `Password` varchar(15) NOT NULL,
  `Id_Reporte` int(8) NOT NULL,
  `Id_Cliente` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supervisor`
--

CREATE TABLE `supervisor` (
  `Id_Supervisor` int(11) NOT NULL,
  `Correo` varchar(25) NOT NULL,
  `Nombre` varchar(15) NOT NULL,
  `Password` int(15) NOT NULL,
  `Id_Reportes` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`Id_Administrador`),
  ADD KEY `Id_Supervisor` (`Id_Supervisor`),
  ADD KEY `Id_Servicio` (`Id_Servicio`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`Id_Clientes`);

--
-- Indices de la tabla `pasarela`
--
ALTER TABLE `pasarela`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `id_Clientes` (`id_Clientes`);

--
-- Indices de la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD PRIMARY KEY (`Id_Reporte`),
  ADD KEY `Id_Cliente` (`Id_Cliente`);

--
-- Indices de la tabla `servicio_cliente`
--
ALTER TABLE `servicio_cliente`
  ADD PRIMARY KEY (`Id_Servicio`),
  ADD KEY `Id_Cliente` (`Id_Cliente`),
  ADD KEY `Id_Reporte` (`Id_Reporte`);

--
-- Indices de la tabla `supervisor`
--
ALTER TABLE `supervisor`
  ADD PRIMARY KEY (`Id_Supervisor`),
  ADD KEY `Id_Reportes` (`Id_Reportes`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `Id_Administrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `Id_Clientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pasarela`
--
ALTER TABLE `pasarela`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `reporte`
--
ALTER TABLE `reporte`
  MODIFY `Id_Reporte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `servicio_cliente`
--
ALTER TABLE `servicio_cliente`
  MODIFY `Id_Servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `supervisor`
--
ALTER TABLE `supervisor`
  MODIFY `Id_Supervisor` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`Id_Supervisor`) REFERENCES `supervisor` (`Id_Supervisor`),
  ADD CONSTRAINT `administrador_ibfk_2` FOREIGN KEY (`Id_Servicio`) REFERENCES `servicio_cliente` (`Id_Servicio`);

--
-- Filtros para la tabla `pasarela`
--
ALTER TABLE `pasarela`
  ADD CONSTRAINT `pasarela_ibfk_1` FOREIGN KEY (`id_Clientes`) REFERENCES `cliente` (`Id_Clientes`);

--
-- Filtros para la tabla `reporte`
--
ALTER TABLE `reporte`
  ADD CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`Id_Cliente`) REFERENCES `cliente` (`Id_Clientes`);

--
-- Filtros para la tabla `servicio_cliente`
--
ALTER TABLE `servicio_cliente`
  ADD CONSTRAINT `servicio_cliente_ibfk_1` FOREIGN KEY (`Id_Cliente`) REFERENCES `cliente` (`Id_Clientes`),
  ADD CONSTRAINT `servicio_cliente_ibfk_2` FOREIGN KEY (`Id_Reporte`) REFERENCES `reporte` (`Id_Reporte`);

--
-- Filtros para la tabla `supervisor`
--
ALTER TABLE `supervisor`
  ADD CONSTRAINT `supervisor_ibfk_1` FOREIGN KEY (`Id_Reportes`) REFERENCES `reporte` (`Id_Reporte`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
