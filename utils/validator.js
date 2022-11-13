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