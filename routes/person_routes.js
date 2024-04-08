const express = require("express");
const router = express.Router();
const person = require('./../models/person');

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ err: 'internal server error' });
    }

});

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const new_data = new person(data);

        const response = await new_data.save();
        res.status(200).json(response);

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