import React from 'react';
import { stopPropagation } from 'app-source/utils/stopPropagation';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import ClosedCaptionIcon from '@material-ui/icons/ClosedCaption';
import ClosedCaptionOutlinedIcon from '@material-ui/icons/ClosedCaptionOutlined';
import ReplyIcon from '@material-ui/icons/Reply';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import FastRewind30Icon from '@material-ui/icons/Replay30';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastForward30Icon from '@material-ui/icons/Forward30';
import CastIcon from '@material-ui/icons/Cast';
import SettingsIcon from '@material-ui/icons/Settings';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Tooltip from '@material-ui/core/Tooltip';
import s from './style/buttons';
import { AssetsFileResolver } from '../../../application/containers/AssetsFileResolver';
import { withNamespaces } from 'react-i18next';

// TODO: Add keyboard events
/* eslint-disable jsx-a11y/click-events-have-key-events */
const Cast = stopPropagation(props => (
  <s.button aria-label="Cast video" {...props}>
    <CastIcon />
  </s.button>
));

let CCOn = stopPropagation(props => (
  <Tooltip title={props.t('captions_on')}>
    <s.button aria-label="Closed captions" {...props}>
      <ClosedCaptionIcon />
    </s.button>
  </Tooltip>
));

CCOn = withNamespaces()(CCOn);

let CCOff = stopPropagation(props => (
  <Tooltip title={props.t('captions_off')}>
    <s.button aria-label="Closed captions" {...props}>
      <ClosedCaptionOutlinedIcon />
    </s.button>
  </Tooltip>
));

CCOff = withNamespaces()(CCOff);

let CCDisabled = stopPropagation(props => (
  <Tooltip title={props.t('closed_captions_disabled')}>
    <s.button aria-label="Closed captions" {...props}>
      <ClosedCaptionIcon color="disabled" />
    </s.button>
  </Tooltip>
));
CCDisabled = withNamespaces()(CCDisabled);

const Share = stopPropagation(props => (
  <s.button aria-label="Share video" {...props}>
    <ReplyIcon style={{ transform: 'scaleX(-1)' }} />
  </s.button>
));

const Settings = stopPropagation(props => (
  <s.button aria-label="Video settings" {...props}>
    <SettingsIcon />
  </s.button>
));

const Fullscreen = stopPropagation(props => (
  <s.button aria-label="Fullscreen" {...props}>
    <FullscreenIcon />
  </s.button>
));

const ExitFullscreen = stopPropagation(props => (
  <s.button aria-label="Exit fullscreen" {...props}>
    <FullscreenExitIcon />
  </s.button>
));

const Rewind = stopPropagation(props => (
  <s.button aria-label="Rewind video" {...props}>
    <FastRewindIcon />
  </s.button>
));

const Rewind30 = stopPropagation(props => (
  <s.button aria-label="Rewind 30s video" {...props}>
    <FastRewind30Icon />
  </s.button>
));

const Forward = stopPropagation(props => (
  <s.button aria-label="Forward video" {...props}>
    <FastForwardIcon />
  </s.button>
));

const Forward30 = stopPropagation(props => (
  <s.button aria-label="Forward 30s video" {...props}>
    <FastForward30Icon />
  </s.button>
));

const Play = props => (
  <s.button aria-label="Play video" {...props}>
    <PlayCircleFilledIcon />
  </s.button>
);

const Pause = props => (
  <s.button aria-label="Pause video" {...props}>
    <PauseCircleFilledIcon />
  </s.button>
);

const Mute = props => (
  <s.volume aria-label="Mute video" {...props}>
    <VolumeUpIcon />
  </s.volume>
);

let Unmute = props => (
  <s.unmute aria-label="Unmute video" {...props}>
    <VolumeOffIcon />
    {props.t('unmute')}
  </s.unmute>
);
Unmute = withNamespaces()(Unmute);

const CollapsePlayer = props => (
  <s.button style={{ marginTop: '1px' }} aria-label="Collapse video" {...props}>
    <AssetsFileResolver path="images/dock-down.svg" />
  </s.button>
);

const ExpandPlayer = props => (
  <s.button style={{ marginTop: '1px' }} aria-label="Expand video" {...props}>
    <AssetsFileResolver path="images/dock-up.svg" />
  </s.button>
);
/* eslint-enable jsx-a11y/click-events-have-key-events */

export {
  Cast,

  CCOn,
  CCOff,
  CCDisabled,

  Share,
  Settings,
  Fullscreen,
  ExitFullscreen,
  ExpandPlayer,
  CollapsePlayer,

  Rewind,
  Rewind30,
  Forward,
  Forward30,

  Play,
  Pause,

  Mute,
  Unmute,
};
