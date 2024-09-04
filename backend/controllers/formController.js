const Submission = require('../models/Submission');
const multer = require('multer');
const path = require('path');

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage, limits: { fileSize: 1000000 }, fileFilter: (req, file, cb) => {
    const filetypes = /png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Files should be PNG or PDF');
    }
}}).array('files', 3);

// Step 1: Save basic details
exports.saveStep1 = async (req, res) => {
    try {
        let submission = await Submission.findOne({ user: req.user.id, completed: false });
        if (!submission) {
            submission = new Submission({ user: req.user.id });
        }
        submission.step1 = req.body;
        await submission.save();
        res.json({ msg: 'Step 1 data saved' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Step 2: Save uploaded files
exports.saveStep2 = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }

        try {
            let submission = await Submission.findOne({ user: req.user.id, completed: false });
            if (!submission) {
                submission = new Submission({ user: req.user.id });
            }
            submission.step2 = req.files.map(file => ({ fileName: file.filename, fileUrl: `/uploads/${file.filename}` }));
            await submission.save();
            res.json({ msg: 'Step 2 data saved' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });
};

// Step 3: Save dropdown selections
exports.saveStep3 = async (req, res) => {
    try {
        let submission = await Submission.findOne({ user: req.user.id, completed: false });
        if (!submission) {
            submission = new Submission({ user: req.user.id });
        }
        submission.step3 = req.body.selections;
        submission.completed = true;
        await submission.save();
        res.json({ msg: 'Form submitted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get user's submissions
exports.getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ user: req.user.id });
        res.json(submissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
