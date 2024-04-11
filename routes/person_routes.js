const express = require("express");
const router = express.Router();
const person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ err: 'internal server error' });
    }

});

router.post('/signup', async (req, res) => {
    try {
        
        const data = req.body;
        
        const new_data = new person(data);
        
        const response = await new_data.save();
        const payload = {
            id: response.id,
            username: response.username
        }
        
        const token = generateToken(payload);
        res.status(200).json({response: response, token: token});

    } catch (err) {
        res.status(500).json({ err: 'Internal server error...' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await person.findOne({username: username});

        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        res.json({token})


    } catch (err) {
        res.status(500).json({ err: 'internal server error' });
    }
});

router.get('/:work', async (req, res) =>{
    try{
        const work_type = req.params.work_type;
        if(work_type){
            const response = await person.find(work_type);
            res.status(200).json(response);
        }
        res.status(500).json({ err: 'Invalid Work Type' });
    }catch (err) {
        res.status(500).json({ err: 'internal server error in params work' });
    }
});

module.exports = router;