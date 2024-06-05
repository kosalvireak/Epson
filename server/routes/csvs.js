const express = require('express');
const router = express.Router();
const Csv = require('../models/Csvs');
const { isLoggedIn, isOwner, auth } = require("../middleware");
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

router.use(bodyParser.json());

router.get('/get', auth, async (req, res) => {
    try {
        const userId = req.user.id;
        const csvs = await Csv.find({ "author": userId });
        if (csvs.length === 0) {
            console.log("You don't have csv");
            res.status(400).json({ msg: "You don't have any csv." });
        } else {
            res.json(csvs);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/new', auth, async (req, res) => {
    try {
        const dataFromUserUpload = req.body;
        if (!dataFromUserUpload) {
            return res.status(400).json({ msg: "File not found." });
        }
        else {
            const { title } = dataFromUserUpload;
            const newCsv = new Csv(
                dataFromUserUpload
            );
            newCsv.upload = new Date();
            newCsv.author = req.user.id;
            await newCsv.save();
            res.json({
                msg: `Successfully upload ${title}.`,
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ msg: "Failed upload Csv" });
    }
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID.');
    }
    console.log(id)
    try {
        const rGetOneCsv = await Csv.findById({ _id: id })
        if (rGetOneCsv) {
            res.json(rGetOneCsv);
        } else {
            res.status(404).send('Cannot get the .Csv, file not found.');
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send('Cannot get csv');
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID.');
    }
    const csv = await Csv.findById({ _id: id })
    if (csv.length === 0) {
        return res.status(400).json({ msg: "Csv not found." });
    }
    else {
        if (csv.author.toHexString() !== req.user.id) {
            return res.status(400).json({ msg: "You are not the owner of this file." });
        }
        else {
            try {
                const deletedCsv = await Csv.findByIdAndDelete({ _id: id })
                res.json({
                    msg: `Successfully delete ${deletedCsv.title}.`,
                });
            } catch (error) {
                console.log(error);
                return res.status(400).json({ msg: "Cannot delete csv" });
            }
        }
    }

})

router.put('/update/:id', async (req, res) => {
    const updateCsv = await Csv.updateOne(
        { _id: req.params.id },
        { $set: req.body.data })
    res.json(updateCsv);
})

module.exports = router

