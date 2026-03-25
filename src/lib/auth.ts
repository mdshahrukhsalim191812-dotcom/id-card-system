import jwt from "jsonwebtoken";

type UserPayload = {
    _id: string;
    email: string;
};

export const generateToken = (user: UserPayload) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );
};