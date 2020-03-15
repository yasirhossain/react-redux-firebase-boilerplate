export const SHOW_INFOBANNER_ANIMATION_IN_FULL_SCREEN = true;
export const SHOW_INFOBANNER_ANIMATION_IN_EPG = false;

// How many times we retry to load/play a channel/show if error.
export const RETRIES_ON_ERROR = 3;
// How long we wait between retries
export const RETRY_RATE_IN_MS = 3 * 1000;

// Sometimes we are too much time buffering. In such case, makes sense to reload.
export const MAX_BUFFERING_TIME_IN_MS = 10 * 1000;

