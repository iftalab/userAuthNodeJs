const express = require('express');
const router = express.Router();
const File = require('../model/file');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        callback(null, Date.now()+file.originalname)
    }
});
const upload =  multer({ storage: storage });

//get all
router.get('/', function (req, res, next) {
    File.find()
        .exec()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//get one
router.get('/:fileId', function (req, res, next) {
    const id = req.params.fileId;
    File.findById(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ 'result': 'No valid object found for given ID' });
            }

        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//save
router.post('/', upload.single('file'), function (req, res, next) {
    console.log(req.file);
    const file = new File({
        _id: mongoose.Types.ObjectId(),
        nameServer: req.file.filename,
        nameOriginal : req.file.originalname,
        url: req.file.path,
        hash: "hashToGenerate",
        caption : req.body.caption
    });
    file.save()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//update
router.patch('/:fileId', function (req, res, next) {
    const id = req.params.fileId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    File.update({ _id: id }, updateOps)
        .exec()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//delete
router.delete('/:fileId', function (req, res, next) {
    const id = req.params.fileId;
    File.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "Object seems already deleted" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


module.exports = router;
