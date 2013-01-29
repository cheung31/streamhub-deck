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
            console.warn('click play');
            self.embedVideo();
        });
        return $heading;
    },
    embedVideo: function() {
        var youtubeId = this.collection.youtubeId;
        console.warn(youtubeId);
        var iframe = document.createElement('iframe');
        $(iframe).attr('width', 300);
        $(iframe).attr('height', 169);
        $(iframe).attr('frameborder', 0);
        $(iframe).attr('allowfullscreen', '');
        $(iframe).attr('src', 'http://www.youtube.com/embed/'+youtubeId+'/?autoplay=1&enablejsapi=1');
        $('.deck-col-body', this.$heading).empty().append(iframe);
    }
});

return YoutubeDeckFeedView;
});
