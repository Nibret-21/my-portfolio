import { buildResourceRouter } from './resourceRouter.js';
import { Achievement } from '../models/index.js';

export default buildResourceRouter(Achievement, { orderBy: 'date' });
