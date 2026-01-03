const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../db/database');

const router = express.Router();

/**
 * GET /api/messages
 * Retrieve recent messages
 */
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM messages ORDER BY created_at DESC LIMIT 50';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to retrieve messages' });
        }
        // Escape content here or on client?
        // It's best to send raw and let client escape, OR escape here.
        // Given the plan "Frontend sanitization", we will send as is, 
        // BUT for extra safety in a "security focused" app, we could escape here too.
        // However, if we escape here, we might double escape on client.
        // Let's stick to sending raw JSON and ensure client handles it safely (textContent vs innerHTML).
        // The implementation plan mentioned "Use parameterized queries" (done in DB) and "Sanitize on arrival".

        res.json({ messages: rows });
    });
});

/**
 * POST /api/messages
 * Store a new message
 */
router.post(
    '/',
    [
        // Validation
        body('content')
            .trim()
            .notEmpty().withMessage('Message content cannot be empty')
            .isLength({ max: 500 }).withMessage('Message is too long (max 500 chars)')
            // Sanitize/Escape to prevent storing malicious scripts if we were to render blindly (but we won't).
            // .escape() // This converts < to &lt; etc.
            // The plan said "Sanitize input on arrival". So let's escape it.
            .escape()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { content } = req.body;
        const sql = 'INSERT INTO messages (content) VALUES (?)';

        db.run(sql, [content], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ error: 'Failed to save message' });
            }
            res.status(201).json({
                message: 'Message saved successfully',
                id: this.lastID,
                content: content // Echo back the sanitized content
            });
        });
    }
);

module.exports = router;
