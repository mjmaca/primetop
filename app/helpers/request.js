export const createRequestState = REQUEST => {
  const REQUEST_STATE = {};
  const STATES = ['REQUEST', 'SUCCESS', 'FAILURE'];

  STATES.forEach(STATE => {
    REQUEST_STATE[STATE] = `${REQUEST}_${STATE}`;
  });

  return REQUEST_STATE;
};
