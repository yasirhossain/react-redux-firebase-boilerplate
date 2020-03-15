import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';
import { omit } from 'lodash';

const successMutationGenerator = ({ id }) => ({
  messageList: list => list.filter(i => i !== id),
  messages: collection => omit(collection, id),
});

const errorMutationGenerator = error => ({
  error: { $set: error.stack },
});

export const chatMessageRemovedReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
