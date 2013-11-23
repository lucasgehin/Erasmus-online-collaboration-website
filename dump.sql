-- MySQL dump 10.13  Distrib 5.5.34, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ipviope
-- ------------------------------------------------------
-- Server version	5.5.34-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'0000-00-00','Test1','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis laoreet faucibus. Aliquam ut dolor leo. Donec commodo, nulla non semper suscipit, metus diam sagittis ipsum, at commodo sem est eu arcu. Pellentesque eu velit interdum, ultrices turpis nec, cursus est. Proin eu nibh sit amet mi vulputate suscipit at ac tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut scelerisque sapien ultrices quam sollicitudin viverra. Nunc lacinia, urna ac cursus vulputate, velit erat facilisis mi, ut euismod quam dui id sem. Integer iaculis enim sit amet mi volutpat, at tincidunt magna iaculis. Sed risus urna, iaculis non tempus eu, laoreet nec ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nVestibulum dictum purus a ipsum dictum, id egestas elit pulvinar. Morbi non eros risus. Vivamus pretium vulputate urna. Etiam convallis nulla vel sapien faucibus imperdiet. Cras consequat magna lorem, ut egestas est malesuada sed. In lectus arcu, convallis in turpis vitae, pharetra gravida orci. Etiam eu massa in ante pretium ultricies non sed lacus. Donec vel sem odio. Aliquam in orci eu diam suscipit congue. Nulla faucibus porttitor velit, vel placerat tellus blandit at. In volutpat nibh turpis. Nulla pellentesque sit amet nisi eget sodales. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque in elit sit amet nulla fringilla fringilla a vitae velit. In a sem mauris.\n\nVestibulum consequat placerat nisl, in molestie quam tincidunt sed. Suspendisse imperdiet nibh mauris, hendrerit pellentesque mi porttitor at. Maecenas a risus ac velit commodo fermentum viverra et eros. Sed consequat, velit eget facilisis placerat, urna urna rutrum turpis, a lacinia dui diam a elit. Nulla lacinia risus id leo semper, id ullamcorper augue mattis. Nam ac sodales lacus, et hendrerit nulla. Fusce tincidunt quis quam tincidunt faucibus. In dapibus neque vel aliquet consectetur. Fusce et metus sit amet felis pharetra consequat ac nec diam.\n\nDuis vitae commodo mauris, sit amet ultricies sem. Nulla elementum mi nec ante pulvinar tempor. Mauris interdum pharetra dolor, nec lobortis est tempor nec. Quisque consectetur tortor et lectus hendrerit aliquet. Phasellus vehicula leo in erat accumsan eleifend. Ut id congue nunc, eu fermentum felis. In consequat metus eget dapibus auctor.\n\nUt sollicitudin purus eget ante auctor blandit. Phasellus sodales arcu sem, quis faucibus erat ullamcorper sodales. Proin sagittis tellus vitae volutpat porta. Praesent aliquet mi pharetra leo convallis rutrum. Nam ut lacus feugiat, malesuada erat vel, laoreet sem. Pellentesque quis imperdiet tellus, vitae ullamcorper erat. Fusce in rutrum tortor. Nam ullamcorper ultricies gravida. Integer lobortis augue sit amet faucibus bibendum. Aenean mollis gravida erat id consectetur. Phasellus ac dui sed velit condimentum placerat. Sed et accumsan augue, at pretium mauris. Duis lacinia est at velit molestie, sed tristique quam sodales. Fusce sagittis, dui vitae mattis adipiscing, velit tellus cursus nisl, nec fermentum arcu arcu vitae tortor. Proin eget nunc erat. Praesent pretium massa ut placerat facilisis.'),(2,'0000-00-00','Test2','Lorem'),(3,'0000-00-00','Test3','Lorem 3'),(4,'0000-00-00','Test 4','Lorem 4'),(5,'0000-00-00','Test5','Lorem5'),(6,'0000-00-00','Test6','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis laoreet faucibus. Aliquam ut dolor leo. Donec commodo, nulla non semper suscipit, metus diam sagittis ipsum, at commodo sem est eu arcu. Pellentesque eu velit interdum, ultrices turpis nec, cursus est. Proin eu nibh sit amet mi vulputate suscipit at ac tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut scelerisque sapien ultrices quam sollicitudin viverra. Nunc lacinia, urna ac cursus vulputate, velit erat facilisis mi, ut euismod quam dui id sem. Integer iaculis enim sit amet mi volutpat, at tincidunt magna iaculis. Sed risus urna, iaculis non tempus eu, laoreet nec ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nVestibulum dictum purus a ipsum dictum, id egestas elit pulvinar. Morbi non eros risus. Vivamus pretium vulputate urna. Etiam convallis nulla vel sapien faucibus imperdiet. Cras consequat magna lorem, ut egestas est malesuada sed. In lectus arcu, convallis in turpis vitae, pharetra gravida orci. Etiam eu massa in ante pretium ultricies non sed lacus. Donec vel sem odio. Aliquam in orci eu diam suscipit congue. Nulla faucibus porttitor velit, vel placerat tellus blandit at. In volutpat nibh turpis. Nulla pellentesque sit amet nisi eget sodales. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque in elit sit amet nulla fringilla fringilla a vitae velit. In a sem mauris.\n\nVestibulum consequat placerat nisl, in molestie quam tincidunt sed. Suspendisse imperdiet nibh mauris, hendrerit pellentesque mi porttitor at. Maecenas a risus ac velit commodo fermentum viverra et eros. Sed consequat, velit eget facilisis placerat, urna urna rutrum turpis, a lacinia dui diam a elit. Nulla lacinia risus id leo semper, id ullamcorper augue mattis. Nam ac sodales lacus, et hendrerit nulla. Fusce tincidunt quis quam tincidunt faucibus. In dapibus neque vel aliquet consectetur. Fusce et metus sit amet felis pharetra consequat ac nec diam.\n\nDuis vitae commodo mauris, sit amet ultricies sem. Nulla elementum mi nec ante pulvinar tempor. Mauris interdum pharetra dolor, nec lobortis est tempor nec. Quisque consectetur tortor et lectus hendrerit aliquet. Phasellus vehicula leo in erat accumsan eleifend. Ut id congue nunc, eu fermentum felis. In consequat metus eget dapibus auctor.\n\nUt sollicitudin purus eget ante auctor blandit. Phasellus sodales arcu sem, quis faucibus erat ullamcorper sodales. Proin sagittis tellus vitae volutpat porta. Praesent aliquet mi pharetra leo convallis rutrum. Nam ut lacus feugiat, malesuada erat vel, laoreet sem. Pellentesque quis imperdiet tellus, vitae ullamcorper erat. Fusce in rutrum tortor. Nam ullamcorper ultricies gravida. Integer lobortis augue sit amet faucibus bibendum. Aenean mollis gravida erat id consectetur. Phasellus ac dui sed velit condimentum placerat. Sed et accumsan augue, at pretium mauris. Duis lacinia est at velit molestie, sed tristique quam sodales. Fusce sagittis, dui vitae mattis adipiscing, velit tellus cursus nisl, nec fermentum arcu arcu vitae tortor. Proin eget nunc erat. Praesent pretium massa ut placerat facilisis.');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test_user','test_pass','',''),(2,'u','p','',''),(3,'jlongchamps','','Longchamps','Jacques '),(4,'jimoody','','Boulanger','Vincent'),(5,'skalde54','','Gaillard','Geoffrey'),(6,'mangeol5','','Mangeol','Bernard'),(7,'greg','','Baton','Gregory'),(8,'lgehin','','Gehin','Lucas');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-11-23 11:17:02
