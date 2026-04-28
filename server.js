const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// SEO and Security Headers Middleware
app.use((req, res, next) => {
    // Security headers
    res.setHeader("X-UA-Compatible", "IE=edge");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // SEO headers
    res.setHeader("Content-Language", "en-US");

    next();
});

// Static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Compression middleware for SEO (faster load times)
const compression = require("compression");
app.use(compression());

// Page routes
const pageRoutes = require("./routes/pages");
app.use("/", pageRoutes);

// 404 Handler with proper status code
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"), (err) => {
        if (err) {
            res.status(404).send("Page Not Found");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
