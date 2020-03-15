import { isError } from 'flux-standard-action';
import { payloadExtractor } from 'app-webtech-core/es/reducers/payloadExtractor';
import { updateState } from 'app-webtech-core/es/reducers/updateState';

const successMutationGenerator = ({
  chatUserId,
  chatUserType,
  chatName,
  avatarUrl,
  avatarFilePath,
  role,
  disableChat,
}) => ({
  isConfigured: { $set: true },
  chatUserId: { $set: chatUserId },
  chatUserType: { $set: chatUserType },
  chatName: { $set: chatName },
  avatarUrl: { $set: avatarUrl },
  avatarFilePath: { $set: avatarFilePath },
  role: { $set: role },
  disableChat: { $set: disableChat },
});

const errorMutationGenerator = error => ({
  isConfigured: { $set: false },
  chatUserId: { $set: null },
  chatUserType: { $set: null },
  chatName: { $set: null },
  avatarUrl: { $set: null },
  avatarFilePath: { $set: null },
  role: { $set: null },
  disableChat: { $set: false },
  error: { $set: error.stack },
});

export const chatSetupReducer = (currentState, action) =>
  updateState(
    currentState,
    (isError(action) ?
      errorMutationGenerator :
      successMutationGenerator)(payloadExtractor(action)),
  );
