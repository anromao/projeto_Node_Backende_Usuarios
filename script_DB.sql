-- drop database db_sistema_web;
create database db_sistema_web;
use db_sistema_web;

create table tbusuarios(
    id int not null auto_increment,
    nome varchar(100) not null,
    email varchar(100)not null unique,
    primary key(id));

-- inserindo registros
insert into tbusuarios(nome,email)values('Maria Betania','mariabetania@hotmail.com');
insert into tbusuarios(nome,email)values('Julia Gomes', 'luliagomes@hotmail.com');
