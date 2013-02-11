# StreamHub Deck

Add a *"[TweetDeck](http://tweetdeck.com)"*-esque columned widget of content from [StreamHub-Backbone](http://gobengo.github.com/streamhub-backbone/) to your website.

### What is Livefyre StreamHub?
[Livefyre StreamHub](http://www.livefyre.com/streamhub/) is the web's first Engagement Management System. StreamHub turns your site into a real-time social experience. Curate images, videos, and Tweets from across the social web, right into live blogs, chats, widgets, and dashboards. The world's biggest publishers and brands use StreamHub to power their online Content Communities.

### What is StreamHub Deck?
StreamHub Deck is a widget that can be plugged into your website to display the social content provided by Livefyre StreamHub via [StreamHub-Backbone](http://gobengo.github.com/streamhub-backbone/). As seen in the screenshots above, you can create a TweetDeck-like layout of tweets for various topics relevant to your website/app.

> The StreamHub Deck with a custom header (title and Youtube video) and tweets as content.
![StreamHub Deck](https://raw.github.com/cheung31/streamhub-deck/0_jsdoc/images/streamhub-deck.png)


> The StreamHub Deck as used in the [Livefyre Super Bowl NewsHub](http://superbowl.livefyre.com/#/commercials/)
![Super Bowl NewsHub Deck](https://raw.github.com/cheung31/streamhub-deck/0_jsdoc/images/sb-deck.png)

### Example Usage
##### Configuring StreamHub collections to appear in Deck columns
You can specify the StreamHub collections that will appear in the Deck columns, and the title/heading that will appear above each corresponding Deck column in ```config.js```.

       define({
          collections: [
              {
                  siteId: 303827,
                  articleId: 'scoreboard_demo_0',
                  headingTitle: 'Title 1',
                  youtubeId: 'ESEdOAQuYQ4'
              },
              {
                  siteId: 303827,
                  articleId: 'feed_ticker_0',
                  headingTitle: 'Title 2',
                  youtubeId: 'mHXx7HCibEg'
              }
          ]
        });

		
##### Rendering the ```DeckView```
        // Source-specific templates used by Deck View, etc. (e.g. RSS templates, Twitter templates)
        // Supported sources and their templates
        var sources = {
            twitter: {
                template: function (d) {
                    // Attempt to set the tweet_id for the template
                    var content_id = d.id;
                    if (content_id) {
                        d.tweet_id = content_id.split('@twitter.com')[0].substring('tweet-'.length);
                    }
                    // Attempt to get photo attachment
                    if (d.attachments && d.attachments[0].thumbnail_url) {
                        d.image_url = d.attachments[0].thumbnail_url;
                    }
                    return Mustache.compile(TwitterContentTemplate)(d);
                }
            },
            rss: {
                template: function (d) {
                    return Mustache.compile(InstagramHtml)(d);
                }
            }
        };

        // Initialize DeckView, with multiple collections (articleId's)
        var collections = [];
        for (var i = 0; i < deckConfig.collections.length; i++) {
            var collectionMeta = deckConfig.collections[i];
            var col = new Hub.Collection().setRemote({
                sdk: sdk,
                siteId: collectionMeta.siteId,
                articleId: collectionMeta.articleId
            });
            $.extend(col, collectionMeta);
            collections.push(col);
        }

        // Initialize DeckView with collections
        var view = new DeckView({
            el: document.getElementById("my_deck"),
            collections: collections,
            feedView: DeckFeedView,
            sources: sources
        });
        view.render();

        //// Calculate proper deck scroll width
        var col_width = 307;
        //var viewport_width = $(window).width();
        $('.deck-columns').css('width', ((collections.length+1) * col_width) + ($('.deck-col').eq(0).offset().left) * collections.length);
        

### Prequisites
* [Bower](http://twitter.github.com/bower/)

### Running the demo
1. ```git clone git@github.com:cheung31/streamhub-deck.git```
2. ```cd streamhub-deck```
3. ```bower install```
4. ```python -m SimpleHTTPServer 8888``` (or another server of your choice)
5. Navigate to ```localhost:8888``` (or the appropriate port number)

### Authors and Contributors
2013, Ryan Cheung (@cheung31), Ben Goering (@bengo) for Livefyre Labs.
