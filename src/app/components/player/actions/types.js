const ActionType = actionType => `PLAYER_INTERNAL_${actionType}`;

export const SET_CAPTION_LIST = ActionType('SET_CAPTION_LIST');
export const USE_CAPTION = ActionType('USE_CAPTION');
export const CHANGE_CAPTIONS_SETTINGS = ActionType('CHANGE_CAPTIONS_SETTINGS');
export const RESET_CAPTIONS_SETTINGS = ActionType('RESET_CAPTIONS_SETTINGS');

export const SHOW_INFO_BANNER = ActionType('SHOW_INFO_BANNER');
export const HIDE_INFO_BANNER = ActionType('HIDE_INFO_BANNER');

export const ENTERED_FULLSCREEN = ActionType('ENTERED_FULLSCREEN');
export const EXITED_FULLSCREEN = ActionType('EXITED_FULLSCREEN');

export const SAVE_PLAYBACK_POSITION = ActionType('SAVE_PLAYBACK_POSITION');

export const GA_HEART_BEAT = ActionType('GA_HEART_BEAT');
export const GA_AD_IMPRESSION = ActionType('GA_AD_IMPRESSION');
