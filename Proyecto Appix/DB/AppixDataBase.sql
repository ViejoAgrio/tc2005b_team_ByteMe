-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: appix
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accion`
--

DROP TABLE IF EXISTS `accion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accion` (
  `idAccion` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcionAccion` varchar(200) NOT NULL,
  PRIMARY KEY (`idAccion`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accion`
--

LOCK TABLES `accion` WRITE;
/*!40000 ALTER TABLE `accion` DISABLE KEYS */;
INSERT INTO `accion` VALUES (1,'Realizar reunión semanal con el cliente para revisar avances y requisitos'),(2,'Documentar claramente los requisitos y obtener aprobación por escrito'),(3,'Implementar escalado automático de servidores para manejar picos de tráfico'),(4,'Asignar recursos adicionales al equipo de desarrollo para abordar las complicaciones técnicas'),(5,'Solicitar recursos adicionales para la fase de pruebas de usabilidad'),(6,'Revisar y optimizar la planificación de recursos para evitar retrasos'),(7,'Actualizar y enviar el diseño para aprobación del cliente'),(8,'Realizar auditoría de seguridad y aplicar medidas correctivas'),(9,'Optimizar el rendimiento del servidor para mejorar la experiencia del usuario'),(10,'Establecer reuniones regulares con el cliente para validar requisitos');
/*!40000 ALTER TABLE `accion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accionproyecto`
--

DROP TABLE IF EXISTS `accionproyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accionproyecto` (
  `idAccionProyecto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idProyecto` int(10) unsigned NOT NULL,
  `idAccion` int(10) unsigned NOT NULL,
  `estatusAccion` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`idAccionProyecto`),
  KEY `accion_proyecto_proyecto_FK` (`idProyecto`),
  KEY `accion_proyecto_accion_FK` (`idAccion`),
  CONSTRAINT `accion_proyecto_accion_FK` FOREIGN KEY (`idAccion`) REFERENCES `accion` (`idAccion`),
  CONSTRAINT `accion_proyecto_proyecto_FK` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accionproyecto`
--

LOCK TABLES `accionproyecto` WRITE;
/*!40000 ALTER TABLE `accionproyecto` DISABLE KEYS */;
INSERT INTO `accionproyecto` VALUES (1,1,1,1),(2,2,2,0),(3,3,3,1),(4,1,4,0),(5,2,5,1),(6,3,6,0),(7,1,7,1),(8,2,8,1),(9,3,9,0),(10,1,10,1);
/*!40000 ALTER TABLE `accionproyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombreEncargado` varchar(50) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Juan Pérez'),(2,'Maria González'),(3,'Carlos Martínez'),(4,'Laura Ramírez'),(5,'Pablo Sánchez'),(6,'Ana Gutiérrez'),(7,'Luis Hernández'),(8,'Elena Torres'),(9,'Diego Castillo'),(10,'Sofía López');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `idEmpleado` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `password` varchar(50) NOT NULL,
  `nombreUsuario` varchar(10) NOT NULL,
  `rol` tinyint(1) NOT NULL,
  PRIMARY KEY (`idEmpleado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'123','admin',0),(2,'password456','user',1);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `idEmpresa` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombreEmpresa` varchar(50) NOT NULL,
  PRIMARY KEY (`idEmpresa`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,'ABC Company'),(2,'XYZ Corporation'),(3,'Global Solutions Inc.'),(4,'Quick Logistics'),(5,'Innovative Designs');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresacliente`
--

DROP TABLE IF EXISTS `empresacliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresacliente` (
  `idEmpresaCliente` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idEmpresa` int(10) unsigned NOT NULL,
  `idCliente` int(10) unsigned NOT NULL,
  `idProyecto` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idEmpresaCliente`),
  KEY `empresa_cliente_empresa_FK` (`idEmpresa`),
  KEY `empresa_cliente_cliente_FK` (`idCliente`),
  KEY `empresa_cliente_proyecto_FK` (`idProyecto`),
  CONSTRAINT `empresa_cliente_cliente_FK` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `empresa_cliente_empresa_FK` FOREIGN KEY (`idEmpresa`) REFERENCES `empresa` (`idEmpresa`),
  CONSTRAINT `empresa_cliente_proyecto_FK` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresacliente`
--

LOCK TABLES `empresacliente` WRITE;
/*!40000 ALTER TABLE `empresacliente` DISABLE KEYS */;
INSERT INTO `empresacliente` VALUES (1,1,1,1),(2,2,2,2),(3,3,3,3),(4,4,4,4),(5,5,5,1),(6,1,6,2),(7,2,7,3),(8,3,8,4),(9,4,9,1),(10,5,10,2);
/*!40000 ALTER TABLE `empresacliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `idProyecto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombreProyecto` varchar(100) NOT NULL,
  `descripcionProyecto` varchar(500) NOT NULL,
  `departamento` varchar(20) NOT NULL,
  `estatus` varchar(20) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFinal` date NOT NULL,
  `porcentajeRiesgo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES (1,'Sitio Web Corporativo','Desarrollo de un nuevo sitio web corporativo','Desarrollo web','En proceso','2024-05-15','2024-09-30',45),(2,'Rediseño de Logotipo','Proyecto de rediseño del logotipo para','Diseño web','En planeación','2024-03-15','2024-07-31',22),(3,'App de Fitness','Desarrollo de una aplicación móvil de fitness','Desarrollo web','Atrasado','2024-06-10','2024-08-15',100),(4,'Sistema de Reservas de Hoteles','Implementación de un sistema de reservas de hoteles','Desarrollo web','Finalizado','2024-03-20','2024-07-10',0);
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riesgo`
--

DROP TABLE IF EXISTS `riesgo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riesgo` (
  `idRiesgo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcionRiesgo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idRiesgo`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riesgo`
--

LOCK TABLES `riesgo` WRITE;
/*!40000 ALTER TABLE `riesgo` DISABLE KEYS */;
INSERT INTO `riesgo` VALUES (1,'Riesgo de retraso debido a la disponibilidad limitada de recursos clave'),(2,'Posibles retrasos en la fase de diseño por cambios constantes en las especificaciones'),(3,'Riesgo de sobrecarga del equipo de desarrollo durante picos de trabajo'),(4,'Riesgo de dificultades técnicas no previstas en la fase de implementación'),(5,'Poco tiempo para realizar el proyecto'),(6,'Pocos conocimientos de las herramientas que se necesitna utilizar'),(7,'Proyecto no remunerado'),(8,'El equipo de desarrollo no se conoce entre ellos'),(9,'Sobre carga de otras tareas a los miembros del equipo de desarrollo'),(10,'Los clientes no han enviado información sobre el servidor donde estara la aplicación');
/*!40000 ALTER TABLE `riesgo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riesgoproyecto`
--

DROP TABLE IF EXISTS `riesgoproyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riesgoproyecto` (
  `idRiesgoProyecto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idRiesgo` int(10) unsigned NOT NULL,
  `idProyecto` int(10) unsigned NOT NULL,
  `nivelRiesgo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idRiesgoProyecto`),
  KEY `riesgo_proyecto_riesgo_FK` (`idRiesgo`),
  KEY `riesgo_proyecto_proyecto_FK` (`idProyecto`),
  CONSTRAINT `riesgo_proyecto_proyecto_FK` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`),
  CONSTRAINT `riesgo_proyecto_riesgo_FK` FOREIGN KEY (`idRiesgo`) REFERENCES `riesgo` (`idRiesgo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riesgoproyecto`
--

LOCK TABLES `riesgoproyecto` WRITE;
/*!40000 ALTER TABLE `riesgoproyecto` DISABLE KEYS */;
INSERT INTO `riesgoproyecto` VALUES (1,1,1,8),(2,2,2,6),(3,3,3,3),(4,4,4,2),(5,5,1,4),(6,6,2,7),(7,7,3,9),(8,8,4,1),(9,9,1,2),(10,10,2,4);
/*!40000 ALTER TABLE `riesgoproyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'appix'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-31 17:14:42
