import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const successMutationGenerator = ({ avatarUrl, avatarFilePath }) => ({
  avatarUrl: { $set: avatarUrl },
  avatarFilePath: { $set: avatarFilePath },
});

const errorMutationGenerator = error => ({
  error: { $set: error.stack },
});

export const chatUpdateAvatarReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
