import { buildResourceRouter } from './resourceRouter.js';
import { Experience } from '../models/index.js';

export default buildResourceRouter(Experience, { orderBy: 'startDate' });
