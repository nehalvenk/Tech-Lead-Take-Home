import { Router } from 'express';
import Submission from '../models/Submission.js';

const router = Router();
const SETTABLE_STATUSES = ['unsubmitted', 'submitted'];

// GET /api/submissions?search=&status=&startDate=&endDate=
router.get('/', async (req, res) => {
  try {
    const { search, status, startDate, endDate } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search && search.trim()) {
      query.title = { $regex: search.trim(), $options: 'i' };
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const submissions = await Submission.find(query).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/submissions
router.post('/', async (req, res) => {
  try {
    const { status, ...rest } = req.body;
    const safeStatus = SETTABLE_STATUSES.includes(status) ? status : 'unsubmitted';
    const submission = new Submission({ ...rest, status: safeStatus });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/submissions/:id
router.put('/:id', async (req, res) => {
  try {
    const { status, ...rest } = req.body;
    const update = { ...rest };
    if (status !== undefined) {
      if (!SETTABLE_STATUSES.includes(status)) {
        return res.status(400).json({ message: `Status must be one of: ${SETTABLE_STATUSES.join(', ')}` });
      }
      update.status = status;
    }
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true },
    );
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
