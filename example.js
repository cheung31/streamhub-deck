define(function(require) {
    var Hub = require('streamhub-sdk');
    var DeckView = require('streamhub-deck');
    
    return function(el) {
		var collection_opts = [
		    {
		        network: "labs-t402.fyre.co",
		        siteId: "303827",
		        articleId: 'scoreboard_demo_0',
		        environment: "t402.livefyre.com",
		        headingTitle: 'Snowboarding',
		        youtubeId: 'ESEdOAQuYQ4'
		    },
		    {
		        network: "labs-t402.fyre.co",
		        siteId: "303827",
		        articleId: 'feed_ticker_0',
		        environment: "t402.livefyre.com",
		        headingTitle: 'Civilization',
		        youtubeId: 'mHXx7HCibEg'
		    },
            {
                network: "labs-t402.fyre.co",
                siteId: "303827",
                articleId: 'sh_col_51_1366914813',
                environment: "t402.livefyre.com",
                headingTitle: 'WATSKY!',
                youtubeId: '0M1L15hpphQ'
            }
		];
		
		return new DeckView({
		    collections: collection_opts,
		    el: el
		});
    };
});
