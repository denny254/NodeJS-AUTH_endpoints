const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const User = require('../models/user')
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email});
        if(existingUser) {
            return res.status(400).send({
                message: "Email already exists"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword, 
        });
        const result = await user.save();
        const { password, ...data } = result.toJSON();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: 'An error occurred during registration',
            error: error.message
        });
    }
});


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({
                message: 'User not found'
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({
                message: 'Invalid credentials'
            });
        }  
        const token = jwt.sign({ id: user._id,
             email: user.email }, process.env.JWT_SECRET,
              { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.send({
            message: 'Login successful',     
        });
    } catch (error) {
        res.status(500).send({
            message: 'An error occurred during login',
            error: error.message
        });
    }
});


router.get('/user', async (req, res) => {
    const token = req.cookies['token']; 

    if (!token) {
        return res.status(401).send({
            message: 'No token provided, unauthenticated'
        });
    }

    try {
        const claims = jwt.verify(token, process.env.JWT_SECRET);

        if (!claims) {
            return res.status(401).send({
                message: 'Unauthenticated'
            });
        }

        const user = await User.findOne({ _id: claims.id });

        const {password, ...data} = await user.toJSON()

        res.send(data);

    } catch (error) {
        res.status(401).send({
            message: 'Invalid or expired token',
            error: error.message
        });
    }
});


router.post('/logout',(req, res) => {
    res.cookie('token', '', {maxAge: 0})

    res.send({
        message: 'Logout successful'
    })
})

module.exports = router;