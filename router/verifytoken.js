const jwt = require('jsonwebtoken');

// Verify the jwt 

const VerifyToken = (req,res,next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Access denied..!");
    try {
        const verified = jwt.verify(token,process.env.Secret_Key);
        req.user = verified;

    }
    catch(err){
        res.status(400).send("Invalid Token");
    }
}