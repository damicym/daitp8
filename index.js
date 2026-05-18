import express from "express"
import cors from "cors"
import ProvinceRouter from "./src/controllers/province-controller.js"

const app = express()
const port = 3000 // El puerto 3000 (http://localhost:3000)

// Middlewares
app.use(cors()) // Middleware de CORS.
app.use(express.json()) // Middleware para parsear y comprender JSON.

// Endpoints (todos los Routers)
app.get("/api/province", ProvinceRouter)
app.get("/api/province/:id", ProvinceRouter)
app.post("/api/province", ProvinceRouter)
app.put("/api/province", ProvinceRouter)
app.delete("/api/province/:id", ProvinceRouter)

// Inicio el Server y lo pongo a escuchar.
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})