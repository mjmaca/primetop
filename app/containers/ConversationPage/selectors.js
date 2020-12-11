import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the conversationPage state domain
 */

const selectConversationPageDomain = state =>
  state.conversationPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ConversationPage
 */

const makeSelectConversationPage = () =>
  createSelector(
    selectConversationPageDomain,
    substate => substate,
  );

export default makeSelectConversationPage;
export { selectConversationPageDomain };
