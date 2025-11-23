const ClassContent = require('../models/ClassContent');
const { uploadBuffer } = require('../utils/uploadFirebase');

// Ensure there are class documents for classes 6-10 on server startup
async function ensureClasses() {
  for (let i = 6; i <= 10; i++) {
    const exists = await ClassContent.findOne({ classNumber: i });
    if (!exists) await ClassContent.create({ classNumber: i, books: [], notes: [], suggestions: [], formulas: [] });
  }
}
ensureClasses();

exports.getClass = async (req, res) => {
  const classNumber = parseInt(req.params.id);
  const doc = await ClassContent.findOne({ classNumber });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
};

exports.addBook = async (req, res) => {
  try {
    const classNumber = parseInt(req.params.id);
    const { title, description } = req.body;
    let fileURL = null;
    if (req.file) {
      // multer buffer is available
      const filename = `class${classNumber}/books/${Date.now()}-${req.file.originalname}`;
      fileURL = await uploadBuffer(req.file.buffer, filename, req.file.mimetype);
    }
    const doc = await ClassContent.findOneAndUpdate(
      { classNumber },
      { $push: { books: { title, description, fileURL } } },
      { new: true }
    );
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
};

exports.addSimple = async (req, res) => {
  // generic add to notes/suggestions/formulas
  try {
    const classNumber = parseInt(req.params.id);
    const { type } = req.params; // notes | suggestions | formulas
    const { title, description } = req.body;
    const update = {};
    update[type] = { title, description };
    const doc = await ClassContent.findOneAndUpdate(
      { classNumber },
      { $push: { [type]: { title, description } } },
      { new: true }
    );
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Failed' });
  }
};
