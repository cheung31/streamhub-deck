require.config({
    urlArgs: 'cb=' + Math.random(),
    paths: {
        jquery: 'lib/jquery/jquery',
        text: 'lib/requirejs-text/text',
        jasmine: 'lib/jasmine/lib/jasmine-core/jasmine',
        'jasmine-html': 'lib/jasmine/lib/jasmine-core/jasmine-html',
        'jasmine-jquery': 'lib/jasmine-jquery/lib/jasmine-jquery',
        hgn: 'lib/requirejs-hogan-plugin/hgn',
        hogan: 'lib/hogan/web/builds/2.0.0/hogan-2.0.0.amd',
        base64: 'lib/base64/base64'
    },
    packages: [{
        name: 'streamhub-sdk',
        location: 'lib/streamhub-sdk/src'
    },{
        name: 'streamhub-deck',
        location: './src'
    },{
        name: 'streamhub-deck-tests',
        location: './tests/'
    }],
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
        jquery: {
            exports: '$'
        }
    }
});
