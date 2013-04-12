define(['jquery', 'streamhub-sdk'],
function($, Hub) {
    var DeckView = function(opts) {
        opts = opts || {};
        this.el = opts.el;
        this._streams = opts.streams || {};

        if (!this._streams) {
            return;
        }

        $(this.el).addClass('hub-DeckView');
        // Setup container elements required for Deck view
        var $deckColumns = $(document.createElement('div'));
        $deckColumns.addClass('deck-columns').addClass('feeds');
        $(this.el).append($deckColumns);

        this._streams.forEach(function(stream) {
            // Create the containing element for FeedView
            var $deckCol = $(document.createElement('section'));
            $deckCol.addClass('deck-col');
            $deckColumns.append($deckCol);

            $deckCol.append('<div class="deck-col-feedview-holder"></div>')
            var $deckColScroll = $(document.createElement('div'));
            $deckColScroll.addClass('deck-col-scroll');
            $deckCol.find('.deck-col-feedview-holder').append($deckColScroll);

            var $feed = $(document.createElement('div'));
            $feed.addClass('feed');
            $deckColScroll.append($feed);

            var columnEl = $feed[0];
            new Hub.Views.ListView({
                streams: stream.start(),
                el: columnEl
            });
        });
    };

    return DeckView;
});
