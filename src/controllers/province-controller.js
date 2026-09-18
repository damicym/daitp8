import { Router } from 'express'
import ProvinceService from '../services/province-service.js'

const router = Router()
const svc = new ProvinceService()

router.get('', async (req, res) => {
	/*
	  #swagger.tags = ['Provinces']
	  #swagger.summary = 'Obtener todas las provincias'
	  #swagger.description = 'Retorna el listado completo de provincias ordenadas por display_order y luego por id.'
	  #swagger.responses[200] = {
	    description: 'Lista de provincias obtenida exitosamente.',
	    schema: { type: 'array', items: { $ref: '#/definitions/Province' } }
	  }
	  #swagger.responses[500] = {
	    description: 'Error interno del servidor.',
	    schema: { $ref: '#/definitions/ErrorResponse' }
	  }
	*/
	try {
		const rows = await svc.getAllAsync()
		return res.status(200).json(rows)
	} catch (err) {
		return res.status(500).send('Internal error')
	}
})

router.get('/:id', async (req, res) => {
	/*
	  #swagger.tags = ['Provinces']
	  #swagger.summary = 'Obtener una provincia por ID'
	  #swagger.description = 'Retorna los datos de una provincia específica según su identificador numérico.'
	  #swagger.parameters['id'] = {
	    in: 'path',
	    description: 'Identificador numérico de la provincia.',
	    required: true,
	    type: 'integer',
	    example: 1
	  }
	  #swagger.responses[200] = {
	    description: 'Provincia encontrada exitosamente.',
	    schema: { $ref: '#/definitions/Province' }
	  }
	  #swagger.responses[404] = {
	    description: 'No se encontró una provincia con el ID proporcionado.',
	    schema: { $ref: '#/definitions/ErrorResponse' }
	  }
	  #swagger.responses[500] = {
	    description: 'Error interno del servidor.',
	    schema: { $ref: '#/definitions/ErrorResponse' }
	  }
	*/
	try {
		const id = parseInt(req.params.id, 10)
		const entity = await svc.getByIdAsync(id)
		if (entity) return res.status(200).json(entity)
		return res.status(404).send('Not found')
	} catch (err) {
		return res.status(500).send('Internal error')
	}
})

router.post('', async (req, res) => {
	/*
	  #swagger.tags = ['Provinces']
	  #swagger.summary = 'Crear una nueva provincia'
	  #swagger.description = 'Crea y persiste una nueva provincia con los datos proporcionados en el body.'
	  #swagger.requestBody = {
	    required: true,
	    content: {
	      'application/json': {
	        schema: { $ref: '#/definitions/ProvinceInput' }
	      }
	    }
	  }
	  #swagger.responses[201] = {
	    description: 'Provincia creada exitosamente. Retorna el objeto creado.',
	    schema: { $ref: '#/definitions/Province' }
	  }
	  #swagger.responses[500] = {
	    description: 'Error interno del servidor o fallo al crear la provincia.',
	    schema: { $ref: '#/definitions/ErrorResponse' }
	  }
	*/
	try {
		const payload = req.body
		const created = await svc.createAsync(payload)
		if (created) return res.status(201).json(created)
		return res.status(500).send('Error creating')
	} catch (err) {
		return res.status(500).send('Internal error')
	}
})

router.put('/:id', async (req, res) => {
	/*
	  #swagger.tags = ['Provinces']
	  #swagger.summary = 'Actualizar una provincia existente'
	  #swagger.description = 'Actualiza todos los campos de una provincia identificada por su ID. El ID se toma del parámetro de ruta y se combina con el body.'
	  #swagger.parameters['id'] = {
	    in: 'path',
	    description: 'Identificador numérico de la provincia a actualizar.',
	    required: true,
	    type: 'integer',
	    example: 1
	  }
	  #swagger.requestBody = {
	    required: true,
	    content: {
	      'application/json': {
	        schema: { $ref: '#/definitions/ProvinceUpdateInput' }
	      }
	    }
	  }
	  #swagger.responses[200] = {
	    description: 'Provincia actualizada exitosamente. Retorna el objeto actualizado.',
	    schema: { $ref: '#/definitions/Province' }
	  }
	  #swagger.responses[404] = {
	    description: 'No se encontró una provincia con el ID proporcionado.',
	    schema: { $ref: '#/definitions/ErrorResponse' }
	  }
	  #swagger.responses[500] = {
	    description: 'Error interno del servidor.',
	    schema: { $ref: '#/definitions/ErrorResponse' }
	  }
	*/
	try {
		const id = parseInt(req.params.id, 10)
		const payload = { ...req.body, id }
		const updated = await svc.updateAsync(payload)
		if (updated) return res.status(200).json(updated)
		return res.status(404).send('Not found')
	} catch (err) {
		return res.status(500).send('Internal error')
	}
})

router.delete('/:id', async (req, res) => {
	/*
	  #swagger.tags = ['Provinces']
	  #swagger.summary = 'Eliminar una provincia'
	  #swagger.description = 'Elimina permanentemente una provincia de la base de datos según su ID.'
	  #swagger.parameters['id'] = {
	    in: 'path',
	    description: 'Identificador numérico de la provincia a eliminar.',
	    required: true,
	    type: 'integer',
	    example: 1
	  }
	  #swagger.responses[204] = {
	    description: 'Provincia eliminada exitosamente. No retorna contenido.'
	  }
	  #swagger.responses[404] = {
	    description: 'No se encontró una provincia con el ID proporcionado.',
	    schema: { $ref: '#/definitions/ErrorResponse' }
	  }
	  #swagger.responses[500] = {
	    description: 'Error interno del servidor.',
	    schema: { $ref: '#/definitions/ErrorResponse' }
	  }
	*/
	try {
		const id = parseInt(req.params.id, 10)
		const deleted = await svc.deleteByIdAsync(id)
		if (deleted) return res.status(204).send()
		return res.status(404).send('Not found')
	} catch (err) {
		return res.status(500).send('Internal error')
	}
})

export default router
