const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async findByUsername(username) {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        return result.rows[0];
    }

    static async findById(id) {
        const result = await pool.query(
            'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    static async create(userData) {
        const { username, email, password, role = 'admin' } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role, created_at`,
            [username, email, hashedPassword, role]
        );
        return result.rows[0];
    }

    static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    static async updatePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query(
            'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            [hashedPassword, userId]
        );
    }
}

module.exports = User;
