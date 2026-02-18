const pool = require('../config/database');

class Product {
    static async findAll(filters = {}) {
        let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
        const params = [];
        let paramCount = 1;

        if (filters.category_id) {
            query += ` AND p.category_id = $${paramCount}`;
            params.push(filters.category_id);
            paramCount++;
        }

        if (filters.stock_status) {
            query += ` AND p.stock_status = $${paramCount}`;
            params.push(filters.stock_status);
            paramCount++;
        }

        if (filters.is_featured !== undefined) {
            query += ` AND p.is_featured = $${paramCount}`;
            params.push(filters.is_featured);
            paramCount++;
        }

        if (filters.search) {
            query += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount} OR p.brand ILIKE $${paramCount})`;
            params.push(`%${filters.search}%`);
            paramCount++;
        }

        query += ' ORDER BY p.created_at DESC';

        const result = await pool.query(query, params);
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query(
            `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
            [id]
        );
        return result.rows[0];
    }

    static async findBySlug(slug) {
        const result = await pool.query(
            `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.slug = $1`,
            [slug]
        );
        return result.rows[0];
    }

    static async findByCategory(categorySlug) {
        const result = await pool.query(
            `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       INNER JOIN categories c ON p.category_id = c.id
       WHERE c.slug = $1
       ORDER BY p.created_at DESC`,
            [categorySlug]
        );
        return result.rows;
    }

    static async create(productData) {
        const {
            name, slug, description, price, original_price, category_id,
            brand, processor, ram, storage, graphics, display, battery,
            condition, warranty, image_url, stock_status, is_featured
        } = productData;

        const result = await pool.query(
            `INSERT INTO products (
        name, slug, description, price, original_price, category_id,
        brand, processor, ram, storage, graphics, display, battery,
        condition, warranty, image_url, stock_status, is_featured
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING *`,
            [
                name, slug, description, price, original_price, category_id,
                brand, processor, ram, storage, graphics, display, battery,
                condition, warranty, image_url, stock_status, is_featured
            ]
        );
        return result.rows[0];
    }

    static async update(id, productData) {
        const {
            name, slug, description, price, original_price, category_id,
            brand, processor, ram, storage, graphics, display, battery,
            condition, warranty, image_url, stock_status, is_featured
        } = productData;

        const result = await pool.query(
            `UPDATE products SET
        name = $1, slug = $2, description = $3, price = $4, original_price = $5,
        category_id = $6, brand = $7, processor = $8, ram = $9, storage = $10,
        graphics = $11, display = $12, battery = $13, condition = $14, warranty = $15,
        image_url = $16, stock_status = $17, is_featured = $18, updated_at = CURRENT_TIMESTAMP
       WHERE id = $19
       RETURNING *`,
            [
                name, slug, description, price, original_price, category_id,
                brand, processor, ram, storage, graphics, display, battery,
                condition, warranty, image_url, stock_status, is_featured, id
            ]
        );
        return result.rows[0];
    }

    static async updateStock(id, stock_status) {
        const result = await pool.query(
            `UPDATE products SET stock_status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
            [stock_status, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
    }

    static async getFeatured() {
        const result = await pool.query(
            `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.is_featured = true AND p.stock_status = 'in_stock'
       ORDER BY p.created_at DESC
       LIMIT 6`
        );
        return result.rows;
    }

    static async getStats() {
        const result = await pool.query(`
      SELECT 
        COUNT(*) as total_products,
        COUNT(CASE WHEN stock_status = 'in_stock' THEN 1 END) as in_stock,
        COUNT(CASE WHEN stock_status = 'out_of_stock' THEN 1 END) as out_of_stock,
        COUNT(CASE WHEN is_featured = true THEN 1 END) as featured
      FROM products
    `);
        return result.rows[0];
    }
}

module.exports = Product;
