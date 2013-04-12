/**
 * DeckFeedView, a module 
 * @module DeckFeedView
 *
 * @requires backbone
 * @requires mustache
 * @requires FeedView
 * @requires DeckFeedColumnTemplate
 * @requires sources
 * @requires underscore
 */
define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    FeedView = require('streamhub-backbone/views/FeedView'),
    DeckFeedColumnHeadingTemplate = require('text!streamhub-deck/templates/DeckFeedColumnHeading.html'),
    // Content Templates
    TwitterContentTemplate = require('text!streamhub-deck/templates/TwitterContent.html'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');

/**
 * DeckFeedView - A view representing a single feed/column of StreamHub content. As used with DeckView.
 * @alias module:DeckFeedView
 * @constructor
 * @extends Backbone.View
 * @param {Object.<string, *>} opts A set of options to configure an instance
 * @param {string} opts.template A mustache template string
 * @param {Object.<string, *>} opts.sources A set of sources specifying Content View templates to use for content provided from specific sources.
 * @param {boolean} opts.postForm Whether to show an input box for a user to post content to a collection
 * @param {Array.<string>} opts.postFormPlaceholders A list of placeholder text to use for the postForm input box
 */
var DeckFeedView = Backbone.View.extend({
    /**
     * Initializes the DeckFeedView instance
     * @param {Object.<string, *>} opts - Options specifying template, collections, sources,
     *                        postForm feedView, feedViewOptions for the
     *                        DeckView instance
     */
    initialize: function(opts) {
        this.defaultAvatarUrl = opts.defaultAvatarUrl; // Placeholder Avatar, when there is a missing avatar
        this.$el.addClass(this.className);
        this.template = opts.template;
        this.sources = opts.sources || {};
        this._postForm = opts.postForm || false;
        this._postFormPlaceholders = opts.postFormPlaceholders
        // call render method externally
    },

    /**
     * @property {string} className The class name added to the element which will contain the DeckFeedView 
     * @default hub-DeckFeedView
     */
    className: 'hub-DeckFeedView',

    /**
     * Render the DeckFeedView onto the page in the Deck View's container element. Show the
     * initial content of the collection
     * @method
     */
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

    /**
     * Get an element that will be the heading of a Deck Feed column.
     * initial content of the collection
     * @method
     * @return {HTMLElement} The element representing the heading of a Deck Feed column.
     */
    setupHeading: function() {
        // Setup heading
        var $heading = $(Mustache.compile(DeckFeedColumnHeadingTemplate)({
            headingTitle: this.collection.headingTitle,
            headingBody: this.collection.headingBody
        }));
        return $heading;
    }
});

return DeckFeedView;
});
