const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

// GET /api/problems - list all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/problems - create a new problem
router.post('/', async (req, res) => {
  try {
    const { title, description, location } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const problem = new Problem({ title, description, location });
    const saved = await problem.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
