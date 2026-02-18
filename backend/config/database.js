const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || null;

const pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: Number(process.env.PG_MAX_CLIENTS || 20),
    idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS || 30000),
    connectionTimeoutMillis: Number(process.env.PG_CONN_TIMEOUT_MS || 10000),
});

pool.on('connect', () => {
    console.log('✓ Database connected successfully (Postgres / Neon)');
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err);
    process.exit(-1);
});

module.exports = pool;