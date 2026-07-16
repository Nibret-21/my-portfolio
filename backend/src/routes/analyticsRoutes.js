import { Router } from 'express';
import { Op, fn, col } from 'sequelize';
import { AnalyticsEvent, Project } from '../models/index.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Public: fire-and-forget event tracking (called from the frontend on page views etc.)
router.post('/track', async (req, res, next) => {
  try {
    const { eventType, meta, device, country } = req.body;
    await AnalyticsEvent.create({ eventType, meta, device, country });
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// Admin: dashboard summary
router.get('/', requireAuth, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const [totalVisits, resumeDownloads, contactSubmits, deviceBreakdown, topProjects] = await Promise.all([
      AnalyticsEvent.count({ where: { eventType: 'visit' } }),
      AnalyticsEvent.count({ where: { eventType: 'resume_download' } }),
      AnalyticsEvent.count({ where: { eventType: 'contact_submit' } }),
      AnalyticsEvent.findAll({
        attributes: ['device', [fn('COUNT', col('device')), 'count']],
        where: { eventType: 'visit', device: { [Op.ne]: null } },
        group: ['device'],
      }),
      Project.findAll({ order: [['views', 'DESC']], limit: 5, attributes: ['id', 'title', 'views'] }),
    ]);

    res.json({
      totalVisits,
      resumeDownloads,
      contactSubmits,
      deviceBreakdown,
      topProjects,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
