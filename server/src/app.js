import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mount route
app.use("/api/auth", authRouter);

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Đăng ký
async function register(username, password) {
    const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

// Đăng nhập
async function login(username, password) {
    const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

// Ví dụ gọi:
document.getElementById("btn-login").onclick = async () => {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    const result = await login(u, p);
    console.log(result);
};
