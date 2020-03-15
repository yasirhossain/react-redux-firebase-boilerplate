import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const successMutationGenerator = ({ pinnedMessage }) => ({
  pinnedMessage: { $set: pinnedMessage },
  selectedMessage: { $set: null },
});

const errorMutationGenerator = error => ({
  error: { $set: error.stack },
});

export const chatPinMessageReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
