import jwt from 'jsonwebtoken';

export default function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            name: decoded.username,
            id: decoded.id,
            isValid: true,
            role: decoded.role
        };
    } catch (e) {
        return {
            name: null,
            id: null,
            isValid: false,
            role: null
        };
    }
}
