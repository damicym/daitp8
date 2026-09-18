import express from "express"
import cors from "cors"
import { createRequire } from "module"
import swaggerUi from "swagger-ui-express"
import ProvinceRouter from "./src/controllers/province-controller.js"

const require = createRequire(import.meta.url)
const swaggerOutput = require("./swagger-output.json")

const app = express()
const port = 3000 // El puerto 3000 (http://localhost:3000)

// Middlewares
app.use(cors()) // Middleware de CORS.
app.use(express.json()) // Middleware para parsear y comprender JSON.

// Swagger UI — documentación accesible en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.use('/api/province', ProvinceRouter)

// Inicio el Server y lo pongo a escuchar.
app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
	console.log(`Swagger docs available at http://localhost:${port}/api-docs`)
})
