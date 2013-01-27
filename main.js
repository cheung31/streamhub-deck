define(function(require) {
var Backbone = require('backbone'),
    Mustache = require('mustache'),
    FeedView = require('streamhub-backbone/views/FeedView'),
    sources = require('streamhub-backbone/const/sources'),
    _ = require('underscore');
    $ui = require('jqueryui');

var DeckView = Backbone.View.extend({
    initialize: function(opts) {
        this.defaultAvatarUrl = opts.defaultAvatarUrl; // Placeholder Avatar, when there is a missing avatar
        this.$el.addClass(this.className);
        if (opts.template) {
            this.template = opts.template;
        }
        this.render();
        //this.listenTo(this.model, "change", this.render);
    },
    className: 'hub-DeckView',
    render: function() {
        // Setup container elements required for Deck view
        var $deckColumns = $(document.createElement('div'));
        $deckColumns.addClass('deck-columns').addClass('feeds');
        this.$el.append($deckColumns);

        //<div class="feeds deck-columns" style="width: 10000px">
        //    <section class="brand deck-col" id="brand-0">
        //        <div class="feed-heading green-gradient">
        //            <h2>Samsung</h2>
        //        </div>
        //        <div class="deck-col-scroll">
        //            <div class="feed" id="brand-0-env">
        //                <div class="loading-placeholder" style="height: 300px; margin-bottom: 10px; background-color: #5475a6;"></div>
        //                <div class="loading-placeholder" style="height: 200px; margin-bottom: 10px; background-color: #5475a6;"></div>
        //                <div class="loading-placeholder" style="height: 200px; margin-bottom: 10px; background-color: #5475a6;"></div>
        //                <div class="loading-placeholder" style="height: 300px; margin-bottom: 10px; background-color: #5475a6;"></div>
        //                <div class="loading-placeholder" style="height: 200px; margin-bottom: 10px; background-color: #5475a6;"></div>
        //                <div class="loading-placeholder" style="height: 200px; margin-bottom: 10px; background-color: #5475a6;"></div>
        //            </div>
        //        </div>
        //    </section>
        //</div>
        var feedViews = [];
        this.collections = [this.collection, this.collection, this.collection];
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

            var feedView = new FeedView({
                collection: col,
                el: $feed
            });
            feedViews.push(feedView);
        }

        this.$el.fadeIn();
        this.$el.prev('.loading-indicator').hide();
    }
});

return DeckView;
});
