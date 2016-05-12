import * as types from '../actions/actionTypes';

const initialState = {
  useReadability: false
};

export default function settor(state = initialState, action = {}) {
  switch (action.type) {
    case types.useReadability:
      return {
        ...state,
        useReadability: true
      };
    case types.dontUseReadability:
      return {
        ...state,
        useReadability: false
      };
    default:
      return state;
  }
}
