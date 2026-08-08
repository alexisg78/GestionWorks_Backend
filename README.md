# GestionWorks API (Backend)

Frontend: Angular 21 · Backend: NestJS · Base de datos: PostgreSQL

API RESTful para la gestión de incidencias y servicios.

Este proyecto forma parte de **GestionWorks**, una iniciativa personal orientada a desarrollar una aplicación Full Stack aplicando buenas prácticas de arquitectura, diseño de APIs y desarrollo backend con **NestJS**.

> 🚧 **Estado del Proyecto:** Work In Progress (WIP).

---

# 🛠️ Stack Tecnológico

## Backend

- NestJS
- TypeScript
- Node.js

## Persistencia

- PostgreSQL
- TypeORM

## Arquitectura

- Arquitectura Modular
- Controllers
- Services
- Repositories
- DTOs
- Exception Filters
- Guards
- JWT Authentication

---

# ✨ Características

- API RESTful
- Autenticación mediante JWT
- Validación de datos con DTOs
- Arquitectura modular
- Gestión de tickets
- Integración con PostgreSQL
- Manejo centralizado de errores
- Gestión de archivos e imágenes asociadas a los tickets

---

# 📐 Principios del proyecto

Durante el desarrollo se busca aplicar las siguientes buenas prácticas:

- Separación de responsabilidades.
- Arquitectura escalable y mantenible.
- Desacoplamiento entre la lógica de negocio y la infraestructura.
- Validación estricta de datos.
- Código tipado utilizando TypeScript.
- Organización modular por funcionalidades.

---

# 🚀 Objetivo

El objetivo principal de este proyecto es desarrollar una API robusta y escalable que sirva como base para la aplicación GestionWorks, aplicando buenas prácticas de desarrollo backend, arquitectura modular y diseño de APIs REST.

Además, este proyecto funciona como un espacio de aprendizaje donde aplico nuevas características del ecosistema NestJS, buenas prácticas de desarrollo backend y principios de arquitectura escalable.

---

# 🚧 En desarrollo

Actualmente se está trabajando en:

- Documentación de la API con Swagger.
- Nuevos módulos para la gestión de incidencias.
- Mejoras de rendimiento y refactorización continua.

---

# ▶️ Ejecutar en desarrollo

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar Nest CLI

```bash
npm install -g @nestjs/cli
```

### 4. Levantar la base de datos

```bash
docker compose up -d

# Nota: Asegurarse de que PostgreSQL se encuentre ejecutándose antes de iniciar la aplicación.
```

### 5. Configurar variables de entorno

Copiar el archivo:

```text
.env.template
```

como

```text
.env
```

y completar las variables correspondientes.

### 6. Ejecutar la aplicación

```bash
npm run start:dev
```

---

# 🔗 Frontend

La interfaz de usuario se encuentra en el siguiente repositorio:

👉 **Frontend (GestionWorks):** [GestionWorks](https://github.com/alexisg78/GestionWorks_Frontend.git)

---

# 🗺️ Roadmap

- [x] Arquitectura base
- [x] Configuración de PostgreSQL
- [x] Autenticación JWT
- [x] CRUD de Tickets
- [x] Gestión de archivos e imágenes
- [ ] Sistema de roles y permisos
- [ ] Documentación con Swagger
- [ ] Nuevos módulos para la gestión de incidencias
- [ ] Optimización y mejoras de rendimiento

> Este roadmap no es definitivo y continuará ampliándose a medida que evolucionen las necesidades del proyecto.

---

# 📄 Licencia

Proyecto desarrollado con fines educativos, de aprendizaje y como parte de mi portfolio personal de desarrollo Full Stack.
