import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const selectMutationGenerator = ({ messageId }) => ({
  selectedMessage: { $set: messageId },
});

const selectErrorMutationGenerator = error => ({
  selectedMessage: { $set: null },
  error: { $set: error.stack },
});

const clearMutationGenerator = () => ({
  selectedMessage: { $set: null },
  error: { $set: null },
});

export const chatSelectMessageReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      selectErrorMutationGenerator :
      selectMutationGenerator)(payloadExtractor(action)),
  );

export const chatClearSelectedMessageReducer = (currentState, action) =>
  updateState(
    currentState,
    clearMutationGenerator(payloadExtractor(action)),
  );
