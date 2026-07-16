import { buildResourceRouter } from './resourceRouter.js';
import { Testimonial } from '../models/index.js';

export default buildResourceRouter(Testimonial, { orderBy: 'createdAt' });
