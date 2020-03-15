import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const successMutationGenerator = () => ({
  roomId: { $set: null },
  pinnedMessage: { $set: null },
  messageList: { $set: [] },
  messages: { $set: {} },
  selectedMessage: { $set: null },
  sendingMessageStatus: { $set: 'idle' },
});

const errorMutationGenerator = error => ({
  error: { $set: error.stack },
});

export const chatClearRoomReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
