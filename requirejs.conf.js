require.config({
    urlArgs: 'cb=' + Math.random(),
    packages: [{
        name: 'streamhub-backbone',
        location: 'components/streamhub-backbone'
    },{
        name: 'streamhub-deck',
        location: '.'
    },{
        name: 'streamhub-deck-tests',
        location: './tests/'
    }],
    paths: {
        jquery: 'components/jquery/jquery',
        underscore: 'components/underscore/underscore',
        backbone: 'components/backbone/backbone',
        mustache: 'components/mustache/mustache',
        deck: 'components/deck/jquery.deck',
        text: 'components/requirejs-text/text',
        jasmine: 'components/jasmine/lib/jasmine-core/jasmine',
        'jasmine-html': 'components/jasmine/lib/jasmine-core/jasmine-html',
        'jasmine-jquery': 'components/jasmine-jquery/lib/jasmine-jquery',
        fyre: 'http://zor.t402.livefyre.com/wjs/v3.0/javascripts/livefyre'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        'jasmine-jquery': {
            deps: ['jquery', 'jasmine']
        },
        fyre: {
            exports: 'fyre'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});
