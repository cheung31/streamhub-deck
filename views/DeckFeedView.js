define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    FeedView = require('streamhub-backbone/views/FeedView'),
    DeckFeedColumnHeadingTemplate = require('text!streamhub-deck/templates/DeckFeedColumnHeading.html'),
    // Content Templates
    TwitterContentTemplate = require('text!streamhub-deck/templates/TwitterContent.html'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');

var DeckFeedView = Backbone.View.extend({
    initialize: function(opts) {
        this.defaultAvatarUrl = opts.defaultAvatarUrl; // Placeholder Avatar, when there is a missing avatar
        this.$el.addClass(this.className);
        this.template = opts.template;
        // call render method externally
    },
    className: 'hub-DeckFeedView',
    render: function() {
        $heading = this.setupHeading();

        var $deckScroll = this.$el.parents('.deck-col-scroll');
        $deckScroll.before($heading);
        $deckScroll.css('top', parseInt($deckScroll.css('top')) + $heading.height());
        
        // Setup container elements required for Deck view
        if (this.template) {
            this.$el.html(this.template());
        }
        $feed = $('.deck-col-feed', this.$el);
        this.$el.append($feed);

        // Supported sources and their templates
        var sources = {
            twitter: {
                template: function (d) {
                    // Attempt to set the tweet_id for the template
                    var content_id = d.id;
                    if (content_id) {
                        d.tweet_id = content_id.split('@twitter.com')[0].substring('tweet-'.length);
                    }
                    // Attempt to get photo attachment
                    if (d.attachments && d.attachments[0].thumbnail_url) {
                        d.image_url = thumbnail_url;
                    }
                    return Mustache.compile(TwitterContentTemplate)(d);
                }
            }
        };

        var feedView = new FeedView({
            collection: this.collection,
            el: $feed,
            sources: sources
        });

        // Transition from placeholder to the feed content
        this.$el.fadeIn();
        this.$el.prev('.loading-indicator').hide();
    },
    setupHeading: function() {
        // Setup heading
        var $heading = $(Mustache.compile(DeckFeedColumnHeadingTemplate)({
            heading_title: this.collection.headingTitle,
            heading_body: this.collection.headingBody
        }));
        return $heading;
    }
});

return DeckFeedView;
});
