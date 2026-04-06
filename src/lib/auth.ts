import jwt from "jsonwebtoken";

type UserPayload = {
    _id: string;  
    email: string;
    role: string;
};

export const generateToken = (user: any) => {
    return jwt.sign(
        {
            _id: user._id, 
            email: user.email,
            role: user.role || "school"
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
    } catch {
        return null;
    }
};