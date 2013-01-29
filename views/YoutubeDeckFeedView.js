define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    DeckFeedView = require('streamhub-deck/views/DeckFeedView'),
    YoutubeDeckFeedColumnHeadingTemplate = require('text!streamhub-deck/templates/YoutubeDeckFeedColumnHeading.html'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');

var YoutubeDeckFeedView = DeckFeedView.extend({
    setupHeading: function() {
        // Setup heading
        var $heading = $(Mustache.compile(YoutubeDeckFeedColumnHeadingTemplate)({
            headingTitle: this.collection.headingTitle,
            youtubeId: this.collection.youtubeId
        }));
        this.$heading = $heading;

        var self = this;
        $('.deck-yt-play', $heading).click(function(e) {
            e.preventDefault();
            self.embedVideo();
        });
        return $heading;
    },
    embedVideo: function() {
        var youtubeId = this.collection.youtubeId;
        var $headingBody = $('.deck-col-body', this.$heading);
        $headingBody.empty();

        var tag = document.createElement('script');
        tag.src = '//www.youtube.com/iframe_api';
        //$headingBody.before(tag);
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
});

return YoutubeDeckFeedView;
});
