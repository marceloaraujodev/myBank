import express from 'express';

const router = express.Router();

// user routes
router.get('/user/:id', (req, res) => {
  res.json('ok')
});

export default router