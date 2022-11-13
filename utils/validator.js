const Joi = require('joi')
const jwt = require('jsonwebtoken')



const validateSignup =(data)=>{
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().required().email(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      })

    return schema.validate(data)
}

const verifyToken = (req, res, next) => {
    const token = req.header("authtoken");
    if (token == null) return res.status(401).json({ error: "Access denied" });
    try {
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log("VERIFIED : ", verified.name);
  
      req.user = verified;
      next();
    }
    catch (err) {
      res.status(400).json({ error: "Invalid" });
    }
  }

module.exports={
    validateSignup,
    verifyToken
}