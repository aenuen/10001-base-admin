/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : 20320-video

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2022-02-21 17:47:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for aa_user
-- ----------------------------
DROP TABLE IF EXISTS `aa_user`;
CREATE TABLE `aa_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isAdmin` tinyint(4) DEFAULT '0',
  `isUse` tinyint(4) DEFAULT '1',
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `petName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `realName` varchar(50) COLLATE utf8_unicode_ci DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `mobile` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `introduction` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `roles` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `created` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of aa_user
-- ----------------------------
INSERT INTO `aa_user` VALUES ('1', '1', '1', 'admin', 'e2b183463c56aaafee6825d2acb0a69e', 'abbott', '石志辉', 'aenuen@qq.com', '13055297726', '/constant/8.jpg', '我很懒', 'admin,lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('2', '1', '1', 'nickach', 'e2b183463c56aaafee6825d2acb0a69e', 'nick', '吴晓岩', 'nickach@163.com', '15950996098', '/constant/1.jpg', '123', 'admin,lawyer,editor', '1645436741');
INSERT INTO `aa_user` VALUES ('3', '1', '1', 'xuyongyun', '356ef4100dabfa157604e66520605223', 'xiaoxu', '许永云', 'xyy205@126.com', '13328277245', '/constant/1.jpg', null, 'lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('4', '1', '1', 'guojinbiao', '7f26b8bb416f57380363f90d0b52fd94', '123456', '郭锦标', 'gjb@qq.com', '13877777777', '/constant/1.jpg', null, 'lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('5', '1', '1', 'zhengyunda', '7f26b8bb416f57380363f90d0b52fd94', '123456', '郑运达', 'zyd@qq.com', '13766666666', '/constant/1.jpg', null, 'lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('6', '1', '1', 'yewen', '28bd13a24fcd46014591fd76793f11f2', '1234567', '叶文', '13705003343@139.com', '13705003343', '/constant/1.jpg', null, 'lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('7', '1', '1', 'huangqishan', '7f26b8bb416f57380363f90d0b52fd94', 'hqs', '黄其善', 'hqs@qq.com', '15222222222', '/constant/1.jpg', null, 'lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('8', '1', '1', 'wuxiaoyan', '7f26b8bb416f57380363f90d0b52fd94', 'xiaoyan', '吴晓妍', 'wxy@qq.com', '18974561232', '/constant/1.jpg', null, 'lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('9', '1', '1', 'lining', '7f26b8bb416f57380363f90d0b52fd94', 'lining', '李宁', 'lining@qq.com', '13348271948', '/constant/1.jpg', null, 'admin', '1645436741');
INSERT INTO `aa_user` VALUES ('10', '1', '1', 'hongdewen', '7f26b8bb416f57380363f90d0b52fd94', 'hongdewen', '洪德文', 'fzkrseed@126.com', '18006925055', '/constant/1.jpg', null, 'lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('11', '1', '1', 'guanhuai', '7f26b8bb416f57380363f90d0b52fd94', '关怀', '关怀', 'guanhuai@qq.com', '13055555555', '/constant/1.jpg', null, 'lawyer', '1645436741');
INSERT INTO `aa_user` VALUES ('12', '1', '1', 'aalhy', '7f26b8bb416f57380363f90d0b52fd94', 'aalhy', '梁泓燕', 'aalhy@qq.com', '15677777777', '/constant/1.jpg', null, 'lawyer', '1645436741');

-- ----------------------------
-- Table structure for aa_user_avatar
-- ----------------------------
DROP TABLE IF EXISTS `aa_user_avatar`;
CREATE TABLE `aa_user_avatar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of aa_user_avatar
-- ----------------------------

-- ----------------------------
-- View structure for b
-- ----------------------------
DROP VIEW IF EXISTS `b`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `b` AS select `aa_stats`.`client` AS `client`,count(0) AS `num` from `aa_stats` where (`aa_stats`.`client` <> '') group by `aa_stats`.`client` ;
