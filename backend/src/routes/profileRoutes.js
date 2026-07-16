import { Router } from 'express';
import { Profile } from '../models/index.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(1);
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

router.put('/', requireAuth, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const [profile] = await Profile.findOrCreate({ where: { id: 1 } });
    await profile.update(req.body);
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

export default router;
