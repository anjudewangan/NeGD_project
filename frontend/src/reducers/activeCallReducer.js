export const initialCallState = {
  activeCall: null,
};

export function callReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_CALL':
      return {
        ...state,
        activeCall: action.payload,
      };
    case 'CLEAR_CALL':
      return {
        ...state,
        activeCall: null,
      };
    default:
      return state;
  }
}