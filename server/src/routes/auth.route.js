import express from "express";
import { AuthService } from "../services/auth.service.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const user = await AuthService.login(req.body);
        if (!user) return res.status(401).json({ error: "Invalid credentials" });
        // TODO: tại đây bạn có thể tạo JWT hoặc session
        res.json({ id: user.id, username: user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
