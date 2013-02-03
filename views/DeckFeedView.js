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
        this.sources = opts.sources || {};
        this._postForm = opts.postForm || false;
        this._postFormPlaceholders = opts.postFormPlaceholders
        // call render method externally
    },
    className: 'hub-DeckFeedView',
    render: function() {
        $heading = this.setupHeading();
        var $deckScroll = this.$el.parents('.deck-col');
        $deckScroll.prepend($heading);
        
        // Setup container elements required for Deck view
        if (this.template) {
            this.$el.html(this.template());
        }
        $feed = $('.deck-col-feed', this.$el);
        this.$el.append($feed);

        var feedView = new FeedView({
            collection: this.collection,
            el: $feed,
            sources: this.sources
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
