import jwt from "jsonwebtoken";

type UserPayload = {

    id: string;

    email: string;

    role: string;
};

// ================= GENERATE TOKEN =================
export const generateToken = (
    user: UserPayload
) => {

    return jwt.sign(

        {
            id: user.id,

            email: user.email,

            role: user.role,
        },

        process.env.JWT_SECRET as string,

        {
            expiresIn: "7d",
        }
    );
};

// ================= VERIFY TOKEN =================
export const verifyToken = (
    token: string
) => {

    try {

        return jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as UserPayload;

    } catch {

        return null;
    }
};