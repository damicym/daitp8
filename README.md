# Provinces API — DAI TP8

## Descripción

API REST para la gestión de provincias argentinas. Permite consultar, crear, modificar y eliminar provincias, incluyendo datos geográficos como latitud, longitud y nombre completo oficial.

## Tipo de API

API propia, desarrollada en Node.js con Express y conectada a una base de datos PostgreSQL.

## URL base

```
http://localhost:3000/api/province
```

## Documentación interactiva (Swagger)

Una vez iniciado el servidor, la documentación Swagger UI está disponible en:

```
http://localhost:3000/api-docs
```

Para regenerar la especificación Swagger:

```bash
node swagger.cjs
```

## Endpoints

| Método   | Endpoint               | Descripción                                              |
|----------|------------------------|----------------------------------------------------------|
| GET      | `/api/province`        | Obtiene todas las provincias ordenadas por display_order |
| GET      | `/api/province/:id`    | Obtiene una provincia específica por su ID               |
| POST     | `/api/province`        | Crea una nueva provincia                                 |
| PUT      | `/api/province/:id`    | Actualiza todos los datos de una provincia existente     |
| DELETE   | `/api/province/:id`    | Elimina una provincia                                    |

## Modelo de datos — Province

| Campo           | Tipo    | Descripción                                          |
|-----------------|---------|------------------------------------------------------|
| `id`            | integer | Identificador único de la provincia                  |
| `name`          | string  | Nombre corto de la provincia                         |
| `full_name`     | string  | Nombre completo oficial de la provincia              |
| `latitude`      | float   | Latitud geográfica del centroide de la provincia     |
| `longitude`     | float   | Longitud geográfica del centroide de la provincia    |
| `display_order` | integer | Orden de visualización en listados (puede ser nulo)  |

## Cómo ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Configurar las variables de entorno copiando `.env.example` a `.env` y completando los valores.

3. Iniciar el servidor:

```bash
node index.js
```
