import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createToken } from '../config/jwtConfig.js';

dotenv.config()

const secret_key = process.env.JWT_SECRET_KEY 

const verifyUserToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.UserAccessToken;
        if (accessToken) {
            jwt.verify(accessToken, secret_key, async (err, decoded) => {
                if (err) {
                    await handleRefreshToken(req, res, next);
                } else {
                    const { role } = decoded;
                    if (role !== "user") {
                        return res.status(401).json({ message: "Access Denied, Insufficient token payloads" });
                    }
                    next();
                }
            });
        } else {
            await handleRefreshToken(req, res, next);
        }
    } catch (error) {
        res.status(401).json({ message: "Access Denied, token is not valid" });
    }
};

const handleRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.UserRefreshToken;
        if (refreshToken) {
            jwt.verify(refreshToken, secret_key, (err, decoded) => {
                if (err) {
                    return res.status(HTTP_statusCode.Unauthorized).json({ message: "Access Denied, Refresh token not valid" });
                } else {
                    const { user_id, role } = decoded;
                    console.log(user_id,role)
                    if (!user_id || !role) {
                        return res.status(HTTP_statusCode.Unauthorized).json({ message: "Access Denied, Insufficient token payloads" });
                    } else {
                        const accessToken = createToken(user_id, role);
                        res.cookie('UserAccessToken', accessToken, {
                            httpOnly: true,
                            sameSite: 'strict',
                            maxAge: 15 * 60 * 1000,
                            secure: true
                        });
                        console.log(accessToken);
                        next();
                    }
                }
            });
        } else {
            return res.status(HTTP_statusCode.Unauthorized).json({ message: "Access Denied, Refresh Token not provided" });
        }
    } catch (error) {
        res.status(HTTP_statusCode.Unauthorized).json({ message: "Access Denied, token is not valid" });
    }
};

export {verifyUserToken}