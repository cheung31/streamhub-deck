define(function(require) {
    var Hub = require('streamhub-sdk');
    var DeckView = require('streamhub-deck');
    
    return function(el) {
		var collection_opts = [
		    {
		        network: "labs.fyre.co",
                environment: "livefyre.com",
                siteId: "315833",
                articleId: 'livefyre-tweets',
		        headingTitle: 'Livefyre',
		        youtubeId: '6f5vXjHeWCs'
		    },
		    {
		        network: "labs.fyre.co",
                environment: "livefyre.com",
                siteId: "315833",
                articleId: 'livefyre-tweets',
		        headingTitle: 'More Livefyre',
		        youtubeId: 'HxRiyuXSIL0'
		    },
            {
                network: "labs.fyre.co",
                environment: "livefyre.com",
                siteId: "315833",
                articleId: 'livefyre-tweets',
                headingTitle: 'Livefyre @ Roadmap',
                youtubeId: 'D7AfEp1UxiU'
            }
		];
		
		return new DeckView({
		    collections: collection_opts,
		    el: el
		});
    };
});
