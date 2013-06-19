define(['streamhub-zepto', 'streamhub-sdk', 'streamhub-deck/views/YoutubeHeading', 'text!streamhub-deck/main.css'],
function($, Hub, YoutubeHeading, css) {
    var DeckView = function(opts) {
        opts = opts || {};
        this.el = opts.el;
        this._collections = opts.collections || [];
        this._streams = [];

        this.includeCss = opts.includeCss == false ? false : true;

        if (!this._collections) {
            return;
        }

        // Include CSS
        if (this.includeCss) {
            console.log($('<style></style>').text(css).prependTo('head'));
        }

        // Setup container elements required for Deck view
        $(this.el).addClass(opts.className || 'hub-DeckView');
        var $deckColumns = $(document.createElement('div')).addClass('deck-columns');
        $(this.el).append($deckColumns);

        for (var i=0; i < this._collections.length; i++) {
            // Create the containing element for a ListView
            var $deckCol = $(document.createElement('section')).addClass('deck-col');
            $deckColumns.append($deckCol);

            // Create a heading if the collection has one specified
            var $deckColHeading = $(document.createElement('div')).addClass('deck-col-heading');

            var $title = $(document.createElement('h2')).addClass('deck-col-title');
            $title.html(this._collections[i].headingTitle);
            $deckColHeading.append($title);

            var $heading = $(document.createElement('div')).addClass('deck-col-body');
            var headingContent = this.createHeadingContent({
                el: $heading,
                articleId: this._collections[i].articleId
            });
            $deckColHeading.append($heading);

            $deckCol.append($deckColHeading);

            //TODO(ryanc): Reply box

            // Create a deck column for a particular stream
            var $listViewContainer = $(document.createElement('div')).addClass('deck-col-container');
            var $deckColScroll = $(document.createElement('div')).addClass('deck-col-scroll');
            var $feed = $(document.createElement('div')).addClass('deck-feed');
            $deckColScroll.append($feed);
            $listViewContainer.append($deckColScroll);
            $deckCol.append($listViewContainer);

            var columnEl = $feed[0];
            var view = new Hub.Views.ListView({
                el: columnEl
            });
            var livefyreStreams = Hub.StreamManager.create.livefyreStreams(this._collections[i]);
            this._streams.push(livefyreStreams);
            livefyreStreams.bind(view).start();
        }
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
