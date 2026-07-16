// Generates standard list/get/create/update/delete handlers for a Sequelize model.
// Public routes only mount the read handlers; admin routes mount all of them (see routes/*.js).
export const crudFactory = (Model, { orderBy = 'sortOrder' } = {}) => ({
  list: async (req, res, next) => {
    try {
      const items = await Model.findAll({
        order: orderBy ? [[orderBy, 'ASC']] : undefined,
      });
      res.json(items);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found.' });
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found.' });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found.' });
      await item.destroy();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
});
