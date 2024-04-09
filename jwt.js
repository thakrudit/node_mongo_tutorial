const jet = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) =>{

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

    // Extract JWT token from request header
    const token = req.headers.authorization.split(' ')[1];
    if(token) return res.status(401).json({error: "Unauthorized"});
    try {
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({err: "Invalid Token"})
    }
}


// Function to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}

module.exports = {jwtAuthMiddleware, generateToken};