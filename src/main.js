define(['jquery', 'streamhub-sdk', 'streamhub-deck/views/YoutubeHeading'],
function($, Hub, YoutubeHeading) {
    var DeckView = function(opts) {
        opts = opts || {};
        this.el = opts.el;
        this._collections = opts.collections || [];
        this.streams = opts.streams || {};

        var self = this;
        if (!self.streams) {
            return;
        }

        // Setup container elements required for Deck view
        $(self.el).addClass(opts.className || 'hub-DeckView');
        var $deckColumns = $(document.createElement('div')).addClass('deck-columns');
        $(self.el).append($deckColumns);

        self.streams.forEach(function(stream, articleId) {
            // Create the containing element for a ListView
            var $deckCol = $(document.createElement('section')).addClass('deck-col');
            $deckColumns.append($deckCol);

            // Create a heading if the collection has one specified
            for (var i=0; i < self._collections.length; i++) {
                if (self._collections[i].articleId != articleId) {
                    continue;
                }
                var $deckColHeading = $(document.createElement('div')).addClass('deck-col-heading');

                var $title = $(document.createElement('h2')).addClass('deck-col-title');
                $title.html(self._collections[i].headingTitle);
                $deckColHeading.append($title);

                var $heading = $(document.createElement('div')).addClass('deck-col-body');
                var headingContent = self.createHeadingContent({
                    el: $heading,
                    articleId: articleId
                });
                $deckColHeading.append($heading);

                $deckCol.append($deckColHeading);
            }

            //TODO(ryanc): Reply box

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

    DeckView.prototype.createHeadingContent = function(opts) {
        var collection = opts.collection;
        var articleId = opts.articleId;
        var el = opts.el;
        var headingContent;
        var collection;

        for (var i=0; i < this._collections.length; i++) {
            if (this._collections[i].articleId == articleId) {
                collection = this._collections[i];
                break;
            }
        }

        if ('youtubeId' in collection) {
            headingContent = new YoutubeHeading({
                el: el,
                youtubeId: collection.youtubeId
            });
        }

        return headingContent;
    };

    return DeckView;
});
