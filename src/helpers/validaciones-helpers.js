import 'dotenv/config'
import fs from 'fs'
import path from 'path'

const { promises: fsPromises } = fs

class LogHelper {
	constructor() {
		this.filePath = process.env.LOG_FILE_PATH || './logs'
		this.fileName = process.env.LOG_FILE_NAME || 'app.log'
		this.logToFileEnabled = (process.env.LOG_TO_FILE_ENABLED || 'false').toLowerCase() === 'true'
		this.logToConsoleEnabled = (process.env.LOG_TO_CONSOLE_ENABLED || 'true').toLowerCase() === 'true'
	}

	/**
	 * Almacena en un archivo y/o muestra por consola información del error.
	 * @param {*} errorObject Error, string o cualquier objeto serializable
	 */
	async logError(errorObject) {
		try {
			const timestamp = new Date().toISOString()
			let message = ''

			if (errorObject instanceof Error) {
				message = errorObject.stack || errorObject.message
			} else if (typeof errorObject === 'string') {
				message = errorObject
			} else {
				try {
					message = JSON.stringify(errorObject)
				} catch (e) {
					message = String(errorObject)
				}
			}

			const logLine = `${timestamp} - ${message}\n`

			if (this.logToConsoleEnabled) {
				console.error(logLine)
			}

			if (this.logToFileEnabled) {
				const dir = this.filePath
				const file = path.join(dir, this.fileName)
				await fsPromises.mkdir(dir, { recursive: true })
				await fsPromises.appendFile(file, logLine, { encoding: 'utf8' })
			}
		} catch (err) {
			// Si falla el logger, al menos mostramos en consola para no perder la traza
			console.error('LogHelper failed:', err)
		}
	}
}

export default new LogHelper()