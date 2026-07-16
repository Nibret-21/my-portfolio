import { buildResourceRouter } from './resourceRouter.js';
import { BlogPost } from '../models/index.js';

export default buildResourceRouter(BlogPost, { orderBy: 'publishedAt' });
