-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: Appix
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
  `idProyecto` int(10) unsigned NOT NULL,
  `descripcionAccion` varchar(200) NOT NULL,
  `estadoRealizacion` tinyint(1) NOT NULL,
  PRIMARY KEY (`idAccion`),
  KEY `accion_Proyecto_FK` (`idProyecto`),
  CONSTRAINT `accion_Proyecto_FK` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accion`
--

LOCK TABLES `accion` WRITE;
/*!40000 ALTER TABLE `accion` DISABLE KEYS */;
INSERT INTO `accion` VALUES (1,1,'Realizar reunión semanal con el cliente para revisar avances y requisitos',1),(2,1,'Documentar claramente los requisitos y obtener aprobación por escrito',0),(3,2,'Implementar escalado automático de servidores para manejar picos de tráfico',0),(4,3,'Asignar recursos adicionales al equipo de desarrollo para abordar las complicaciones técnicas',0),(5,4,'Solicitar recursos adicionales para la fase de pruebas de usabilidad',0),(6,6,'Revisar y optimizar la planificación de recursos para evitar retrasos',1),(7,7,'Actualizar y enviar el diseño para aprobación del cliente',0),(8,9,'Realizar auditoría de seguridad y aplicar medidas correctivas',0),(9,5,'Optimizar el rendimiento del servidor para mejorar la experiencia del usuario',1),(10,10,'Establecer reuniones regulares con el cliente para validar requisitos',0),(11,8,'Implementar sistema de gestión de comunicaciones con el cliente',0),(12,12,'Definir procesos claros de gestión de cambios para minimizar impactos',1),(13,3,'Realizar pruebas exhaustivas de integración con sistemas externos',0),(14,11,'Planificar y asegurar la disponibilidad de recursos clave en momentos críticos',0),(15,4,'Obtener aprobaciones internas de todas las áreas involucradas antes de la siguiente fase',1),(16,9,'Aplicar parches y actualizaciones de seguridad según las mejores prácticas',0),(17,2,'Establecer comunicación proactiva con el cliente para gestionar expectativas',0),(18,6,'Priorizar tareas y asignar recursos según la carga de trabajo del equipo',1),(19,8,'Controlar y reportar regularmente el gasto real comparado con el presupuesto',0),(20,7,'Enviar recordatorios regulares al cliente para obtener activos necesarios',0),(21,5,'Coordinar con otros equipos de proyecto para optimizar la planificación de recursos',1),(22,11,'Realizar sesiones de retroalimentación y motivación con el equipo',0),(23,10,'Realizar pruebas de usabilidad y validar con usuarios finales',0),(24,12,'Prever escenarios de falla y definir planes de contingencia',1),(25,3,'Monitorear cambios regulatorios y ajustar el alcance según sea necesario',0),(26,9,'Implementar arquitectura escalable para futuros crecimientos del sistema',0),(27,1,'Realizar pruebas de carga y optimizar la arquitectura para mejorar rendimiento',1),(28,4,'Buscar recursos técnicos especializados en el mercado o reasignar internamente',0),(29,2,'Ejecutar pruebas de estrés adicionales para identificar y corregir errores críticos',0),(30,7,'Mantener comunicación constante con el cliente para adaptar prioridades',1);
/*!40000 ALTER TABLE `accion` ENABLE KEYS */;
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
  `nombreEmpresa` varchar(50) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Juan Pérez','ABC Company'),(2,'Maria González','XYZ Corporation'),(3,'Carlos Martínez','Global Solutions Inc.'),(4,'Laura Ramírez','Quick Logistics'),(5,'Pablo Sánchez','Innovative Designs'),(6,'Ana Gutiérrez','Prime Services'),(7,'Luis Hernández','Swift Enterprises'),(8,'Elena Torres','Fast Forward Inc.'),(9,'Diego Castillo','Dynamic Solutions'),(10,'Sofía López','Elite Ventures');
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
  `contraseña` varchar(50) NOT NULL,
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
INSERT INTO `empleado` VALUES (1,'clave123','admin',0),(2,'password456','user',1);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `idProyecto` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idCliente` int(10) unsigned NOT NULL,
  `nombreProyecto` varchar(100) NOT NULL,
  `descripcionProyecto` varchar(500) NOT NULL,
  `departamento` varchar(20) NOT NULL,
  `estatus` varchar(20) NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaFinal` datetime NOT NULL,
  `porcentajeRiesgo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idProyecto`),
  KEY `proyecto_Cliente_FK` (`idCliente`),
  CONSTRAINT `proyecto_Cliente_FK` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES (1,3,'Sitio Web Corporativo','Desarrollo de un nuevo sitio web corporativo para ABC Company','Diseño web','En proceso','2024-04-01 00:00:00','2024-06-30 00:00:00',20),(2,5,'Tienda en Línea','Creación de una plataforma de comercio electrónico para XYZ Corporation','Desarrollo web','En planeación','2024-05-15 00:00:00','2024-09-30 00:00:00',30),(3,1,'App Móvil de Entregas','Desarrollo de una aplicación móvil de entregas para Global Solutions Inc.','Desarrollo web','Atrasado','2024-03-15 00:00:00','2024-07-31 00:00:00',50),(4,7,'Rediseño de Logotipo','Proyecto de rediseño del logotipo para Swift Enterprises','Diseño web','Finalizado','2024-02-01 00:00:00','2024-04-15 00:00:00',10),(5,2,'Plataforma Educativa','Desarrollo de una plataforma educativa en línea para Innovative Designs','Desarrollo web','En espera','2024-04-20 00:00:00','2024-08-15 00:00:00',15),(6,4,'Sistema de Reservas','Implementación de un sistema de reservas online para Quick Logistics','Desarrollo web','En proceso','2024-06-10 00:00:00','2024-10-30 00:00:00',25),(7,6,'App de Gestión de Proyectos','Desarrollo de una aplicación de gestión de proyectos para Prime Services','Desarrollo web','En planeación','2024-05-01 00:00:00','2024-09-15 00:00:00',20),(8,9,'Portal de Noticias','Diseño y desarrollo de un portal de noticias para Dynamic Solutions','Diseño web','En proceso','2024-03-20 00:00:00','2024-07-10 00:00:00',35),(9,8,'Plataforma de Reseñas','Creación de una plataforma de reseñas para Fast Forward Inc.','Desarrollo web','Finalizado','2024-01-15 00:00:00','2024-04-30 00:00:00',5),(10,10,'Sistema de Pagos','Desarrollo de un sistema de pagos en línea para Elite Ventures','Desarrollo web','Finalizado','2024-02-28 00:00:00','2024-05-31 00:00:00',8),(11,3,'Redes Sociales Corporativas','Implementación de redes sociales corporativas para ABC Company','Desarrollo web','En espera','2024-04-10 00:00:00','2024-08-01 00:00:00',12),(12,5,'Plataforma de Empleo','Diseño y desarrollo de una plataforma de empleo para XYZ Corporation','Diseño web','En proceso','2024-05-05 00:00:00','2024-09-20 00:00:00',18),(13,1,'Marketplace de Arte','Creación de un marketplace de arte en línea para Global Solutions Inc.','Desarrollo web','En planeación','2024-06-15 00:00:00','2024-11-30 00:00:00',22),(14,7,'App de Fitness','Desarrollo de una aplicación móvil de fitness para Swift Enterprises','Desarrollo web','En proceso','2024-07-01 00:00:00','2024-11-15 00:00:00',28),(15,2,'Sistema de Reservas de Hoteles','Implementación de un sistema de reservas de hoteles para Innovative Designs','Desarrollo web','Finalizado','2024-03-10 00:00:00','2024-06-30 00:00:00',15);
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
  `idProyecto` int(10) unsigned NOT NULL,
  `descripcionRiesgo` varchar(200) DEFAULT NULL,
  `nivelRiesgo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idRiesgo`),
  KEY `Riesgo_proyecto_FK` (`idProyecto`),
  CONSTRAINT `Riesgo_proyecto_FK` FOREIGN KEY (`idProyecto`) REFERENCES `proyecto` (`idProyecto`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riesgo`
--

LOCK TABLES `riesgo` WRITE;
/*!40000 ALTER TABLE `riesgo` DISABLE KEYS */;
INSERT INTO `riesgo` VALUES (1,1,'Posible retraso en la entrega de contenido por parte del cliente',5),(2,1,'Riesgo de cambios frecuentes en los requisitos del proyecto',3),(3,2,'Posibilidad de sobrecarga en la infraestructura durante picos de tráfico',7),(4,3,'Complicaciones técnicas relacionadas con la integración de sistemas externos',6),(5,4,'Limitaciones de recursos para la fase de pruebas de usabilidad',2),(6,6,'Riesgo de retraso debido a la disponibilidad limitada de recursos clave',4),(7,7,'Posible demora en la aprobación de diseño por parte del cliente',1),(8,9,'Desafíos de seguridad relacionados con la autenticación de usuarios',8),(9,5,'Posible impacto negativo en la experiencia del usuario debido a problemas de rendimiento',4),(10,10,'Riesgo de incumplimiento de plazos por cambios frecuentes en los requisitos',5),(11,8,'Riesgo de confusión debido a falta de comunicación efectiva con el cliente',3),(12,12,'Posibles retrasos en la fase de diseño por cambios constantes en las especificaciones',6),(13,3,'Riesgo de fallos en la integración con sistemas heredados',7),(14,11,'Riesgo de falta de disponibilidad de recursos clave en etapas críticas del proyecto',5),(15,4,'Riesgo de falta de aprobaciones internas necesarias para avanzar con el proyecto',2),(16,9,'Posible exposición a vulnerabilidades de seguridad debido a integraciones externas',8),(17,2,'Riesgo de insatisfacción del cliente debido a diferencias en expectativas',4),(18,6,'Riesgo de sobrecarga del equipo de desarrollo durante picos de trabajo',6),(19,8,'Riesgo de desviación del presupuesto asignado para el proyecto',7),(20,7,'Riesgo de retraso en la entrega de activos por parte del cliente',3),(21,5,'Riesgo de conflicto en la planificación de recursos entre proyectos concurrentes',5),(22,11,'Riesgo de falta de compromiso del equipo con las metas del proyecto',2),(23,10,'Riesgo de falta de aceptación del sistema por parte de los usuarios finales',7),(24,12,'Riesgo de dificultades técnicas no previstas en la fase de implementación',6),(25,3,'Riesgo de cambios regulatorios que impacten el alcance del proyecto',8),(26,9,'Riesgo de falta de escalabilidad de la solución propuesta',4),(27,1,'Riesgo de problemas de rendimiento debido a la arquitectura seleccionada',5),(28,4,'Riesgo de falta de disponibilidad de recursos técnicos especializados',6),(29,2,'Riesgo de errores críticos en la etapa de pruebas finales',3),(30,7,'Riesgo de cambios de prioridades del cliente durante el desarrollo',2);
/*!40000 ALTER TABLE `riesgo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'Appix'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-06 16:49:12
