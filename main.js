/**
 * DeckView, a module for presenting StreamHub collection(s) in a
 * TweetDeck-columned layout
 * @module DeckView
 *
 * @requires backbone
 * @requires mustache
 * @requires DeckFeedView
 * @requires DeckFeedColumnTemplate
 * @requires sources
 * @requires underscore
 */
define(function(require) {
var fyre = require('fyre'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    DeckFeedView = require('streamhub-deck/views/DeckFeedView'),
    DeckFeedColumnTemplate = require('text!streamhub-deck/templates/DeckFeedColumn.html'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');

/**
 * DeckView - A view with a TweetDeck-like layout of StreamHub content
 * @alias module:DeckView
 * @constructor
 * @extends Backbone.View
 * @param {Object.<string, *>} opts A set of options to configure an instance
 * @param {string} opts.template A mustache template string
 * @param {Array} opts.collections An aray of Collections to build the Deck View columns
 * @param {Object.<string, *>} opts.sources A set of sources specifying Content View templates to use for content provided from specific sources.
 * @param {boolean} opts.postForm Whether to show an input box for a user to post content to a collection
 * @param {FeedView} opts.feedView The type of Feed View to use for each column.
 * @param {Object.<string, *>} opts.feedViewOptions A set of options to configure an instance
 */
var DeckView = Backbone.View.extend({
    /**
     * Initializes the DeckView instance
     * @param {Object.<string, *>} opts - Options specifying template, collections, sources,
     *                        postForm feedView, feedViewOptions for the
     *                        DeckView instance
     */
    initialize: function(opts) {
        this.defaultAvatarUrl = opts.defaultAvatarUrl; // Placeholder Avatar, when there is a missing avatar
        this.$el.addClass(this.className);
        if (opts.template) {
            this.template = opts.template;
        }
        if (opts.collections) {
            this.collections = opts.collections;
        }
        this.sources = opts.sources || {};
        this._postForm = opts.postForm || false;
        this._feedView = opts.feedView || DeckFeedView;
        this._feedViewOptions = opts.feedViewOptions;
        // call render method externally
    },

    /**
     * @property {string} className The class name added to the element which will contain the Deck View 
     * @default hub-DeckView
     */
    className: 'hub-DeckView',

    /**
     * Render the Deck View onto the page in the Deck View's container element. Show the
     * initial content of the collection
     * @method
     */
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

            $deckCol.append('<div class="deck-col-feedview-holder"></div>')
            $deckColScroll = $(document.createElement('div'));
            $deckColScroll.addClass('deck-col-scroll');
            $deckCol.find('.deck-col-feedview-holder').append($deckColScroll);

            $feed = $(document.createElement('div'));
            $feed.addClass('feed');
            $deckColScroll.append($feed);

            var deckFeedView = new this._feedView(_.extend({
                collection: col,
                el: $feed,
                template: function (d) {
                    return Mustache.compile(DeckFeedColumnTemplate)(d);
                },
                postForm: this._postForm,
                sources: this.sources
            }, this._feedViewOptions));

            deckFeedView.render();
        }

        this.$el.fadeIn();
        this.$el.prev('.loading-indicator').hide();
    }
});

return DeckView;
});
