// On page load

$(document).ready(function() {
    $('code,pre').addClass('prettyprint');
    prettyPrint();

    var presenter = new Presenter({
        baseEl: $('.presentation')
    });

    var keyboardController = new KeyboardController({
        presenter: presenter
    });

    var swipeController = new SwipeController({
        presenter: presenter
    });

    var urlBinder = new UrlBinder({
        presenter: presenter,
        baseEl: $('.presentation')
    });

});