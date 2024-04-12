const express = require("express");
const router = express.Router();
const menu_item = require('./../models/menu_item');

router.get('/', async (req, res) => {
    try {
        const data = await menu_item.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ err: 'internal server error' });
    }

});

router.post('/createMenu', async (req, res) => {
    try {
        const menu_data = req.body;
        const new_menu_data = new menu_item(menu_data);
        const response = await new_menu_data.save();
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json({ err: 'internal server error in menu_items' });
    }
});

module.exports = router;

