-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mer 27 Novembre 2013 à 15:23
-- Version du serveur: 5.5.24-log
-- Version de PHP: 5.3.13



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `ipviope`
--

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` mediumtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `news`
--

INSERT INTO `news` (`id`, `date`, `title`, `content`) VALUES
(1, '2013-11-25', 'Test1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis laoreet faucibus. Aliquam ut dolor leo. Donec commodo, nulla non semper suscipit, metus diam sagittis ipsum, at commodo sem est eu arcu. Pellentesque eu velit interdum, ultrices turpis nec, cursus est. Proin eu nibh sit amet mi vulputate suscipit at ac tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut scelerisque sapien ultrices quam sollicitudin viverra. Nunc lacinia, urna ac cursus vulputate, velit erat facilisis mi, ut euismod quam dui id sem. Integer iaculis enim sit amet mi volutpat, at tincidunt magna iaculis. Sed risus urna, iaculis non tempus eu, laoreet nec ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nVestibulum dictum purus a ipsum dictum, id egestas elit pulvinar. Morbi non eros risus. Vivamus pretium vulputate urna. Etiam convallis nulla vel sapien faucibus imperdiet. Cras consequat magna lorem, ut egestas est malesuada sed. In lectus arcu, convallis in turpis vitae, pharetra gravida orci. Etiam eu massa in ante pretium ultricies non sed lacus. Donec vel sem odio. Aliquam in orci eu diam suscipit congue. Nulla faucibus porttitor velit, vel placerat tellus blandit at. In volutpat nibh turpis. Nulla pellentesque sit amet nisi eget sodales. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque in elit sit amet nulla fringilla fringilla a vitae velit. In a sem mauris.\n\nVestibulum consequat placerat nisl, in molestie quam tincidunt sed. Suspendisse imperdiet nibh mauris, hendrerit pellentesque mi porttitor at. Maecenas a risus ac velit commodo fermentum viverra et eros. Sed consequat, velit eget facilisis placerat, urna urna rutrum turpis, a lacinia dui diam a elit. Nulla lacinia risus id leo semper, id ullamcorper augue mattis. Nam ac sodales lacus, et hendrerit nulla. Fusce tincidunt quis quam tincidunt faucibus. In dapibus neque vel aliquet consectetur. Fusce et metus sit amet felis pharetra consequat ac nec diam.\n\nDuis vitae commodo mauris, sit amet ultricies sem. Nulla elementum mi nec ante pulvinar tempor. Mauris interdum pharetra dolor, nec lobortis est tempor nec. Quisque consectetur tortor et lectus hendrerit aliquet. Phasellus vehicula leo in erat accumsan eleifend. Ut id congue nunc, eu fermentum felis. In consequat metus eget dapibus auctor.\n\nUt sollicitudin purus eget ante auctor blandit. Phasellus sodales arcu sem, quis faucibus erat ullamcorper sodales. Proin sagittis tellus vitae volutpat porta. Praesent aliquet mi pharetra leo convallis rutrum. Nam ut lacus feugiat, malesuada erat vel, laoreet sem. Pellentesque quis imperdiet tellus, vitae ullamcorper erat. Fusce in rutrum tortor. Nam ullamcorper ultricies gravida. Integer lobortis augue sit amet faucibus bibendum. Aenean mollis gravida erat id consectetur. Phasellus ac dui sed velit condimentum placerat. Sed et accumsan augue, at pretium mauris. Duis lacinia est at velit molestie, sed tristique quam sodales. Fusce sagittis, dui vitae mattis adipiscing, velit tellus cursus nisl, nec fermentum arcu arcu vitae tortor. Proin eget nunc erat. Praesent pretium massa ut placerat facilisis.'),
(2, '2013-11-25', 'Test2', 'Lorem'),
(3, '2013-11-25', 'Test3', 'Lorem 3'),
(4, '2013-11-25', 'Test 4', 'Lorem 4'),
(5, '2013-11-25', 'Test5', 'Lorem5'),
(6, '2013-11-25', 'Test6', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis laoreet faucibus. Aliquam ut dolor leo. Donec commodo, nulla non semper suscipit, metus diam sagittis ipsum, at commodo sem est eu arcu. Pellentesque eu velit interdum, ultrices turpis nec, cursus est. Proin eu nibh sit amet mi vulputate suscipit at ac tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut scelerisque sapien ultrices quam sollicitudin viverra. Nunc lacinia, urna ac cursus vulputate, velit erat facilisis mi, ut euismod quam dui id sem. Integer iaculis enim sit amet mi volutpat, at tincidunt magna iaculis. Sed risus urna, iaculis non tempus eu, laoreet nec ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nVestibulum dictum purus a ipsum dictum, id egestas elit pulvinar. Morbi non eros risus. Vivamus pretium vulputate urna. Etiam convallis nulla vel sapien faucibus imperdiet. Cras consequat magna lorem, ut egestas est malesuada sed. In lectus arcu, convallis in turpis vitae, pharetra gravida orci. Etiam eu massa in ante pretium ultricies non sed lacus. Donec vel sem odio. Aliquam in orci eu diam suscipit congue. Nulla faucibus porttitor velit, vel placerat tellus blandit at. In volutpat nibh turpis. Nulla pellentesque sit amet nisi eget sodales. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque in elit sit amet nulla fringilla fringilla a vitae velit. In a sem mauris.\n\nVestibulum consequat placerat nisl, in molestie quam tincidunt sed. Suspendisse imperdiet nibh mauris, hendrerit pellentesque mi porttitor at. Maecenas a risus ac velit commodo fermentum viverra et eros. Sed consequat, velit eget facilisis placerat, urna urna rutrum turpis, a lacinia dui diam a elit. Nulla lacinia risus id leo semper, id ullamcorper augue mattis. Nam ac sodales lacus, et hendrerit nulla. Fusce tincidunt quis quam tincidunt faucibus. In dapibus neque vel aliquet consectetur. Fusce et metus sit amet felis pharetra consequat ac nec diam.\n\nDuis vitae commodo mauris, sit amet ultricies sem. Nulla elementum mi nec ante pulvinar tempor. Mauris interdum pharetra dolor, nec lobortis est tempor nec. Quisque consectetur tortor et lectus hendrerit aliquet. Phasellus vehicula leo in erat accumsan eleifend. Ut id congue nunc, eu fermentum felis. In consequat metus eget dapibus auctor.\n\nUt sollicitudin purus eget ante auctor blandit. Phasellus sodales arcu sem, quis faucibus erat ullamcorper sodales. Proin sagittis tellus vitae volutpat porta. Praesent aliquet mi pharetra leo convallis rutrum. Nam ut lacus feugiat, malesuada erat vel, laoreet sem. Pellentesque quis imperdiet tellus, vitae ullamcorper erat. Fusce in rutrum tortor. Nam ullamcorper ultricies gravida. Integer lobortis augue sit amet faucibus bibendum. Aenean mollis gravida erat id consectetur. Phasellus ac dui sed velit condimentum placerat. Sed et accumsan augue, at pretium mauris. Duis lacinia est at velit molestie, sed tristique quam sodales. Fusce sagittis, dui vitae mattis adipiscing, velit tellus cursus nisl, nec fermentum arcu arcu vitae tortor. Proin eget nunc erat. Praesent pretium massa ut placerat facilisis.');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nom` varchar(20) NOT NULL,
  `prenom` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL DEFAULT 'Europe',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nom`, `prenom`, `country`) VALUES
(1, 'test_user', 'test_pass', '', '', 'Europe'),
(2, 'u', 'p', '', '', 'Europe'),
(3, 'jlongchamps', '', 'Longchamps', 'Jacques ', 'Europe'),
(4, 'jimoody', '', 'Boulanger', 'Vincent', 'Europe'),
(5, 'skalde54', '', 'Gaillard', 'Geoffrey', 'Europe'),
(6, 'mangeol5', '', 'Mangeol', 'Bernard', 'Europe'),
(7, 'greg', '', 'Baton', 'Gregory', 'Finland'),
(8, 'lgehin', '', 'Gehin', 'Lucas', 'France');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
