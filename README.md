# GestionWorks API

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

## Stack Utilizado:
* Framework: Nestjs
* ORM: TypeORM
* Gestor de BD: Postgresql


