/**
 * YoutubeDeckFeedView, a module 
 * @module YoutubeDeckFeedView
 *
 * @requires backbone
 * @requires mustache
 * @requires DeckFeedView
 * @requires YoutubeDeckFeedColumnTemplate
 * @requires sources
 * @requires underscore
 */
define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    DeckFeedView = require('streamhub-deck/views/DeckFeedView'),
    Content = require('streamhub-backbone/models/Content'),
    YoutubeDeckFeedColumnHeadingTemplate = require('text!streamhub-deck/templates/YoutubeDeckFeedColumnHeading.html'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');

/**
 * YoutubeDeckFeedView - A view representing a single feed/column of StreamHub content. As used with DeckView.
 * @alias module:YoutubeDeckFeedView
 * @constructor
 * @extends module:DeckFeedView
 * @param {Object.<string, *>} opts A set of options to configure an instance
 * @param {string} opts.template A mustache template string
 * @param {Object.<string, *>} opts.sources A set of sources specifying Content View templates to use for content provided from specific sources.
 * @param {boolean} opts.postForm Whether to show an input box for a user to post content to a collection
 * @param {Array.<string>} opts.postFormPlaceholders A list of placeholder text to use for the postForm input box
 */
var YoutubeDeckFeedView = DeckFeedView.extend({
    /**
     * Get an element that will be the heading of a Deck Feed column.
     * initial content of the collection
     * @method
     * @return {HTMLElement} The element representing the heading of a Deck Feed column.
     */
    setupHeading: function() {
        var placeholders = this._postFormPlaceholders || [''],
            placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

        // Setup heading
        var $heading = $(Mustache.compile(YoutubeDeckFeedColumnHeadingTemplate)({
            headingTitle: this.collection.headingTitle,
            youtubeId: this.collection.youtubeId,
            postForm: this._postForm,
            postFormPlaceholder: placeholder
        }));

        this.$heading = $heading;

        var self = this;
        $('.deck-yt-play', $heading).click(function(e) {
            e.preventDefault();
            self.embedVideo();
        });

        $heading.on('submit', 'form', _.bind(this.onSubmitPost, this));

        return $heading;
    },

    /**
     * A helper method to replace the youtube photo/play button images with an
     * actual embedded Youtube player when the play button is clicked
     * @method
     */
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


/**
 * Callback for when a post form is submitted by the user in an attemp to post
 * content to the Deck Feed.
 * @method
 */
YoutubeDeckFeedView.prototype.onSubmitPost = function onSubmitPost (e) {
    e.preventDefault();

    var self = this;

    var $form = $(e.target),
        formDataArray = $form.serializeArray(),
        formData = mergeFormArray(formDataArray);

    this.collection.post($.extend(formData, {
        success: _.bind(function (data) {
            // Clear form
            this.$heading.find('input[type=text]').val('');

            var user = self.collection.user && self.collection.user.toJSON();
            if (user) {
                data.author = user;
            }
            var c = new Content(data);
            self.collection.add(c);
            console.log("YT post success", arguments);
        }, this),
        error: function () {
            console.log("YT post error", arguments);
        }
    }));

    function mergeFormArray (formDataArray) {
        var out = {};
        _(formDataArray).each(function(obj) {
            out[obj.name] = obj.value;
        });
        return out;
    }
};

return YoutubeDeckFeedView;
});
