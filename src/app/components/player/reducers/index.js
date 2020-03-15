import { combineReducers } from 'redux';
import { playerInternalCaptionInUseIndexReducer } from './captionInUseIndex';
import { playerInternalCaptionListReducer } from './captionList';
import { playerInternalFullscreen } from './fullscreen';
import { playerInternalInfoBannerShownReducer } from './isInfoBannerShown';
import { playerInternalSavePlaybackPositionReducer } from './savePlaybackPosition';
import { playerInternalChangeCaptionsSettingsReducer } from './changeCaptionsSettings';

export const playerInternalReducer = combineReducers({
  captionList: playerInternalCaptionListReducer,
  captionInUseIndex: playerInternalCaptionInUseIndexReducer,
  captionsSettings: playerInternalChangeCaptionsSettingsReducer,
  isInfoBannerShown: playerInternalInfoBannerShownReducer,
  fullscreen: playerInternalFullscreen,
  playbackPosition: playerInternalSavePlaybackPositionReducer,
});
