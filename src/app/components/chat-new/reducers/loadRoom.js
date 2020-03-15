import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const successMutationGenerator = ({ roomId, messages, messageList }) => ({
  roomId: { $set: roomId },
  messages: { $set: messages },
  messageList: { $set: messageList },
  isVisible: { $set: true },
});

const errorMutationGenerator = error => ({
  roomId: { $set: null },
  isVisible: { $set: false },
  error: { $set: error.stack },
});

export const chatLoadRoomReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
