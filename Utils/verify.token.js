const jwt = require('jsonwebtoken');
const { createError } = require('./error');

// SecretKey
const secretKey = process.env.JWT_SECRET || 'SecretKey';

// Verify the Token That we generate with the key we give
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(createError(404, "You Are Not Authenticated"))
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return next(createError(403, "Token is Not Valid"))
        } else {
            req.user = user;
            next();
        }
    })
}

exports.verifyUser = (req, res, next) => {
    exports.verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You Are Not Authorized"))
        }
    })
}

exports.verifyAdmin = (req, res, next) => {
    exports.verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You Are Not Authorized"))
        }
    })
}
