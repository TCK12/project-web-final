import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const AuthService = {
    // Tạo user mới (với hash password)
    register: async ({ username, password }) => {
        const hash = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: { username, password: hash },
        });
    },

    // Đăng nhập: kiểm tra username + password
    login: async ({ username, password }) => {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) return null;
        const match = await bcrypt.compare(password, user.password);
        return match ? user : null;
    },
};
