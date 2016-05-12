import * as types from './actionTypes';

export function useReadability() {
  return {
    type: types.useReadability
  };
}

export function dontUseReadability() {
  return {
    type: types.dontUseReadability
  };
}
