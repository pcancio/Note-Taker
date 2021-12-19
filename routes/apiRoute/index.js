const router = require('express').Router();
const db = require('../apiRoute/db');
router.use(db);
module.exports = router;