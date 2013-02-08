({
    baseUrl: "..",
    paths: {
        fyre: 'http://zor.t402.livefyre.com/wjs/v3.0/javascripts/livefyre',
        jquery: 'components/jquery/jquery',
        underscore: 'components/underscore/underscore',
        backbone: 'components/backbone/backbone',
        "streamhub-deck": ".",
        mustache: 'components/mustache/mustache',
        text: 'components/requirejs-text/text'
    },
    packages: [{
        name: 'streamhub-backbone',
        location: 'components/streamhub-backbone'
    }],
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    },
    name: "tools/almond",
    out: "streamhub-deck.almond.js",
    include: ['main']
})
