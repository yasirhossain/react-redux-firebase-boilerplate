const AdStitcher = () => {
  let video,
      playerType,
      containerElem,
      src;

  const tagIterator = (tags) => {
    for (let tag of tags) {
      if (tag[0].startsWith('EXT-X-DATERANGE')) {
        console.log('ad event');
        // fire data range parser for ad
        adParser(tag);
        break;
      }
    }
  };

  const adParser = (ad) => {
    let nonParsedAd = ad.join(),
        adObj = {};

    nonParsedAd.split('",').reduce((acc, entry) => {
      let key = `${entry.split('="')[0].replace(/-/g, "")}`,
          value = entry.split('="')[1];

      if (acc !== undefined) adObj["ID"] = acc.split('="')[1];
      if (value.startsWith('http,')) value = value.replace(/http,/g, "http:");

      adObj[key] = value;
    });

    console.log(adObj);
  };

  const initVpaidStitcher = (elem, src, type) => {
    video = elem;
    playerType = type;
    src = src;
    containerElem = elem;

    console.log('vpaid stitcher loaded');
  };

  const jwPlayer = (elem, src) => {
    containerElem = elem;
    src = src;
    playerType = 'jwplayer';

    console.log('jwplayer loads');

    const jwplayerInstance = jwplayer(containerElem);

    jwplayerInstance.setup({
      playlist: [{
        sources: [{
          file: src
        }]
      }]
    });

    // Noticed performance issues with on meta event
    jwplayer().on('meta', (data) => {
      // TODO: JW8 to release EXT-X-DATERANGE in upcoming release, not in current version
      console.log(data);
    });
  };

  const hlsPlayer = (video, src) => {
    video = video;
    src = src;
    playerType = 'hls';

    console.log(video);

    console.log('hls loads');

    if (Hls.isSupported()) {
      let hls = new Hls(),
          fragLoaded = false;

      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, (e, data) => {
        video.play();
      });
      hls.on(Hls.Events.FRAG_CHANGED, (e, data) => {
        tagIterator(data.frag.tagList);
      });
    }
  };

  return {
    initVpaidStitcher,
    hlsPlayer,
    jwPlayer,
    tagIterator,
  }
}

module.exports = AdStitcher;
