import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const requestMutationGenerator = () => ({
  sendingMessageStatus: { $set: 'sending' },
  error: { $set: null },
});

const successMutationGenerator = () => ({
  sendingMessageStatus: { $set: 'done' },
});

const errorMutationGenerator = error => ({
  sendingMessageStatus: { $set: 'error' },
  error: { $set: error.stack },
});

export const chatSendMessageRequestReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      requestMutationGenerator)(payloadExtractor(action), currentState),
  );

export const chatSendMessageSuccessReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );

export const chatSendMessageFailureReducer = (currentState, action) =>
  updateState(
    currentState,
    errorMutationGenerator(payloadExtractor(action)),
  );
