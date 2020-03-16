const DATA = {
  charLimit: 75,
  channels: [
    {
      title: "Pluto TV Movies",
      slug: "pluto-tv-movies",
      id: "564b9ed65fbbbca07e8d09d2",
      banner: "http://pluto.tv.s3.amazonaws.com/channels/564b9ed65fbbbca07e8d09d2/featuredImage.jpg"
    },
    {
      title: "Fight",
      slug: "fight",
      id: "5812b0f2237a6ff45d16c3f9",
      banner: "http://pluto.tv.s3.amazonaws.com/channels/5812b0f2237a6ff45d16c3f9/featuredImage.jpg"
    },
    {
      title: "Horror 24/7",
      slug: "horror",
      id: "569546031a619b8f07ce6e25",
      banner: "http://pluto.tv.s3.amazonaws.com/assets/images/channels/2c4af0a3-b851-f212-1806-52cfe91abd28-Horror247_featured.jpg"
    },
    {
      title: "IMPACT Wrestling",
      slug: "impact-wrestling",
      id: "59b722526996084038c01e1b",
      banner: "http://pluto.tv.s3.amazonaws.com/channels/59b722526996084038c01e1b/featuredImage.jpg"
    },
    {
      title: "Whats On Pluto",
      slug: "whats-on",
      id: "58e2cd77a84e99942f414e68",
      banner: "http://pluto.tv.s3.amazonaws.com/channels/58e2cd77a84e99942f414e68/featuredImage.jpg"
    },
    {
      title: "Funny AF",
      slug: "funny-af",
      id: "580e87ff497c73ba2f321dd3",
      banner: "http://pluto.tv.s3.amazonaws.com/assets/images/channels/2c4af0a3-b851-f212-1806-52cfe91abd28-Horror247_featured.jpg"
    },
    {
      title: "Anime All Day",
      slug: "anime",
      id: "5812b7d3249444e05d09cc49",
      banner: "http://s3.amazonaws.com/pluto.tv/assets/images/channels/24ae8c46-742b-d311-7743-cadb2ce939ed-anime_featured.jpg"
    },
    {
      title: "Nerdist",
      slug: "nerdist",
      id: "561c5c7f3286e48904fb2586",
      banner: "http://pluto.tv.s3.amazonaws.com/assets/images/channels/bb5b66a2-9927-94fe-a346-751120398eb3-Nerdist_hero.jpg"
    },
    {
      title: "Live Music Replay",
      slug: "live-music-replay",
      id: "5873fc21cad696fb37aa9054",
      banner: "http://pluto.tv.s3.amazonaws.com/assets/images/channels/ee0298f1-d9df-fa01-1f45-0e07d10c9ce8-Hero Optional 1560x878.jpg"
    }

  ],
  campaigns: [
    {
      title: "Fight Party Live",
      description: "GLORY LYON 47",
      startTime: '2017-10-28T15:00:00+00:00',
      type: "LIVESTREAM",
      slug: 'fight',
    }
  ],
  videos: [
    {
      title: "MTV",
      src: "https://pluto-live.plutotv.net/m/hlslive/mtv-03a/0/mtv-03a.m3u8?profID=444&n=0&ctype=0&userParams=ccp%3DeyJkZXZpY2VJZCI6IjNhNGJhMGViLTQ1ODItNDk1MC1iMDY1LTgzMzdjYjZhOTM3YSIsImRldmljZVZlcnNpb24iOiI3OS4wLjM5NDUuMTMwIiwiYXBwVmVyc2lvbiI6IjUuMC4zLTVhNjlmMDQyMWJmYWEyMWFjZjU3YzdmNTRmOTkxNDEyODM1OWM2NGUiLCJkZXZpY2VUeXBlIjoid2ViIiwiZGV2aWNlTWFrZSI6IkNocm9tZSIsImFkdmVydGlzaW5nSWQiOiIiLCJkZXZpY2VMYXQiOiIzNC4wNzQwIiwiZGV2aWNlTG9uIjoiLTExOC4yNjExIiwiZGV2aWNlRE5UIjoiMCIsImRldmljZU1vZGVsIjoiQ2hyb21lIiwidXNlcklkIjoiIiwiYXBwTmFtZSI6IndlYiIsImFyY2hpdGVjdHVyZSI6IiIsImluY2x1ZGVFeHRlbmRlZEV2ZW50cyI6ImZhbHNlIiwic3JjUHJvdG9jb2wiOiJodHRwIiwic3RpdGNoZXJWZXJzaW9uIjoiMi4zMi4wIiwic3RpdGNoZXJSZXFJZCI6IjIxNjVhMzEwLWJlYWMtNDM3ZS1iMDk4LWIyM2FmNzI2MWJmYSIsImFkSW1wcmVzc2lvblByb3h5Ijp0cnVlLCJpcF9hZGRyZXNzIjoiNDUuNDguMjQ5LjIyOSIsImRldmljZV91YSI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83OS4wLjM5NDUuMTMwIFNhZmFyaS81MzcuMzYiLCJkZXZpY2VVc2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNV80KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNzkuMC4zOTQ1LjEzMCBTYWZhcmkvNTM3LjM2IiwiaXBBZGRyZXNzIjoiNDUuNDguMjQ5LjIyOSIsImNoSWQiOiI1ZDE0ZmRiOGNhOTFlZWRlZTE2MzMxMTciLCJ0aW1lbGluZUlkIjoiNWUyMGYyMWNhNGFiZGQwMDA5NGVkNDZjIiwiY2xpcElkIjoiNWQ0MDhjZDNkNWI3NWY1MDgyZDkwMzExIiwic2Vzc2lvbklkIjoiYjM5OTg2ZWItY2M0Yi00ZWE0LWFjMGUtYTA4OWQ1ZmM3YjU4IiwiZXBpc29kZUlkIjoiNWQ0MzAwMTYwZjdkYjY0ZjJjZWM3NmU0IiwicGFydG5lckNvZGUiOiJNVFYiLCJwYXJ0bmVyX2lkIjoiNWNhNmFhMjcxNWE2MjA3OGQyZWMyM2NkIiwib3JpZ2luIjoiYWRTcGFyeCIsImZyb21fc3RpdGNoZXIiOnRydWV9&adsid=AXDgfhU631QLH0nPR1rX&chname=mtv-03a&pub=cd44c23c-4796-475f-bcb1-b846bed4cf40&acsurl=pluto-acs-lb.adsparx.net&mcdn=pluto-live.plutotv.net%2Fm",
    },
    {
      title: "Fight",
      src: "https://stitcher.pluto.tv/stitch/hls/channel/5812b0f2237a6ff45d16c3f9/master.m3u8?deviceType=web&serverSideAds=true&deviceMake=safari&deviceVersion=1&deviceId=spencer&appVersion=1&deviceDNT=0&deviceModel=web&sid=yasirProd"
    },
    {
      title: "Horror 24/7",
      src: "https://stitcher.pluto.tv/stitch/hls/channel/569546031a619b8f07ce6e25/master.m3u8?deviceType=web&serverSideAds=true&deviceMake=safari&deviceVersion=1&deviceId=spencer&appVersion=1&deviceDNT=0&deviceModel=web&sid=yasirProd"
    },
    {
      title: "Redbull TV Sample",
      src: "//rbtv-qaengineering.s3.amazonaws.com/DATERANGE/Ripple/GoPro/540p_DATERANGE.m3u8"
    },
    {
      title: "Fight Example",
      src: "//silo.pluto.tv/production/201706/02/5930bf0c2c0546b387775896/hls_itsshowtime_s1e45_2400.m3u8"
    },
    {
      title: "Bloodsport Demo",
      src: "//siloh.pluto.tv/d71341_Pluto_TV_OandO/clip/59e3cf203b7b0b5441ebc21e_New_Fight_opening/720p/20171015_141203/hls/master.m3u8"
    },
    {
      title: "Fight Live",
      src: "//video.pluto.tv/bigsky1/ngrp:myStream_all/playlist.m3u8"
    }
  ],
  avatars: {
    default: '//scontent-lax3-1.cdninstagram.com/t51.2885-19/s320x320/15099550_658466730980493_5253362872708235264_a.jpg',
    path: '//cf-whatson.pluto.tv/avatars/',
    total: 25
  }
};

export default DATA;
