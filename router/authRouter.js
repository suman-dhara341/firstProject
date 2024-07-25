const express = require('express');
const router = express.Router();
const auth = require('../controller/authController');
const zodMiddleware=require('../middleware/zodMiddleware')
const zodValidaion=require('../validation/zodValidation')
const contact=require('../controller/contactControler')
const authMiddleware =require('../middleware/authMiddleware')

router.route('/registration').post(zodMiddleware(zodValidaion.registrationSchema),auth.register);
router.route('/login').post(zodMiddleware(zodValidaion.loginSchema),auth.login);
router.route('/contact').post(zodMiddleware(zodValidaion.contactSchema),contact);
router.route('/user').get(authMiddleware,auth.user);




module.exports = router;
