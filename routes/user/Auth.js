const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("../../utils/validator")
const User = require("../../schema/schema") .UserSchema//check schema

router.post("/signup", async (req, res) => {
    //Check input validations
    const { error } = validator.validateSignup(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    //check if email already exists
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    //encrypting password by hash&salt
    const salt = await bcrypt.genSalt(15);
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password,
      role : 'user'
    });
    user.save()


})


router.post("/signin", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Wrong/Invalid email." });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Incorrect Password" });
    }
  
    //create JWT
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
        role : user.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );
  
    res.header("authtoken", token).json({ accessToken: token });
  });
  
  module.exports = router;