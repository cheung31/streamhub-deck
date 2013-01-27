define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    FeedView = require('streamhub-backbone/views/FeedView'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');
    $ui = require('jqueryui');

var DeckFeedView = Backbone.View.extend({
    initialize: function(opts) {
        this.defaultAvatarUrl = opts.defaultAvatarUrl; // Placeholder Avatar, when there is a missing avatar
        this.$el.addClass(this.className);
        if (opts.template) {
            this.template = opts.template;
        }
        if (opts.collections) {
            this.collections = opts.collections;
        }
        if (opts.heading) {
            this.heading = opts.heading;
        }
        // call render method externally
    },
    className: 'hub-DeckFeedView',
    render: function() {
        // Setup container elements required for Deck view
        if (this.heading) {
            var $heading = $(document.createElement('section'));
            $heading.addClass('deck-col-heading');
            this.$el.append($heading);
        }
        $feed = $(document.createElement('div'));
        this.$el.append($feed);

        var feedView = new FeedView({
            collection: this.collection,
            el: $feed
        });

        // Transition from placeholder to the feed content
        this.$el.fadeIn();
        this.$el.prev('.loading-indicator').hide();
    }
});

return DeckFeedView;
});
