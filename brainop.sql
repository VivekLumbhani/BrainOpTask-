-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2024 at 05:52 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brainop`
--

-- --------------------------------------------------------

--
-- Table structure for table `posttable`
--

CREATE TABLE `posttable` (
  `id` int(11) NOT NULL,
  `postimg` varchar(255) NOT NULL,
  `caption` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `uploadedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posttable`
--

INSERT INTO `posttable` (`id`, `postimg`, `caption`, `username`, `uploadedAt`) VALUES
(4, '2147483647', 'girl img', 'test', '2024-05-02 11:18:03'),
(5, '2147483647', '2nd girl img', 'test', '2024-05-02 11:22:13'),
(6, '2147483647', 'boyimg', 'test', '2024-05-02 11:29:02'),
(7, '2147483647', 'night img', 'test', '2024-05-02 11:30:11'),
(8, '2147483647', 'wow img', 'test', '2024-05-02 11:32:08'),
(9, '2147483647', 'girl img again', 'test', '2024-05-02 11:33:43'),
(10, '2147483647', 'googd image', 'test', '2024-05-02 11:35:19'),
(11, '1714649775446-WIN_20231127_22_26_06_Pro.jpg', 'girl img', 'test', '2024-05-02 11:36:15'),
(12, '1714650031220-WIN_20230629_15_14_44_Pro.jpg', 'boy image', 'test', '2024-05-02 11:40:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `profile_pic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `phone`, `profile_pic`) VALUES
(1, 'vivek', 'viveklumbhani69@gmail.com', '$2b$10$8MszTFmIwiXfeF3fgTBHmORHN1Y0vC4cNJJQ/ykqi8IY6bAvbGTki', 2147483647, '1714565102813-WIN_20231127_22_26_06_Pro.jpg'),
(2, 'hello', 'hello@gmail.com', '$2b$10$9lMy5CV19BLvWqIZxfGXHehoXBODXjykGk8wMhEoM0epDlnEnUlSq', 2147483647, '1714565514386-WIN_20231127_22_26_06_Pro.jpg'),
(3, 'test', 'test@gmail.com', '$2b$10$q77gazUTRjYKsreq6Nfkq.RjAMzB/lIlvhnZfP6ic9qDgrRcZXpwC', 2147483647, '1714647646192-WIN_20230529_19_34_59_Pro.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posttable`
--
ALTER TABLE `posttable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posttable`
--
ALTER TABLE `posttable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posttable`
--
ALTER TABLE `posttable`
  ADD CONSTRAINT `posttable_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
