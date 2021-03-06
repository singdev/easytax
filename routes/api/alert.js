const authController = require('../../src/interface_adapter/controller/AuthController');
const express = require('express');
const router = express.Router();

const Alert = require('../../src/framework_driver/database/mongoDB/models/AlertModel');

router.post('/', authController.verifyAccessToken, async function (req, res, next) {
    req.body.user = req.auth.credentials.uid;
    const alert = new Alert(req.body);
    try {
        const result = await alert.save();
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/', authController.verifyAccessToken, async function (req, res, next) {
    console.log(req.auth);
    const alerts = await Alert.find({ user: req.auth.credentials.uid });
    res.send(alerts);
});

router.put('/:id', authController.verifyAccessToken, async function (req, res, next) {
    try {
        const result = await Alert.findOneAndUpdate({ _id: req.params.id },  req.body);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/all', authController.verifyAccessToken, async function(req, res, next){
    try {
      const result = await Alert.deleteMany({ user: req.auth.credentials.uid });
      res.send(result);
    } catch(err){
       console.log(err);
       res.sendStatus(500);
    }
})

module.exports = router;