-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: reto
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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente_pk` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `empresa` varchar(50) NOT NULL,
  PRIMARY KEY (`idCliente_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Alejandro Martínez','ABC Company'),(2,'María Pérez','XYZ Corporation'),(3,'José López','Servicios Informáticos S.A.'),(4,'Ana Sánchez','Inversiones Mega'),(5,'Carlos Ramírez','Consultoría Global'),(6,'Laura Gómez','Software Solutions Inc.'),(7,'Pablo Ruiz','Marketing Digital Ltda.'),(8,'Sofía Martín','Desarrollo Web Ecommerce'),(9,'Daniel González','Inversiones Tech'),(10,'Elena Castro','Consultora Estratégica'),(11,'Luisa Hernández','Innovaciones Digitales'),(12,'Javier García','Telecomunicaciones Avanzadas'),(13,'Andrea Rodríguez','Industria de Tecnología'),(14,'Ricardo Fernández','Desarrollo Móvil Innovador'),(15,'Verónica Díaz','Servicios Financieros ABC'),(16,'Miguel Torres','Consultoría en Gestión'),(17,'Isabel Navarro','Investigación y Desarrollo'),(18,'Antonio Ruiz','Comunicaciones Integradas'),(19,'Paula Moreno','Innovación Tecnológica'),(20,'Roberto Santos','Consultoría Estratégica');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `idEmpleado_pk` int(10) unsigned NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `rol` tinyint(1) NOT NULL,
  PRIMARY KEY (`idEmpleado_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'123','Administrador',0),(2,'123','Usuario',1);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estatusproyecto`
--

DROP TABLE IF EXISTS `estatusproyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estatusproyecto` (
  `idStatus_pk` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`idStatus_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estatusproyecto`
--

LOCK TABLES `estatusproyecto` WRITE;
/*!40000 ALTER TABLE `estatusproyecto` DISABLE KEYS */;
INSERT INTO `estatusproyecto` VALUES (1,'En planeación'),(2,'En proceso'),(3,'En espera'),(4,'Atrasado'),(5,'Finalizado');
/*!40000 ALTER TABLE `estatusproyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `idProyecto_pk` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idCliente_fk` int(10) unsigned NOT NULL,
  `nombreProyecto` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `departamento` varchar(20) NOT NULL,
  PRIMARY KEY (`idProyecto_pk`),
  KEY `proyecto_cliente_FK` (`idCliente_fk`),
  CONSTRAINT `proyecto_cliente_FK` FOREIGN KEY (`idCliente_fk`) REFERENCES `cliente` (`idCliente_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES (1,3,'Desarrollo de Plataforma E-commerce','Desarrollo de una plataforma de comercio electrónico para venta de productos electrónicos','Desarrollo'),(2,8,'Rediseño de Sitio Web Corporativo','Rediseño completo del sitio web corporativo para mejorar la experiencia del usuario','Diseño'),(3,6,'Implementación de Sistema de Gestión CRM','Desarrollo e implementación de un sistema CRM personalizado para mejorar la gestión de clientes','Desarrollo'),(4,12,'Desarrollo de Aplicación Móvil de Viajes','Creación de una aplicación móvil para reservas y gestión de viajes','Desarrollo'),(5,5,'Optimización de Plataforma de E-learning','Mejora y optimización de una plataforma de aprendizaje en línea para ofrecer mejores servicios educativos','Desarrollo'),(6,17,'Desarrollo de Sistema de Gestión de Inventarios','Implementación de un sistema de gestión de inventarios para optimizar el control de stocks','Desarrollo'),(7,9,'Rediseño de Aplicación de Recursos Humanos','Rediseño de una aplicación de gestión de recursos humanos para mejorar la usabilidad y funcionalidades','Diseño'),(8,4,'Desarrollo de Plataforma de Marketing Digital','Creación de una plataforma integral de marketing digital para campañas promocionales','Desarrollo'),(9,11,'Implementación de Sistema de Pagos en Línea','Integración de un sistema de pagos en línea seguro y confiable','Desarrollo'),(10,2,'Desarrollo de Aplicación Web para Ventas','Diseño y desarrollo de una aplicación web para mejorar las ventas en línea','Desarrollo'),(11,15,'Rediseño de Portal de Noticias','Actualización y rediseño de un portal de noticias en línea para mejorar la experiencia del usuario','Diseño'),(12,10,'Desarrollo de Plataforma de Colaboración Empresarial','Creación de una plataforma colaborativa para empresas con herramientas de comunicación y gestión','Desarrollo'),(13,7,'Implementación de Sistema de Reservas en Línea','Desarrollo e implementación de un sistema de reservas en línea para eventos y actividades','Desarrollo'),(14,1,'Desarrollo de Aplicación de Seguimiento Logístico','Creación de una aplicación para seguimiento logístico y gestión de entregas','Desarrollo'),(15,19,'Rediseño de Plataforma de Comunicación Interna','Optimización y rediseño de una plataforma de comunicación interna para mejorar la colaboración en la empresa','Diseño'),(16,14,'Desarrollo de Aplicación de Realidad Aumentada','Desarrollo de una aplicación de realidad aumentada para experiencias interactivas','Desarrollo'),(17,13,'Implementación de Sistema de Gestión de Proyectos','Integración de un sistema de gestión de proyectos para mejorar la productividad y organización','Desarrollo'),(18,16,'Desarrollo de Plataforma de E-commerce B2B','Creación de una plataforma de comercio electrónico B2B para ventas entre empresas','Desarrollo'),(19,20,'Rediseño de Aplicación de Salud y Bienestar','Mejora y rediseño de una aplicación de salud y bienestar para ofrecer nuevas funcionalidades','Diseño'),(20,18,'Desarrollo de Aplicación de Análisis de Datos','asassasdasd','Diseño');
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto-estatus-riesgo`
--

DROP TABLE IF EXISTS `proyecto-estatus-riesgo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto-estatus-riesgo` (
  `idGestion_pk` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idEstatus_fk` int(10) unsigned NOT NULL,
  `idProyecto_fk` int(10) unsigned NOT NULL,
  `idRiesgo_fk` int(10) unsigned NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFinalizacion` date NOT NULL,
  `nivelRiesgo` int(10) unsigned NOT NULL,
  `comentarioAcciones` varchar(500) DEFAULT NULL,
  `cantVariables` int(10) unsigned NOT NULL,
  `porcentajeRiesgo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`idGestion_pk`),
  KEY `proyecto_estatus_riesgo_estatusproyecto_FK` (`idEstatus_fk`),
  KEY `proyecto_estatus_riesgo_proyecto_FK` (`idProyecto_fk`),
  KEY `proyecto_estatus_riesgo_riesgo_FK` (`idRiesgo_fk`),
  CONSTRAINT `proyecto_estatus_riesgo_estatusproyecto_FK` FOREIGN KEY (`idEstatus_fk`) REFERENCES `estatusproyecto` (`idStatus_pk`),
  CONSTRAINT `proyecto_estatus_riesgo_proyecto_FK` FOREIGN KEY (`idProyecto_fk`) REFERENCES `proyecto` (`idProyecto_pk`),
  CONSTRAINT `proyecto_estatus_riesgo_riesgo_FK` FOREIGN KEY (`idRiesgo_fk`) REFERENCES `riesgo` (`idRiesgo_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto-estatus-riesgo`
--

LOCK TABLES `proyecto-estatus-riesgo` WRITE;
/*!40000 ALTER TABLE `proyecto-estatus-riesgo` DISABLE KEYS */;
INSERT INTO `proyecto-estatus-riesgo` VALUES (1,3,1,2,'2024-01-10','2024-02-20',5,'Realizar reuniones periódicas con el cliente para asegurar comprensión de requerimientos',3,60),(2,1,5,7,'2024-02-01','2024-03-15',7,'Contratar experto en seguridad informática para auditoría y mitigación',2,85),(3,2,10,11,'2024-03-05','2024-04-10',4,'Establecer reuniones semanales para validar avances y ajustar objetivos',1,40),(4,4,8,13,'2024-02-15','2024-03-25',6,'Asignar recursos adicionales al equipo de desarrollo para cumplir con plazos',2,75),(5,5,3,18,'2024-01-20','2024-02-28',3,'Realizar pruebas exhaustivas de escalabilidad antes del lanzamiento',3,55),(6,1,12,6,'2024-03-01','2024-04-15',8,'Capacitar al equipo en la integración de sistemas externos',1,90),(7,3,9,4,'2024-02-10','2024-03-20',5,'Revisar y actualizar el plan de comunicación con el cliente',2,70),(8,5,17,14,'2024-03-15','2024-04-30',7,'Implementar medidas adicionales de seguridad de datos',2,80),(9,2,15,9,'2024-01-25','2024-03-05',4,'Revisar y mejorar la documentación del proyecto',1,45),(10,4,19,16,'2024-02-20','2024-04-01',6,'Realizar pruebas de usabilidad con usuarios finales',2,65),(11,1,4,20,'2024-01-15','2024-03-01',8,'Contratar consultoría especializada en análisis de datos',1,95),(12,3,14,5,'2024-02-05','2024-03-10',5,'Realizar análisis de riesgos adicionales relacionados con proveedores',3,75),(13,5,11,19,'2024-03-10','2024-04-20',7,'Implementar mejoras de rendimiento según retroalimentación del cliente',2,85),(14,2,2,8,'2024-01-30','2024-03-15',4,'Establecer métricas de calidad para monitorizar el desarrollo',1,50),(15,4,18,12,'2024-02-25','2024-04-05',6,'Revisar y ajustar presupuesto para incluir contingencias',2,70),(16,1,7,17,'2024-03-05','2024-04-15',8,'Establecer protocolos de comunicación con proveedores externos',1,90),(17,3,13,3,'2024-02-15','2024-03-25',5,'Implementar protocolos de seguridad adicionales en el sistema',3,60),(18,2,6,10,'2024-01-20','2024-03-01',4,'Realizar análisis de requisitos detallado',2,45),(19,4,16,15,'2024-02-10','2024-03-20',6,'Ejecutar pruebas de carga y rendimiento',3,70),(20,5,20,1,'2024-03-05','2024-04-15',8,'Establecer estrategia de respaldo de datos',1,80),(21,1,3,14,'2024-01-15','2024-02-25',3,'Realizar auditoría de seguridad',2,55),(22,3,9,5,'2024-02-01','2024-03-10',5,'Revisar y actualizar documentación técnica',1,65),(23,2,12,9,'2024-02-25','2024-04-05',4,'Realizar pruebas de integración con sistemas externos',2,70),(24,4,7,16,'2024-03-20','2024-04-30',6,'Evaluar impacto y riesgos del cambio de tecnología',3,75),(25,5,18,2,'2024-04-05','2024-05-15',8,'Desarrollar plan de contingencia ante riesgos críticos',1,90),(26,1,11,10,'2024-02-15','2024-03-25',3,'Revisar y validar requisitos de seguridad',2,60),(27,3,4,12,'2024-03-01','2024-04-10',5,'Realizar revisión de arquitectura del sistema',1,75),(28,2,16,20,'2024-03-10','2024-04-20',4,'Realizar pruebas de aceptación con el cliente',2,80),(29,4,1,18,'2024-01-25','2024-03-05',6,'Optimizar consultas y acceso a la base de datos',3,85),(30,5,10,8,'2024-02-20','2024-04-01',8,'Realizar pruebas de compatibilidad con navegadores',1,95),(31,1,14,4,'2024-03-05','2024-04-15',5,'Establecer protocolos de seguridad para acceso remoto',2,60),(32,3,5,19,'2024-02-15','2024-03-25',7,'Implementar mejoras de usabilidad en la interfaz de usuario',1,75),(33,2,13,6,'2024-03-01','2024-04-10',4,'Capacitar al equipo en técnicas de desarrollo ágil',2,80),(34,4,8,11,'2024-03-10','2024-04-20',6,'Revisar y ajustar estimaciones de tiempos y costos',3,85),(35,5,17,15,'2024-01-25','2024-03-05',8,'Realizar pruebas de rendimiento con carga simulada',1,90),(36,1,2,7,'2024-02-20','2024-04-01',3,'Revisar y actualizar políticas de seguridad',2,60),(37,3,19,13,'2024-03-05','2024-04-15',5,'Realizar análisis de impacto de cambios en requerimientos',1,75),(38,2,7,9,'2024-02-15','2024-03-25',4,'Documentar y compartir lecciones aprendidas',2,80),(39,4,16,10,'2024-03-01','2024-04-10',6,'Realizar pruebas de compatibilidad con sistemas operativos',3,85),(40,5,3,12,'2024-03-10','2024-04-20',8,'Revisar y mejorar proceso de control de versiones',1,90),(41,1,11,20,'2024-01-25','2024-03-05',3,'Definir estrategia de respaldo de bases de datos',2,60),(42,3,4,16,'2024-02-20','2024-04-01',5,'Realizar pruebas de rendimiento con carga real',1,75),(43,2,14,8,'2024-03-05','2024-04-15',4,'Establecer métricas de rendimiento y disponibilidad',2,80),(44,4,6,4,'2024-02-15','2024-03-25',6,'Implementar medidas de seguridad adicionales en la red',3,85),(45,5,10,18,'2024-03-01','2024-04-10',8,'Realizar pruebas de seguridad con herramientas de penetración',1,90),(46,1,1,15,'2024-03-10','2024-04-20',3,'Revisar y mejorar documentación de proceso de desarrollo',2,60),(47,3,9,3,'2024-01-25','2024-03-05',5,'Establecer protocolos de copias de seguridad automáticas',1,75),(48,2,12,19,'2024-02-20','2024-04-01',4,'Realizar pruebas de integración con sistemas externos',2,80),(49,4,5,5,'2024-03-05','2024-04-15',6,'Realizar análisis de riesgos adicionales relacionados con proveedores',3,85),(50,5,17,11,'2024-03-10','2024-04-20',8,'Evaluar impacto y riesgos del cambio de tecnología',1,90);
/*!40000 ALTER TABLE `proyecto-estatus-riesgo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riesgo`
--

DROP TABLE IF EXISTS `riesgo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riesgo` (
  `idRiesgo_pk` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(500) NOT NULL,
  PRIMARY KEY (`idRiesgo_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riesgo`
--

LOCK TABLES `riesgo` WRITE;
/*!40000 ALTER TABLE `riesgo` DISABLE KEYS */;
INSERT INTO `riesgo` VALUES (1,'Cliente con poco conocimiento teórico del desarrollo web'),(2,'Requerimientos poco claros o cambiantes durante el proyecto'),(3,'Escasez de recursos técnicos o humanos en el equipo'),(4,'Incompatibilidad entre tecnologías utilizadas'),(5,'Problemas de comunicación con el cliente o stakeholders'),(6,'Falta de experiencia en integración de sistemas externos'),(7,'Riesgo de seguridad y protección de datos insuficiente'),(8,'Desviación en el presupuesto inicial del proyecto'),(9,'Cambios en la tecnología o herramientas durante el desarrollo'),(10,'Problemas de escalabilidad y rendimiento del sistema'),(11,'Falta de alineación con los objetivos del negocio del cliente'),(12,'Problemas legales o regulatorios inesperados'),(13,'Riesgo de dependencia excesiva en proveedores externos'),(14,'Falta de documentación o seguimiento adecuado del proyecto'),(15,'Cambios en las expectativas del cliente a lo largo del tiempo'),(16,'Dificultades en la gestión del tiempo y los recursos'),(17,'Errores en la estimación de esfuerzo y duración del proyecto'),(18,'Desafíos en la adopción de nuevas tecnologías emergentes'),(19,'Falta de experiencia en el dominio específico del cliente'),(20,'Riesgos relacionados con la gestión de la calidad del software');
/*!40000 ALTER TABLE `riesgo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'reto'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-25  8:55:10
