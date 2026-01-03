# SecureBox

**SecureBox** is a modern, secure, and aesthetic web application designed for anonymous text sharing. Built with a "Security First" approach, it demonstrates robust defenses against common web vulnerabilities while maintaining a premium user experience.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

## 🌟 Features

- **🔒 Robust Security**:
  - **XSS Protection**: Multi-layered defense using backend escaping and frontend sanitization via `DOMPurify`.
  - **Secure Headers**: Implements comprehensive HTTP headers using `Helmet`.
  - **Content Security Policy (CSP)**: Strict rules to prevent unauthorized script execution.
  - **Input Validation**: Strict validation using `express-validator`.
- **🎨 Premium UI/UX**:
  - **Glassmorphism Design**: Modern, translucent aesthetics with background blur.
  - **Dark Mode**: Sleek dark theme with vibrant accent gradients.
  - **Responsive**: Fully responsive layout for all devices.
  - **Micro-interactions**: Smooth animations and hover effects.
- **⚡ Performance**:
  - Lightweight SQLite database.
  - Vanilla JavaScript frontend (no heavy framework overhead).

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3 (Custom), Vanilla JavaScript
- **Security Tools**: Helmet, Express-Validator, DOMPurify

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/m03j0e/ai_securebox.git
   cd ai_securebox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node server.js
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your console).

## 🛡️ Security Implementation Details

This project is a demonstration of secure coding practices:

- **SQL Injection**: All database queries use parameterized statements (`?` placeholders) to prevent SQL injection.
- **Stored XSS**: User input is escaped on the server-side before storage. Additionally, any rendered HTML is aggressively sanitized using `DOMPurify` on the client-side.
- **Reflected XSS**: The strict Content Security Policy (CSP) prevents the execution of malicious inline scripts.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the [ISC](https://opensource.org/licenses/ISC) license.