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
        base64: 'lib/base64/base64',
        'event-emitter': 'lib/event-emitter/src/event-emitter',
        inherits: 'lib/inherits/inherits',
        debug: 'lib/debug/debug'
    },
  packages: [{
    name: "streamhub-sdk",
    location: "lib/streamhub-sdk/src/"
  },{
    name: "streamhub-sdk/auth",
    location: "lib/streamhub-sdk/src/auth"
  },{
    name: "streamhub-sdk/collection",
    location: "lib/streamhub-sdk/src/collection"
  },{
    name: "streamhub-sdk/content",
    location: "lib/streamhub-sdk/src/content"
  },{
    name: "streamhub-sdk/modal",
    location: "lib/streamhub-sdk/src/modal"
  },{
    name: "streamhub-sdk-tests",
    location: "lib/streamhub-sdk/tests/"
  },{
    name: "stream",
    location: "lib/stream/src"
  },{
    name: "view",
    location: "lib/view/src",
    main: "view"
  },{
	name: "streamhub-deck",
  	location: "./src"
  },{
    name: 'streamhub-deck-tests',
    location: './tests/'
  },{
    name: "auth",
    location: "lib/auth/src"
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
