# streamhub-deck

streamhub-deck is a [StreamHub App](http://apps.livefyre.com) that shows social content like comments, photos, and tweets in a TweetDeck layout. Display social content for various topics relevant to your website or app.

## Getting Started

The quickest way to use streamhub-feed is to use the built version hosted on Livefyre's CDN.

### Dependencies

streamhub-deck depends on [streamhub-sdk](https://github.com/livefyre/streamhub-sdk). Ensure it's been included in your page.

	<script src="http://cdn.livefyre.com/libs/sdk/v2.1.1/streamhub-sdk.min.js"></script>

Include streamhub-deck too.

	<script src="http://cdn.livefyre.com/libs/apps/cheung31/streamhub-deck/v2.0.2-build.35/streamhub-deck.min.js"></script>
	
Optionally, include some reasonable default CSS rules for StreamHub Content. This stylesheet is provided by the StreamHub SDK.

    <link rel="stylesheet" href="http://cdn.livefyre.com/libs/sdk/v2.1.1/streamhub-sdk.min.css" />


### Usage

1. Require streamhub-sdk and streamhub-deck

        var Hub = Livefyre.require('streamhub-sdk'),
            DeckView = Livefyre.require('streamhub-deck');
            
          
1. An empty feed is no fun, define an array of Livefyre Collections to be displayed. These collections will be rendered as columns of respective streams in the DeckView.

        var my_collections = [
        	{
            	network: "labs.fyre.co",
	            siteId: 315833,
    	        articleId: 'example',
        		headingTitle: 'COLUMN 1'
        	}
        	...
        ];
    
1. Create a DeckView, passing the DOMElement to render it in (```el``` option). Also, specify the collections you wish to display as columns in the DeckView (```collections``` option). (Note: DeckView automatically starts all streams for each respective collection on instantiation. There is no need to manually start the streams.)

        var deckView = new DeckView({
            el: document.getElementById('deck'),
            collections: my_collections
        });

You now have a Deck! See this all in action on [this jsfiddle](http://jsfiddle.net/nmVz3/9/).

## Local Development

Instead of using a built version of streamhub-deck from Livefyre's CDN, you may wish to fork, develop on the repo locally, or include it in your existing JavaScript application.

Clone this repo

    git clone https://github.com/cheung31/streamhub-deck

Development dependencies are managed by [npm](https://github.com/isaacs/npm), which you should install first.

With npm installed, install streamhub-deck's dependencies. This will also download [Bower](https://github.com/bower/bower) and use it to install browser dependencies.

    cd streamhub-deck
    npm install

This repository's package.json includes a helpful script to launch a web server for development

    npm start

You can now visit [http://localhost:8080/](http://localhost:8080/) to see an example feed loaded via RequireJS. Now tweak to your heart's content.

# StreamHub

[Livefyre StreamHub](http://www.livefyre.com/streamhub/) is used by the world's biggest brands and publishers to power their online Content Communities. StreamHub turns your site into a real-time social experience. Curate images, videos, and Tweets from across the social web, right into live blogs, chats, widgets, and dashboards. Want StreamHub? [Contact Livefyre](http://www.livefyre.com/contact/).
