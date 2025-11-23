
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // memory storage
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { getClass, addBook, addSimple } = require('../controllers/class.controller');

router.get('/:id', getClass);
router.post('/:id/books', verifyToken, verifyAdmin, upload.single('file'), addBook);
router.post('/:id/:type(notes|suggestions|formulas)', verifyToken, verifyAdmin, addSimple);

module.exports = router;
