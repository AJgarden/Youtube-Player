/*!
 * youtubePlayer.js v0.1901
 * @copyright 2019 AJgarden
 * ##### Author: Jia #####
 * ##### Update: 2019/01/21 #####
 */

var selectors = new Array(),
    selectorsId = new Array(),
    players = new Array(),
    init = 0;

$.fn.youtubePlayer = function(options, methodObject) {

  var $selector = $(this);

  // Check if youtube iframe api is included
  var body = $('body');
  if (!body.attr('data-youtube-script-loaded')) {
    var iframeApi = document.createElement('script');
    iframeApi.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(iframeApi, firstScriptTag);
    body.attr('data-youtube-script-loaded', 'true');
  }

  if (typeof options === "object" || typeof options === "undefined") {

    var defaults = {
      // {Video playlist}
      // Initialize video: video's id of youtube
      videoId: null,
      // Playlist type & list detail:
      // 'search' - 'keywords'
      // 'user_uploads' - 'user channel id'
      // 'playlist' - 'playlist id'
      listType: null,
      list: null,
      // Next video(s): videos' id of youtube (string), ex: 'AAA,BBB,CCC,...'
      // This parameter will ignore by using 'listType' & 'list'
      playlist: null,

      // {Video Settings}
      // Autoplay: boolean
      autoplay: 0,
      // Allow fullscreen: boolean
      allowFullscreen: 1,
      // Control bar: boolean
      controls: 1,
      // Player color: string (only 'red' or 'white')
      color: 'red',
      // Disable keyboad control: boolean
      disableKeyboard: 0,
      // Loop play: boolean
      loop: 0,
      // Player Language: string (ISO 639-1 two-letter language code)
      language: 'zh-tw',
      // Hide youtube logo: boolean
      modestbranding: 0,
      // Show related videos: boolean
      showRelated: 1,
      // Iframe width: positive integer
      width: 640,
      // Iframe ratio: width/height ratio
      ratio: 16/9,

      // {Other Settings}
      // Inline player on iOS: boolean
      playsinline: 0,
      // Start video by seconds: positive integer
      // Only available on first video
      startSeconds: 0,
      // End video by seconds: positive integer
      // Only available on first video
      endSeconds: 0,
      // Website domain
      origin: window.location.origin,
    };

    var defaultEvents = {
      // callback when iframe embed is ready
      onReady: function(element) {
        return false;
      },
      // callback when player plays
      onPlay: function(element) {
        return false;
      },
      // callback when player pauses
      onPause: function(element) {
        return false;
      },
      // callback when player buffers
      onBuffering: function(element) {
        return false;
      },
      // callback when player ends
      onEnd: function(element) {
        return false;
      },
      // callback when player cues new video / playlist
      onCued: function(element) {
        return false;
      },
      // callback when player's state changed
      onStateChange: function(element, data) {
        // youtube state code (number):
        // -1 : unstarted
        // 0 : ended
        // 1 : playing
        // 2 : paused
        // 3 : buffering
        // 5 : video cued
        return false;
      },
      // callback when player's quality changed
      onQualityChange: function(element, data) {
        // youtube quality code (string):
        // 'small' : 240p
        // 'medium' : 360p
        // 'large' : 480p
        // 'hd720' : 720p
        // 'hd1080' : 1080p
        // 'highres' : >1080p
        return false;
      },
      // callback when player's rate changed
      onRateChange: function(element, data) {
        // youtube playrate code (number)
        return false;
      },
      // callback when iframe loaded error
      onError: function(element, data) {
        // youtube error code (number):
        // 2 : video's id is wrong
        // 5 : HTML5 player is wrong
        // 100 : video is removed or private
        // 101 : video is not allowed be embeded
        // 150 : same as code 101
        return false;
      },
      // callback when player occurs error with video not found
      onVideoNotFound: function(element) {
        return false;
      },
      // callback when player occurs error with video removed or private
      onVideoPrivate: function(element) {
        return false;
      },
      // callback when player occurs error with video not allowed to be embed
      onVideoNotEmbed: function(element) {
        return false;
      }
    };

    var settings = $.extend({}, defaults, options);

    var settingsEvents = defaultEvents;
    if (options.events != null)
      settingsEvents = $.extend({}, defaultEvents, options.events);

    var playerVars = {
      'autoplay': (settings.autoplay ? 1 : 0),
      'cc_lang_pref': settings.language,
      'color': settings.color,
      'controls': (settings.controls ? 1 : 0),
      'disablekb': (settings.disableKeyboard ? 1 : 0),
      'end': settings.endSeconds,
      'fs': (settings.allowFullscreen ? 1 : 0),
      'hl': settings.language,
      'listType': settings.listType,
      'list': settings.list,
      'loop': (settings.loop ? 1 : 0),
      'modestbranding': (settings.modestbranding ? 1 : 0),
      'origin': settings.origin,
      'playlist': settings.playlist,
      'playsinline': (settings.playsinline ? 1 : 0),
      'rel': (settings.showRelated ? 1 : 0),
      'start': settings.startSeconds
    };

    // Create players array & initialize element's style
    $selector.each(function(i,element) {
      var elem = $(element);

      // Name element's id
      var selectorId = 'youtube-player-'+i;
      var selectorVideo, selectorListtype, selectorList;

      // Get element's initial video / playlist
      // check if 'video' is setup
      if (elem.attr('data-video') != null && elem.attr('data-video') != "" && elem.attr('data-video') != "undefined")
        selectorVideo = elem.attr('data-video');
      // check if 'listtype' is setup
      if (elem.attr('data-listtype') != null && elem.attr('data-listtype') != "" && elem.attr('data-listtype') != "undefined")
        selectorListtype = elem.attr('data-listtype');
      // get list data
      if (elem.attr('data-list') != null && elem.attr('data-list') != "" && elem.attr('data-list') != "undefined")
        selectorList = elem.attr('data-list');

      // Create iframe and parent tag
      elem.append('<div id="'+selectorId+'"></div>');

      selectors.push({
        id: selectorId,
        video: selectorVideo,
        listtype: selectorListtype,
        list: selectorList
      });

      selectorsId.push(selectorId);
    });

    window.onYouTubePlayerAPIReady = function() {
      if (typeof selectors === "undefined") return;

      for (var i=0; i<selectors.length; i++) {
        createPlayer(i);
      }
    }

    function createPlayer(i) {
      if (selectors[i].listtype != null)
        playerVars.listType = selectors[i].listtype;
      if (typeof selectors[i].list != null)
        playerVars.list = selectors[i].list;
      players[i] = new YT.Player(selectors[i].id, {
        videoId: (typeof selectors[i].video !== "undefined") ? selectors[i].video : settings.videoId,
        width: settings.width,
        height: settings.width / settings.ratio,
        playerVars: playerVars,
        events: {
          'onReady': function(event) {
            $(event.target.a).attr('data-ratio', settings.ratio);
            init++;
            settingsEvents.onReady.call(this, $(event.target.a));
          },
          'onStateChange': function(event) {
            settingsEvents.onStateChange.call(this, $(event.target.a), event.data);
            // youtube state code (number):
            // -1 : unstarted
            // 0 : ended
            // 1 : playing
            // 2 : paused
            // 3 : buffering
            // 5 : video cued
            var stateChangeCode = event.data;
            if (stateChangeCode == 0)
              settingsEvents.onEnd.call(this, $(event.target.a));
            if (stateChangeCode == 1)
              settingsEvents.onPlay.call(this, $(event.target.a));
            if (stateChangeCode == 2)
              settingsEvents.onPause.call(this, $(event.target.a));
            if (stateChangeCode == 3)
              settingsEvents.onBuffering.call(this, $(event.target.a));
            if (stateChangeCode == 5)
              settingsEvents.onCued.call(this, $(event.target.a));
          },
          'onPlaybackQualityChange': function(event) {
            settingsEvents.onQualityChange.call(this, $(event.target.a), event.data);
          },
          'onPlaybackRateChange': function(event) {
            settingsEvents.onRateChange.call(this, $(event.target.a), event.data);
          },
          'onError': function(event) {
            settingsEvents.onError.call(this, $(event.target.a), event.data);
            // youtube error code (number):
            // 2 : video's id is wrong
            // 5 : HTML5 player is wrong
            // 100 : video is removed or private
            // 101 : video is not allowed be embeded
            // 150 : same as code 101
            var errorCode = event.data;
            if (errorCode == 2)
              settingsEvents.onVideoNotFound.call(this, $(event.target.a));
            if (errorCode == 100)
              settingsEvents.onVideoPrivate.call(this, $(event.target.a));
            if (errorCode == 101 || errorCode == 150)
              settingsEvents.onVideoNotEmbed.call(this, $(event.target.a));
          }
        }
      });
    }

  } else if (options == "data") {

    var ret = new Array();

    $selector.each(function(i,element) {
      ret.push(new Array());

      var elementId = $(element).find('iframe').attr('id');
      if (selectorsId.indexOf(elementId) > -1) {
        var index = selectorsId.indexOf(elementId);

        ret[i].videoUrl = players[index].getVideoUrl();
        ret[i].embedCode = players[index].getVideoEmbedCode();
        ret[i].iframeDOM = players[index].getIframe();
        ret[i].playlist = players[index].getPlaylist();
        ret[i].playlistIndex = players[index].getPlaylistIndex();
        ret[i].status = players[index].getPlayerState();
        ret[i].currentTime = players[index].getCurrentTime();
        ret[i].totalTime = players[index].getDuration();
        ret[i].isMuted = players[index].isMuted();
        ret[i].volume = players[index].getVolume();
        ret[i].currentRate = players[index].getPlaybackRate();
        ret[i].availableRate = players[index].getAvailablePlaybackRates();
        ret[i].loadedPercentage = players[index].getVideoLoadedFraction();
        ret[i].currentQuality = players[index].getPlaybackQuality();
        ret[i].availableQuality = players[index].getAvailableQualityLevels();
      }
    });
    return ret;

  } else if (options == "destroy") {

    var initInt = setInterval(checkInit, 100);

    function checkInit() {
      if (init == players.length) {
        doDestroy(methodObject);
        clearInterval(initInt);
      }
    }

    function doDestroy(callback) {

      $selector.each(function(i,element) {
        var element = $(element).find('iframe');
        var elementId = element.attr('id');
        if (selectorsId.indexOf(elementId) > -1) {
          var index = selectorsId.indexOf(elementId);
          players[index].destroy();
          if (typeof callback === "function")
            callback.call(this, element);
        }
      });

    }

  } else if (typeof options === "string") {

    var initInt = setInterval(checkInit, 100);

    function checkInit() {
      if (init == players.length) {
        doMethod(options, methodObject);
        clearInterval(initInt);
      }
    }

    function doMethod(method, object) {

      $selector.each(function(i,element) {
        var elementId = $(element).find('iframe').attr('id');
        if (selectorsId.indexOf(elementId) > -1) {
          var index = selectorsId.indexOf(elementId);
          // console.log(players[index]);

          // methods

          // play video(s)
          if (method == "play") {
            // console.log('play');
            players[index].playVideo();

          // pause video(s)
          } else if (method == "pause") {
            // console.log('pause');
            players[index].pauseVideo();

          // stop video(s)
          } else if (method == "stop") {
            // console.log('stop');
            players[index].stopVideo();

          // seek video(s) to direct second
          } else if (method == "seek") {
            if (typeof object === "number") {
              // console.log('seek to '+object);
              players[index].seekTo(object);
            }

          // previous video (only available when playlist is setup)
          } else if (method == "previous") {
            // console.log('previous');
            players[index].previousVideo(object);

          // next video (only available when playlist is setup)
          } else if (method == "next") {
            // console.log('next');
            players[index].nextVideo(object);

          // play direct video by index (only available when playlist is setup)
          } else if (method == "playAt") {
            if (typeof object === "number") {
              // console.log('play video at index '+object);
              players[index].playVideoAt(object);
            }

          // set loop (only available when playlist is setup)
          } else if (method == "loop") {
            if (typeof object === "boolean") {
              // console.log('set loop to '+object);
              players[index].setLoop(object);
            }

          // shuffle playlist order (only available when playlist is setup)
          } else if (method == "shuffle") {
            // console.log('shuffle playlist order');
            players[index].setShuffle(object);

          // mute video(s)
          } else if (method == "mute") {
            // console.log('mute');
            players[index].mute();

          // unmute video(s)
          } else if (method == "unmute") {
            // console.log('unmute');
            players[index].unMute();

          // set video(s) volume
          } else if (method == "volume") {
            if (typeof object === "number") {
              // console.log('set volume to '+object);
              players[index].setVolume(object);
            }

          // set video(s) width
          } else if (method == "width") {
            if (typeof object === "number") {
              // console.log('set width to '+object);
              var ratio = $(players[index].a).attr('data-ratio');
              var objectH = object / ratio;
              players[index].setSize(object, objectH);
            }

          // set video(s) height
          } else if (method == "height") {
            if (typeof object === "number") {
              // console.log('set height to '+object);
              var ratio = $(players[index].a).attr('data-ratio');
              var objectW = object * ratio;
              players[index].setSize(objectW, object);
            }

          // set video(s) size
          } else if (method == "size") {
            if (typeof object === "object") {
              // console.log('set width to '+object.width+' & height to '+object.height);
              players[index].setSize(object.width, object.height);
            }

          // set video(s) rate
          } else if (method == "rate") {
            if (typeof object === "number") {
              // console.log('set rate to '+object);
              players[index].setPlaybackRate(object);
            }

          // cue another video
          } else if (method == "cueVideo") {
            if (typeof object === "string") {
              // console.log('cue but not play video '+object);
              players[index].cueVideoById(object);
            } else if (typeof object === "object") {
              if (object.videoId != null && object.videoId != "" && object.videoId != "undefined") {
                var objectDefault = {
                  videoId: null,
                  start: 0,
                  end: null
                };
                var objectSetting = $.extend({}, objectDefault, object);
                // console.log('cue but not play video by below settings: ');
                // console.log(objectSetting);
                players[index].cueVideoById({
                  'videoId': objectSetting.videoId,
                  'startSeconds': objectSetting.start,
                  'endSeconds': objectSetting.end
                });
              }
            }

          // load another video
          } else if (method == "loadVideo") {
            if (typeof object === "string") {
              // console.log('load and play video '+object);
              players[index].loadVideoById(object);
            } else if (typeof object === "object") {
              if (object.videoId != null && object.videoId != "" && object.videoId != "undefined") {
                var objectDefault = {
                  videoId: null,
                  start: 0,
                  end: null
                };
                var objectSetting = $.extend({}, objectDefault, object);
                // console.log('load and play video by below settings: ');
                // console.log(objectSetting);
                players[index].loadVideoById({
                  'videoId': objectSetting.videoId,
                  'startSeconds': objectSetting.start,
                  'endSeconds': objectSetting.end
                });
              }
            }

          // cue another video by URL
          } else if (method == "cueUrl") {
            if (typeof object === "string") {
              // console.log('cue but not play video '+object);
              players[index].cueVideoByUrl(object);
            } else if (typeof object === "object") {
              if (object.videoUrl != null && object.videoUrl != "" && object.videoUrl != "undefined") {
                var objectDefault = {
                  videoUrl: null,
                  start: 0,
                  end: null
                };
                var objectSetting = $.extend({}, objectDefault, object);
                // console.log('cue but not play video by below settings: ');
                // console.log(objectSetting);
                players[index].cueVideoByUrl({
                  'mediaContentUrl': objectSetting.videoUrl,
                  'startSeconds': objectSetting.start,
                  'endSeconds': objectSetting.end
                });
              }
            }

          // load another video by URL
          } else if (method == "loadUrl") {
            if (typeof object === "string") {
              // console.log('load and play video '+object);
              players[index].loadVideoByUrl(object);
            } else if (typeof object === "object") {
              if (object.videoUrl != null && object.videoUrl != "" && object.videoUrl != "undefined") {
                var objectDefault = {
                  videoUrl: null,
                  start: 0,
                  end: null
                };
                var objectSetting = $.extend({}, objectDefault, object);
                // console.log('load and play video by below settings: ');
                // console.log(objectSetting);
                players[index].loadVideoByUrl({
                  'mediaContentUrl': objectSetting.videoUrl,
                  'startSeconds': objectSetting.start,
                  'endSeconds': objectSetting.end
                });
              }
            }

          // cue another playlist
          } else if (method == "cueList") {
            if (typeof object === "object") {
              if (object.list != null && object.list != "" && object.list != "undefined") {
                var objectDefault = {
                  listType: 'playlist',
                  list: null,
                  index: 0,
                  start: 0
                };
                var objectSetting = $.extend({}, objectDefault, object);
                // console.log('cue but not play list by below settings: ');
                // console.log(objectSetting);
                players[index].cuePlaylist({
                  'listType': objectSetting.listType,
                  'list': objectSetting.list,
                  'index': objectSetting.index,
                  'startSeconds': objectSetting.start
                });
              }
            }

          // play another playlist
          } else if (method == "loadList") {
            if (typeof object === "object") {
              if (object.list != null && object.list != "" && object.list != "undefined") {
                var objectDefault = {
                  listType: 'playlist',
                  list: null,
                  index: 0,
                  start: 0
                };
                var objectSetting = $.extend({}, objectDefault, object);
                // console.log('cue but not play list by below settings: ');
                // console.log(objectSetting);
                players[index].loadPlaylist({
                  'listType': objectSetting.listType,
                  'list': objectSetting.list,
                  'index': objectSetting.index,
                  'startSeconds': objectSetting.start
                });
              }
            }
          }
        }
      });

    }
  }

};
