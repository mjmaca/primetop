/**
 *
 * Asynchronously loads the component for Onboard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
