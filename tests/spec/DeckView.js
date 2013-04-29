define([
    'jasmine-jquery',
    'streamhub-deck',
    'streamhub-sdk',
    '../MockStream'],
function (jasmine, DeckView, Hub, MockStream) {

describe('A DeckView', function () {

    describe ('can be constructed', function() {
        it ('with array of collections options objects', function() {
            expect(function() {
                new DeckView({
                    collections: []
                });
            });
        });

        it ('and be bound to a StreamManager', function() {
            expect(function() {
                var collections = [{
                    network: 'my_network',
                    siteId: 123,
                    articleId: 'my_article',
                    environment: 'my_environment',
                    headingTitle: 'Title 1',
                }];

                var deckView = new DeckView({
                    collections: []
                });
                
                var streamManager = new Hub.StreamManager(new MockStream(collections[0]));
                streamManager.bind(deckView);
                expect(streamManager._views[0]).toEqual(deckView);
            });
        });
    });

    describe ('after successful construction', function() {
        it ('has the correct DOM structure to support deck columns', function() {
            setFixtures('<div id="my_deck"></div>');
            var view = new DeckView({
                collections: [],
                el: document.getElementById("my_deck")
            });
            
            expect($('#my_deck')).toHaveClass('hub-DeckView');
        });

        it ('can handle an empty array of collections/streams', function() {
            setFixtures('<div id="my_deck"></div>');
            var view = new DeckView({
                collections: [],
                el: document.getElementById("my_deck")
            });

            expect($('.deck-col', '#my_deck').length).toEqual(0);
        });

        it ('displays appropriate heading content depending on collection object', function() {
            setFixtures('<div id="my_deck"></div>');
            var collections = [{
                network: 'my_network',
                siteId: 123,
                articleId: 'my_article',
                environment: 'my_environment',
                headingTitle: 'Title 1',
            }];

            var streams = {};
            for (var i=0; i < collections.length; i++) {
                streams[collections[i].articleId] = new MockStream();
            }

            var view = new DeckView({
                collections: collections,
                el: document.getElementById("my_deck")
            });

            expect($('.deck-col-title', '#my_deck').length).toEqual(1);
            expect($('.deck-col-title', '#my_deck').html()).toEqual('Title 1');
        });

        it ('can scroll horizontally to reveal any overflowed content', function() {
            var collections = [{
                network: 'my_network',
                siteId: 123,
                articleId: 'my_article1',
                environment: 'my_environment',
                headingTitle: 'Title 1',
            },
            {
                network: 'my_network',
                siteId: 123,
                articleId: 'my_article2',
                environment: 'my_environment',
                headingTitle: 'Title 2',
            }];
            var colWidth = 300;
            setFixtures('<style>.deck-col { width: ' + colWidth + 'px; }</style><div id="my_deck"></div>');

            var streams = {};
            for (var i=0; i < collections.length; i++) {
                streams[collections[i].articleId] = new MockStream();
            }

            var view = new DeckView({
                collections: collections,
                el: document.getElementById("my_deck")
            });

            // Expect outer width of a deck column assuming default stylesheet
            var $deckCols = $('.deck-col', '#my_deck');
            var $deckColumnsContainer = $('.deck-columns', '#my_deck');
            expect($deckCols.eq(0).outerWidth(true) * $deckCols.length).toBeLessThan($deckColumnsContainer.width());
        });
    });

}); 
});
