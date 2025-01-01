import express from 'express';
import { searchPhotos } from '../services/pexelsService';

const router = express.Router();

router.get('/search', async (req, res) => {
  const query = req.query.query as string;

  if (!query) {
    res.status(400).json({ message: 'Query parameter is required' });
    return
  }

  try {
    const photos = await searchPhotos(query);
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
