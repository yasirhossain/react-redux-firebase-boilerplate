import { SELECT_MESSAGE, CLEAR_SELECTED_MESSAGE } from './types';

export const chatSelectMessageThunkAction = messageId =>
  (dispatch, getState) => {
    try {
      const { chat: { messageList = [] } = {} } = getState();

      if (!messageList.includes(messageId)) {
        throw new Error('Invalid message');
      }
      return dispatch({ type: SELECT_MESSAGE, payload: { messageId } });
    } catch (err) {
      return dispatch({
        type: SELECT_MESSAGE,
        payload: err,
        error: true,
      });
    }
  };

export const chatClearSelectedMessageAction = () => ({ type: CLEAR_SELECTED_MESSAGE });
