import _random from 'lodash/random';

const avatarBaseUrl = '//cf-whatson.pluto.tv/avatars/';
const totalAvatars = 23;

export const randomAvatarGenerator = () => `${avatarBaseUrl}${_random(1, totalAvatars)}.png`;
