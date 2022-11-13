const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const validator = require("../../utils/validator")
const Admin = require("../../schema/schema").AdminSchema


router.post("/signup", async (req, res) => {
    //Check input validations
    const { error } = validator.signupValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    //check if email exists in db
    const checkEmail = await Admin.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    //encrypting password by hash&salt
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password,
      role : 'admin'
    })
    admin.save()

})   