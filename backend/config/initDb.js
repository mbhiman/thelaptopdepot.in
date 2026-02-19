// initDb.js
const pool = require('./database');
const bcrypt = require('bcryptjs');

const initDatabase = async () => {
  const client = await pool.connect();
  try {
    console.log('🔧 Starting database initialization...');
    await client.query('BEGIN');

    // DROP in correct order for deterministic re-seed (only for init scripts)
    await client.query(`
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS categories CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);

    // Users
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Categories
    await client.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Products
    await client.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
      CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
      CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
      CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
    `);

    const defaultPassword = process.env.DEFAULT_ADMIN_PASS;
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const defaultUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin';

    if (!defaultPassword) {
      throw new Error('DEFAULT_ADMIN_PASS environment variable is required');
    }

    if (!defaultEmail) {
      throw new Error('DEFAULT_ADMIN_EMAIL environment variable is required');
    }

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await client.query(
      `INSERT INTO users (username, email, password, role)
   VALUES ($1, $2, $3, 'admin')
   ON CONFLICT (email) DO UPDATE
   SET username = EXCLUDED.username,
       password = EXCLUDED.password,
       role = 'admin'`,
      [defaultUsername, defaultEmail, hashedPassword]
    );


    // Default categories
    const categories = [
      { name: 'Laptops', slug: 'laptops', description: 'Premium refurbished laptops', icon: 'laptop' },
      { name: 'Desktops', slug: 'desktops', description: 'Powerful desktop computers', icon: 'desktop' },
      { name: 'Mobiles', slug: 'mobiles', description: 'Quality smartphones', icon: 'mobile' },
      { name: 'Accessories', slug: 'accessories', description: 'Essential tech accessories', icon: 'accessories' }
    ];

    for (const c of categories) {
      await client.query(
        `INSERT INTO categories (name, slug, description, icon)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO NOTHING`,
        [c.name, c.slug, c.description, c.icon]
      );
    }

    // Sample products (only if table empty)
    const { rows: existing } = await client.query(`SELECT COUNT(*)::int AS cnt FROM products`);
    if (existing[0].cnt === 0) {
      const laptopsCategory = await client.query(`SELECT id FROM categories WHERE slug = 'laptops' LIMIT 1`);
      const categoryId = laptopsCategory.rows[0].id;

      const sampleProducts = [
        // keep just a few safe sample items; mark some as featured
        {
          name: 'Dell Latitude 7490',
          slug: 'dell-latitude-7490',
          description: 'Premium business laptop...',
          price: 28999,
          original_price: 45000,
          brand: 'Dell',
          processor: 'Intel Core i5 8th Gen',
          ram: '8GB DDR4',
          storage: '256GB SSD',
          display: '14" FHD',
          condition: 'Excellent',
          warranty: '3 Months',
          stock_status: 'in_stock',
          is_featured: true
        },
      ];

      for (const p of sampleProducts) {
        await client.query(`
          INSERT INTO products (
            name, slug, description, price, original_price, category_id,
            brand, processor, ram, storage, display, condition, warranty,
            stock_status, is_featured
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
          ON CONFLICT (slug) DO NOTHING
        `, [
          p.name, p.slug, p.description, p.price, p.original_price, categoryId,
          p.brand, p.processor, p.ram, p.storage, p.display, p.condition, p.warranty,
          p.stock_status, p.is_featured
        ]);
      }
    }

    await client.query('COMMIT');
    console.log('✅ Database initialization completed successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

// Run initialization
initDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });