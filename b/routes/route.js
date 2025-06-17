const express = require('express');;


const router = express.Router();

const {userController} = require('../controller/userConntroller');

router.get('/',userController);

module.exports = router;