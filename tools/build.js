({
    baseUrl: "..",
    paths: {
        fyre: 'tools/livefyre',
        jquery: 'components/jquery/jquery',
        underscore: 'components/underscore/underscore',
        backbone: 'components/backbone/backbone',
        mustache: 'components/mustache/mustache',
        text: 'components/requirejs-text/text',
        config: 'config',
        'streamhub-deck': 'main',
        'streamhub-deck/views': 'views',
        'streamhub-deck/templates': 'templates'
    },
    packages: [
        {
            name: 'streamhub-backbone',
            location: 'components/streamhub-backbone'
        }
    ],
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'fyre': {
            exports: 'fyre'
        },
    },
    name: "tools/almond",
    out: "streamhub-deck.almond.js",
    include: ['streamhub-backbone', 'streamhub-deck']
})
