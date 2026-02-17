const pool = require('./database');

const initDb = async () => {
  const client = await pool.connect();

  try {
    console.log('🔧 Initializing database schema...');

    await client.query('BEGIN');

    // 1️⃣ Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ users table ready');

    // 2️⃣ Categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ categories table ready');

    // 3️⃣ Products table (foreign key last)
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        brand VARCHAR(100),
        processor VARCHAR(100),
        ram VARCHAR(50),
        storage VARCHAR(100),
        graphics VARCHAR(100),
        display VARCHAR(100),
        battery VARCHAR(100),
        condition VARCHAR(50),
        warranty VARCHAR(100),
        image_url TEXT,
        stock_status VARCHAR(20) DEFAULT 'in_stock',
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✓ products table ready');

    await client.query('COMMIT');
    console.log('✅ Database schema initialized successfully');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Schema initialization failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
};

initDb();
