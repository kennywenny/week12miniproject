-- create movie_db database
-- create movies and reviews tables

drop database if exists movie_db;
create database movie_db;

use movie_db;

create table movies (
  id int not null auto_increment primary key,
  name varchar(50)
);