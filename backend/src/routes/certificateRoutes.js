import { buildResourceRouter } from './resourceRouter.js';
import { Certificate } from '../models/index.js';

export default buildResourceRouter(Certificate, { orderBy: 'issueDate' });
