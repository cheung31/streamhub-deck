define(['jquery', 'streamhub-sdk'],
function($, Hub) {
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
                $deckCol.append($deckColHeading);

                $headingContent = self.createHeadingContent(self._collections[i]);
                if ($headingContent) {
                    $deckCol.append($headingContent);
                }
            }

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

    DeckView.prototype.createHeadingContent = function(collection) {
        var $headingContent;
        if ('youtubeId' in collection) {
            //require('YoutubeColumnHeading');
            //var heading = YoutubeColumnHeading();

            // Create youtube player as heading content
            //$headingContent = $(document.createDocumentFragment());
            //var $youtubeThumb = $(document.createElement('img'));
            //$youtubeThumb.attr('src', 'http://img.youtube.com/vi/' + collection['youtubeId'] + '/hqdefault.jpg');
            //$youtubePlayer = $(document.createElement('div')).addClass('deck-yt-play');
            //$headingContent.append($youtubeThumb);
            //$headingContent.append($youtubePlayer);
        }
        return $headingContent
    };

    return DeckView;
});
