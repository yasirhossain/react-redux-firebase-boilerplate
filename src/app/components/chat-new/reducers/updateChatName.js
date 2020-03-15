import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const successMutationGenerator = ({ chatName }) => ({
  chatName: { $set: chatName },
});

const errorMutationGenerator = error => ({
  error: { $set: error.stack },
});

export const chatUpdateChatNameReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
