const express = require("express");
const { getPostgresClient } = require("./db");

const router = express.Router();

// Test API
router.get("/test", (req, res) => {
    res.json({ message: "API is working" });
});

// Get Employees
router.get("/employees", async (req, res) => {
    let client;
    try {
        client = await getPostgresClient();

        // Ensure table exists and seed data
        await client.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL
      );
    `);

        await client.query(`
      INSERT INTO employees (name, role)
      VALUES 
        ('Alice', 'Developer'),
        ('Bob', 'Designer'),
        ('Charlie', 'Product Manager')
      ON CONFLICT DO NOTHING;
    `);

        const result = await client.query("SELECT * FROM employees;");
        res.json({ data: result.rows });
    } catch (err) {
        console.error("DB Error:", err);
        res.status(500).json({ error: err });
    } finally {
        if (client) await client.end();
    }
});

module.exports = router;
