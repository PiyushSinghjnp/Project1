const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { saveStep1, saveStep2, saveStep3, getSubmissions } = require('../controllers/formController');

router.post('/step1', auth, saveStep1);
router.post('/step2', auth, saveStep2);
router.post('/step3', auth, saveStep3);
router.get('/submissions', auth, getSubmissions);

module.exports = router;
