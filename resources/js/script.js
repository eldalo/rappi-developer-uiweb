(function ($, window, document, undefined) {
    'use strict';

    function menuEvent(e) {
        e.preventDefault();

        $.getJSON( uri + 'bootstrap/news_mock.json', function(data) {
            $.each(data, function(key, item) {
                var _html = '<article class="col-lg-12 col-md-12 col-sm-12 col-xs-12 relative new" id="'+ item.id +'">'+
                                '<div class="block new-preview">'+
                                    '<div class="row">'+
                                        '<figure class="col-lg-2 col-md-2 col-sm-2 col-xs-2">'+
                                            '<img class="center-block img-responsive img-circle" src="http://lorempixel.com/100/100" alt="">'+
                                        '</figure>'+
                                        '<h2 class="col-lg-10 col-md-10 col-sm-10 col-xs-10">'+ item.title +'</h2>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="block new-content">'+
                                    '<div class="row">'+
                                        '<figure class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'+
                                            '<img class="img-responsive" src="'+ item.image +'" alt="">'+
                                        '</figure>'+
                                        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">'+
                                            '<h3 class="block">'+ item.title +'</h3>'+
                                            '<p class="block">'+ item.content +'</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</article>';
                $('#news').append( _html );
            });

            TweenMax.to('#news', 0.4, { autoAlpha: 1, ease:Expo.easeOut, onComplete: function() {
                TweenMax.staggerTo($('#news .new'), 0.5, { className: '+=open', autoAlpha: 1, ease: Power2.easeIn }, 0.125);
            } });
        } );
    }

    function newEvent() {
        var _title   = $(this).find('h2'),
            _content = $(this).find('.new-content');

        $('h1').text( _title.text() ).toggleClass('actived');
        _content.fadeToggle(400);
    }

    function initReady() {
        $('#nav-menu').on('click', menuEvent);
        $('#news .new').on('click', newEvent);
    }

    function initLoad() {
        TweenMax.to('#wrapper-container', 1, { css: { opacity: 1, bottom: 0 }, autoAlpha: 1, ease: Linear.easeIn, onComplete: function() {
            // TweenMax.to('#menu-open', 0.5, { css: { opacity: 1, left: '15px' }, autoAlpha: 1, ease: Linear.easeIn });
        } });
    }

    $(document).on('ready', initReady);
    $(document).on('click', '#news .new', newEvent);
    $(window).on('load', initLoad);
})(jQuery, window, document);