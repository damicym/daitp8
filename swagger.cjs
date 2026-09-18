/**
 * swagger.cjs
 * Script de generación de la especificación Swagger.
 * Ejecutar con: node swagger.cjs
 *
 * Nota: se usa .cjs porque el proyecto tiene "type": "module" en package.json,
 * y swagger-autogen requiere CommonJS.
 */
const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Provinces API',
    description: 'API REST para la gestión de provincias argentinas. Permite obtener, crear, actualizar y eliminar provincias.',
    version: '1.0.0',
    contact: {
      name: 'DAI TP8'
    }
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Provinces',
      description: 'Endpoints para la gestión de provincias'
    }
  ],
  // Las definitions se definen con la sintaxis nativa de swagger-autogen
  '@definitions': {
    Province: {
      type: 'object',
      description: 'Objeto que representa una provincia argentina con sus datos geográficos.',
      required: ['id', 'name', 'full_name'],
      properties: {
        id: { type: 'integer', description: 'Identificador único de la provincia.', example: 1 },
        name: { type: 'string', description: 'Nombre corto de la provincia.', example: 'Buenos Aires' },
        full_name: { type: 'string', description: 'Nombre completo oficial de la provincia.', example: 'Provincia de Buenos Aires' },
        latitude: { type: 'number', format: 'float', description: 'Latitud geográfica del centroide.', example: -36.6769 },
        longitude: { type: 'number', format: 'float', description: 'Longitud geográfica del centroide.', example: -60.5588 },
        display_order: { type: 'integer', description: 'Orden de visualización. Puede ser nulo.', example: 1 }
      }
    },
    ProvinceInput: {
      type: 'object',
      description: 'Datos requeridos para crear una nueva provincia.',
      required: ['id', 'name', 'full_name'],
      properties: {
        id: { type: 'integer', description: 'Identificador único. Debe ser único en la BD.', example: 25 },
        name: { type: 'string', description: 'Nombre corto de la provincia.', example: 'Nueva Provincia' },
        full_name: { type: 'string', description: 'Nombre completo oficial.', example: 'Provincia de Nueva Provincia' },
        latitude: { type: 'number', format: 'float', description: 'Latitud geográfica.', example: -34.0 },
        longitude: { type: 'number', format: 'float', description: 'Longitud geográfica.', example: -64.0 },
        display_order: { type: 'integer', description: 'Orden de visualización. Puede ser nulo.', example: 25 }
      }
    },
    ProvinceUpdateInput: {
      type: 'object',
      description: 'Datos para actualizar una provincia. El ID se toma del parámetro de ruta.',
      required: ['name', 'full_name'],
      properties: {
        name: { type: 'string', description: 'Nombre corto de la provincia.', example: 'Buenos Aires' },
        full_name: { type: 'string', description: 'Nombre completo oficial.', example: 'Provincia de Buenos Aires' },
        latitude: { type: 'number', format: 'float', description: 'Latitud geográfica.', example: -36.6769 },
        longitude: { type: 'number', format: 'float', description: 'Longitud geográfica.', example: -60.5588 },
        display_order: { type: 'integer', description: 'Orden de visualización. Puede ser nulo.', example: 1 }
      }
    },
    ErrorResponse: {
      type: 'string',
      description: 'Mensaje de error en texto plano.',
      example: 'Internal error'
    }
  }
}

const outputFile = './swagger-output.json'
// Se pasan ambos archivos: index.js para el prefijo de ruta y el controller para los endpoints
const endpointsFiles = ['./index.js', './src/controllers/province-controller.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
