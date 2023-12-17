const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
try{
        const token = req.header('k-token');

        if (!token) {
            return res.status(400).json({ error: 'Token Not found' });
        }
        const decode = jwt.verify(token, 'jwtSecret');
        req.user = decode.user;

        
        next();
    }
       catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Invalid token' });
       }
    }