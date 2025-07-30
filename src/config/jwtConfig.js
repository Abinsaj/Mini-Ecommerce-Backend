import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret_key = process.env.JWT_SECRET_KEY

const createToken = (user_id, role)=> {
    return jwt.sign({ user_id, role }, secret_key, { expiresIn: '10m' });
}

const createRefreshToken = (user_id, role) => {
    return jwt.sign({ user_id, role }, secret_key, { expiresIn: "7d" });
}

export { createToken, createRefreshToken,  };