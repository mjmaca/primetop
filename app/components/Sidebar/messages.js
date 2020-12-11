/*
 * Sidebar Messages
 *
 * This contains all the text for the Sidebar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Sidebar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Sidebar component!',
  },
});
