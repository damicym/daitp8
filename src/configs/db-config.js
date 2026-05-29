import 'dotenv/config'

const config = {
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'root',
  port: parseInt(process.env.DB_PORT || '5432', 10),
}

export default config
