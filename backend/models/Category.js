const pool = require('../config/database');

class Category {
    static async findAll() {
        const result = await pool.query(
            'SELECT * FROM categories ORDER BY name ASC'
        );
        return result.rows;
    }

    static async findById(id) {
        const result = await pool.query(
            'SELECT * FROM categories WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async findBySlug(slug) {
        const result = await pool.query(
            'SELECT * FROM categories WHERE slug = $1',
            [slug]
        );
        return result.rows[0];
    }

    static async create(categoryData) {
        const { name, slug, description, icon } = categoryData;
        const result = await pool.query(
            `INSERT INTO categories (name, slug, description, icon)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [name, slug, description, icon]
        );
        return result.rows[0];
    }

    static async update(id, categoryData) {
        const { name, slug, description, icon } = categoryData;
        const result = await pool.query(
            `UPDATE categories 
       SET name = $1, slug = $2, description = $3, icon = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
            [name, slug, description, icon, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        await pool.query('DELETE FROM categories WHERE id = $1', [id]);
    }

    static async getWithProductCount() {
        const result = await pool.query(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      GROUP BY c.id
      ORDER BY c.name ASC
    `);
        return result.rows;
    }
}

module.exports = Category;
