const express = require('express');
const router = express.Router();
const registrationCtrl = require('../controllers/registrationController');

router.post('/register', express.json(), registrationCtrl.register);
router.post('/generate-payment', express.json(), registrationCtrl.generatePayment);
router.post('/upload-payment', registrationCtrl.uploadPaymentMiddleware.single('screenshot'), registrationCtrl.uploadPayment);
router.get('/admin/registrations', registrationCtrl.listRegistrations);

module.exports = router;
