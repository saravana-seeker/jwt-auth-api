const router = require('express').Router();
const User = require('../model/User');
const { RegisterValidation,LoginValidation } = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Validation
// const Joi = require('joi');
// const schema = Joi.object({
//     name:Joi.string().min(6).required(),
//     email:Joi.string().min(6).required().email(),
//     password:Joi.string().min(6).required()
// });
    

// register 
router.post('/register',async (req,res,next) => {
    //validation 
    const { body } = req;
    const {error} = RegisterValidation(body);
    if (error) return res.status(400).send(error.details[0].message);
    //res.send("Success");
    // check of the email exist 
    const EmailExist = await User.findOne({email:req.body.email}) ;
    if (EmailExist) return res.status(400).send("Email exist ..!");

    //Hash the password 
    const hashPassword = await bcrypt.hash(req.body.password,10);
    //res.send(hashPassword);

    const user = new User ({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        console.log(error)
    }
})


//login

router.post('/login', async (req,res,next) => {
    const { body } = req;
    const {error} = LoginValidation(body);
    if (error) return res.status(400).send(error)
    
    // check of the email exist 
    const user = await User.findOne({email:req.body.email}) ;
    if (!user) return res.status(401).send("Email not in database ..!");
    
    //Check for password is correct 
    const ValidPassword = await bcrypt.compare(req.body.password,user.password)
    if (!ValidPassword) return res.status(400).send("Invalid password")


    //Create and assign jwt 
    const token = await jwt.sign({_id:user._id},process.env.Secret_Key);
    res.header('auth-token',token).send(user.name);
    
    //res.send("Success");

})



module.exports = router


