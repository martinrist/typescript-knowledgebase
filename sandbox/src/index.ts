// Note: Since `tsconfig.json#moduleResolution` is `nodeNext` and `package.json#type`
// is `module`, then relative imports need to specify `.js`
import { log } from './logger.js';

log('Hello World!');
