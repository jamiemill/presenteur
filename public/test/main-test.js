requirejs.config({
    baseUrl: '/base/public/'
});

require(['isolate', 'sinon'], function(isolate, sinon) {

    isolate.mapAsFactory(
        'lib/slideshow',
        function() { return sinon.spy(); }
    );
    isolate.mapAsFactory(
        'lib/keyboard-controller',
        function() { return sinon.spy(); }
    );

    isolate.passthru([
        'jQuery',
        'MicroEvent',
        'chai',
        'sinon',
        'sinon-chai',
        /\.spec/
    ]);

    require([
        'test/lib/lux.spec',
        'test/lib/slideshow.spec',
        'test/lib/keyboard-controller.spec'
    ], function(){
        window.__karma__.start();
    });
});
