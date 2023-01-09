import {
  UPDATE_BREAKPOINT
} from './actionTypes';


/**
 * Update the current breakpoint
 */
 export const updateCurrentBreakpoint = (breakpoint) => {
  return {
    type: UPDATE_BREAKPOINT,
    payload: breakpoint
  }
}