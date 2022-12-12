drop database if exists movie_db;
create database movie_db;

use movie_db;

create table movies (
  id int not null auto_increment primary key,
  name varchar(50) not null
);

create table reviews (
  id int not null auto_increment primary key,
  review_text text not null,
  movie_id int not null,
  foreign key (movie_id)
  references movies(id)
);