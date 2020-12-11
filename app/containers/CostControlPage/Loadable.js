/**
 *
 * Asynchronously loads the component for CostEstimates
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
