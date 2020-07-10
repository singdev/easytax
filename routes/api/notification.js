const authController = require('../../src/interface_adapter/controller/AuthController');
const express = require('express');
const router = express.Router();

const Notification = require('../../src/framework_driver/database/mongoDB/models/NotificationModel');

router.post('/', authController.verifyAccessToken, async function (req, res, next) {
    req.body.user = req.auth.credentials.uid;
    const notification = new Notification(req.body);
    try {
        const result = await notification.save();
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/', authController.verifyAccessToken, async function (req, res, next) {
    const notifcations = await Notification.find({ user: req.auth.credentials.uid });
    res.send(notifcations);
});

router.put('/:id', authController.verifyAccessToken, async function (req, res, next) {
    try {
        const result = await Notification.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/all', authController.verifyAccessToken, async function(req, res, next){
    try {
      const result = await Notification.findAndDelete({ user: req.auth.credentials.uid });
      res.send(result);
    } catch(err){
       console.log(err);
       res.sendStatus(500);
    }
})

module.exports = router;