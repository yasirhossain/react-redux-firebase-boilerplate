import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const successMutationGenerator = message => ({
  pinnedMessage: { $set: message },
});

const errorMutationGenerator = error => ({
  pinnedMessage: { $set: null },
  error: { $set: error.stack },
});

export const chatMessagePinnedReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
