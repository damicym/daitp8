import DBConfig from '../configs/db-config.js'
import pkg from 'pg'
const { Client } = pkg
import logHelper from '../helpers/validaciones-helpers.js'

export default class ProvinceRepository {
	getAllAsync = async () => {
		let returnArray = null
		const client = new Client(DBConfig)
		try {
			await client.connect()
			const sql = 'SELECT * FROM provinces ORDER BY display_order NULLS LAST, id'
			const result = await client.query(sql)
			await client.end()
			returnArray = result.rows
			await logHelper.log(`Se consiguió exitosamente ${returnArray.length} provinces`)
		} catch (error) {
			await logHelper.log(new Error(error))
			try {
				await client.end()
			} catch (e) {
				await logHelper.log(new Error(e))
			}
		}
		return returnArray
	}

	getByIdAsync = async (id) => {
		let row = null
		const client = new Client(DBConfig)
		try {
			await client.connect()
			const sql = 'SELECT * FROM provinces WHERE id = $1'
			const result = await client.query(sql, [id])
			await client.end()
			if (result.rows.length > 0) {
				row = result.rows[0]
				await logHelper.log(`Se consiguió exitosamente province con id=${id}`)
			}
		} catch (error) {
			await logHelper.log(new Error(error))
			try { 
				await client.end() 
			} catch (e) {
				await logHelper.log(new Error(e))
			}
		}
		return row
	}

	createAsync = async (entity) => {
		let created = null
		const client = new Client(DBConfig)
		try {
			await client.connect()
			const sql = `INSERT INTO provinces (id, name, full_name, latitude, longitude, display_order)
				VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`
			const params = [entity.id, entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order]
			const result = await client.query(sql, params)
			await client.end()
			if (result.rows.length > 0) {
				created = result.rows[0]
				await logHelper.log(`Se creó exitosamente province con id=${created.id}`)
			}
		} catch (error) {
			await logHelper.log(new Error(error))
			try { 
				await client.end() 
			} catch (e) { 
				await logHelper.log(new Error(e)) 
			}
		}
		return created
	}

	updateAsync = async (entity) => {
		let updated = null
		const client = new Client(DBConfig)
		try {
			await client.connect()
			const sql = `UPDATE provinces SET name = $2, full_name = $3, latitude = $4, longitude = $5, display_order = $6
				WHERE id = $1 RETURNING *`
			const params = [entity.id, entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order]
			const result = await client.query(sql, params)
			await client.end()
			if (result.rows.length > 0) {
				updated = result.rows[0]
				await logHelper.log(`Se actualizó exitosamente province con id=${updated.id}`)
			}
		} catch (error) {
			await logHelper.log(new Error(error))
			try { 
				await client.end() 
			} catch (e) {
				await logHelper.log(new Error(e))
			}
		}
		return updated
	}

	deleteByIdAsync = async (id) => {
		let deleted = false
		const client = new Client(DBConfig)
		try {
			await client.connect()
			const sql = 'DELETE FROM provinces WHERE id = $1'
			const result = await client.query(sql, [id])
			await client.end()
			deleted = result.rowCount > 0
			await logHelper.log(`Se eliminó exitosamente province con id=${id}`)
		} catch (error) {
			await logHelper.log(new Error(error))
			try { 
				await client.end() 
			} catch (e) {
				await logHelper.log(new Error(e))
			}
		}
		return deleted
	}
}

