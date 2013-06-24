define(['streamhub-sdk/jquery'],
function($) {
    /**
     * A UI component of Deck, that displays a heading for a given column.
     * Optionally if a Youtube video id is specified in the options, will embed
     * the video in the header.
     * @param opts {Object} A set of options to config the heading with
     * @param opts.el {HTMLElement} The element in which to render the heading
     * @param opts.youtubeId {string} Optional Youtube video id to embed a video in heading
     * @constructor
     */
    var YoutubeHeading = function(opts) {
        this.el = opts.el;
        this._youtubeId = opts.youtubeId || '';
        if (!this._youtubeId) {
            return;
        }

        $thumb = $(document.createElement('img')).attr('src', 'http://img.youtube.com/vi/' + this._youtubeId + '/hqdefault.jpg');
        $play_button = $(document.createElement('div')).addClass('deck-yt-play');
        $(this.el).append($thumb).append($play_button);

        var self = this;
        $play_button.click(function(e) {
            e.preventDefault();
            self.embedVideo();
        });
    };

    /**
     * Embed the a youtube video player in the heading if youtube id specified.
     */
    YoutubeHeading.prototype.embedVideo = function() {
        var youtubeId = this._youtubeId;
        var $headingBody = this.el;
        $headingBody.empty();

        var tag = document.createElement('script');
        tag.src = '//www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var self = this;

        newPlayer($headingBody[0], {
            videoId: youtubeId, 
            width: 300,
            height: 169,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        }); 

        function newPlayer(el, opts) {
            if (typeof YT == 'undefined') {
                window._yt_players = [];
                window.onYouTubeIframeAPIReady = function(){
                    window._yt_players.push(getNewPlayer(el, opts));
                }
            } else {
                window._yt_players.push(getNewPlayer(el, opts));
            }

            function getNewPlayer(el, opts) {
                return new YT.Player(el, {
                    width: opts.width,
                    height: opts.height,
                    videoId: opts.videoId,
                    events: opts.events
                });
            }
        }

        function onPlayerReady(event) {
            event.target.playVideo();
        }

        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING) {
                // trigger pause on other players
                for (var i=0; i < window._yt_players.length; i++) {
                    var player = window._yt_players[i];
                    if (event.target.id == player.id) {
                        continue;
                    }
                    player.pauseVideo();
                }
            }
        }
    }

    return YoutubeHeading;
});
