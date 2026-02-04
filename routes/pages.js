const express = require("express");
const path = require("path");

const router = express.Router();

const viewsPath = path.join(__dirname, "..", "views");

router.get("/", (req, res) => {
    res.sendFile(path.join(viewsPath, "home", "index.html"));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(viewsPath, "about", "index.html"));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(viewsPath, "contact", "index.html"));
});

module.exports = router;
