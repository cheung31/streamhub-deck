define(['jquery', 'streamhub-sdk'],
function($, Hub) {
    var DeckView = function(opts) {
        opts = opts || {};
        this.el = opts.el;
        this._collections = opts.collections || [];
        this._streams = opts.streams || {};

        if (!this._streams) {
            return;
        }

        // Setup container elements required for Deck view
        $(this.el).addClass(opts.className || 'hub-DeckView');
        var $deckColumns = $(document.createElement('div')).addClass('deck-columns');
        $(this.el).append($deckColumns);

        this._streams.forEach(function(stream) {
            // Create the containing element for a ListView
            var $deckCol = $(document.createElement('section')).addClass('deck-col');
            $deckColumns.append($deckCol);

            // Create a deck column for a particular stream
            var $listViewContainer = $(document.createElement('div')).addClass('deck-col-container');
            var $deckColScroll = $(document.createElement('div')).addClass('deck-col-scroll');
            var $feed = $(document.createElement('div')).addClass('deck-feed');
            $deckColScroll.append($feed);
            $listViewContainer.append($deckColScroll);
            $deckCol.append($listViewContainer);

            var columnEl = $feed[0];
            new Hub.Views.ListView({
                streams: stream.start(),
                el: columnEl
            });
        });
    };

    return DeckView;
});
