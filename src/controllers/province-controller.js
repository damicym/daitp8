import { Router } from 'express'
import ProvinceService from '../services/province-service.js'

const router = Router()
const svc = new ProvinceService()

router.get('', async (req, res) => {
	try {
		const rows = await svc.getAllAsync()
		return res.status(200).json(rows)
	} catch (err) {
		return res.status(500).send('Internal error')
	}
})

router.get('/:id', async (req, res) => {
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

