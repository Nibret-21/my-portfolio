import { Router } from 'express';
import { crudFactory } from '../controllers/crudFactory.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

// GET routes are public; POST/PUT/DELETE require an authenticated admin.
export const buildResourceRouter = (Model, opts = {}) => {
  const router = Router();
  const { list, getOne, create, update, remove } = crudFactory(Model, opts);

  router.get('/', list);
  router.get('/:id', getOne);
  router.post('/', requireAuth, requireRole('admin', 'editor'), create);
  router.put('/:id', requireAuth, requireRole('admin', 'editor'), update);
  router.delete('/:id', requireAuth, requireRole('admin'), remove);

  return router;
};
