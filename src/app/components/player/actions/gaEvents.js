import ReactGA from 'react-ga';
import { GA_HEART_BEAT, GA_AD_IMPRESSION } from './types';

export const playerInternalGAHeartBeatThunkAction = () =>
  (dispatch) => {
    ReactGA.event({
      category: 'ga-heartbeat',
      action: 'ga-heartbeat',
    });
    dispatch({ type: GA_HEART_BEAT });
  };

export const playerInternalGAAdImpressionThunkAction = () =>
  (dispatch) => {
    ReactGA.event({
      category: 'ga-cm',
      action: 'ga-cm-impression',
    });
    dispatch({ type: GA_AD_IMPRESSION });
  };
