const express = require('express');
const helmet = require('helmet');
const path = require('path');
const messagesRouter = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());

// CSP Configuration: modifying Helmet's default CSP to allow our scripts/styles if needed.
// For now, defaults are usually fine for a simple static site, but we might need to tweak for inline scripts or CDNs depending on frontend implementation.
// Let's allow 'self' and maybe unsafe-inline for simplicity during dev, but safer is 'self' only.
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"], // Allow inline scripts and cdnjs
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"], // Google fonts often used
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:"],
        },
    })
);


// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/messages', messagesRouter);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running securely on http://localhost:${PORT}`);
});
