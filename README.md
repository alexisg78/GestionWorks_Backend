# GestionWorks API (Backend)

API RESTful diseñada para la administración y seguimiento de tickets de soporte. Este proyecto es una iniciativa personal para implementar una arquitectura escalable y moderna basada en **NestJS**.

> 🚧 **Estado del Proyecto:** Work In Progress (WIP).
> Actualmente me encuentro migrando y refactorizando la lógica de negocio, implementando mejores prácticas de arquitectura modular, DTOs y validaciones.

## 🛠️ Stack Tecnológico
* **Framework:** NestJS
* **Lenguaje:** TypeScript
* **ORM:** TypeORM
* **Base de Datos:** PostgreSQL
* **Arquitectura:** Modular (Controllers, Services, Repositories)

## 🚀 Objetivo
El objetivo principal de este repositorio es demostrar la implementación de una **arquitectura de backend robusta**, desacoplando la lógica de negocio del framework y asegurando la integridad de los datos mediante transacciones y validaciones estrictas.

## Ejecutar en desarrollo

1. Clonar el repositorio

2. Ejecutar:
```
  npm install
```
3. Tener Nest CLI instalado
```
  npm i -g nestjs/cli
```
4. Levantar la Base de Datos
```
  docker-compose up -d
```




5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. Configurar las variables de entorno definidas en el __.env__

7. Ejecutar la aplicación en dev: 
```
  npm run start:dev
```


