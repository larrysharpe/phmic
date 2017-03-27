var router = require('express').Router();
var four0four = require('./utils/404')();
var controller = require('./routes.controller');

router.post('/unauth/validate', controller.createAccessCode); /// create access code
router.post('/unauth/resend', controller.resendAccessCode); /// resend access code
router.post('/unauth/access', controller.createAccessPoint); /// ???
router.post('/unauth/user', controller.createUserAccount); /// ???
router.post('/unauth/resetpassword', controller.passwordReset); /// ???
router.post('/unauth/resetpassword/:token', controller.passwordResetToken); /// ???
router.post('/auth', controller.login); /// login


router.get('/clients', controller.getPeople);
router.get('/clients/:id', controller.getPerson);
router.get('/user/info', controller.getUser);

router.get('/policies/:userid', controller.getPoliciesByUser);
router.get('/policies/byType/:type', controller.getPoliciesByType);
router.get('/policy/:id', controller.getPolicy);

module.exports = router;
