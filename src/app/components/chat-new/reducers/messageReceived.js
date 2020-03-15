import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const successMutationGenerator = ({ key, previousKey, ...message }) => ({
  messageList: { $addToSet: [key] },
  messages: { $auto: { [key]: { $set: message } } },
});

const errorMutationGenerator = error => ({
  messageList: { $set: [] },
  messages: { $set: {} },
  error: { $set: error.stack },
});

export const chatMessageReceivedReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
