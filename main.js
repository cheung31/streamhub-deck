define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    DeckFeedView = require('streamhub-deck/views/DeckFeedView'),
    DeckFeedColumnTemplate = require('text!streamhub-deck/templates/DeckFeedColumn.html'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');

var DeckView = Backbone.View.extend({
    initialize: function(opts) {
        this.defaultAvatarUrl = opts.defaultAvatarUrl; // Placeholder Avatar, when there is a missing avatar
        this.$el.addClass(this.className);
        if (opts.template) {
            this.template = opts.template;
        }
        if (opts.collections) {
            this.collections = opts.collections;
        }
        this._feedView = opts.feedView || DeckFeedView;
        // call render method externally
    },
    className: 'hub-DeckView',
    render: function() {
        // Setup container elements required for Deck view
        var $deckColumns = $(document.createElement('div'));
        $deckColumns.addClass('deck-columns').addClass('feeds');
        this.$el.append($deckColumns);

        for (var i = 0; i < this.collections.length; i++) {
            var col = this.collections[i];

            // Create the containing element for FeedView
            $deckCol = $(document.createElement('section'));
            $deckCol.addClass('deck-col');
            $deckColumns.append($deckCol);

            $deckColScroll = $(document.createElement('div'));
            $deckColScroll.addClass('deck-col-scroll');
            $deckCol.append($deckColScroll);

            $feed = $(document.createElement('div'));
            $feed.addClass('feed');
            $deckColScroll.append($feed);

            var deckFeedView = new this._feedView({
                collection: col,
                el: $feed,
                template: function (d) {
                    return Mustache.compile(DeckFeedColumnTemplate)(d);
                }
            });
            deckFeedView.render();
        }

        this.$el.fadeIn();
        this.$el.prev('.loading-indicator').hide();
    }
});

return DeckView;
});
