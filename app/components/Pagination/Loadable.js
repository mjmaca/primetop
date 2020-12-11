/**
 *
 * Asynchronously loads the component for Pagination
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
