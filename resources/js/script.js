(function ($, window, document, undefined) {
    'use strict';

    var _preload = 'cargando<span>.</span><span>.</span><span>.</span><span>.</span>'; 

    function menuEvent(e) {
        e.preventDefault();
        TweenMax.to('#news', 0.4, { autoAlpha: 1, ease: Expo.easeOut });

        $.getJSON( newUrl, function(data) {
            $.each(data, function(key, item) {
                var _html = '<article class="col-lg-12 col-md-12 col-sm-12 col-xs-12 relative new">'+
                                '<div class="block new-preview" data-new="open" id="'+ item.id +'">'+
                                    '<div class="row">'+
                                        '<figure class="col-lg-2 col-md-2 col-sm-2 col-xs-2">'+
                                            '<img class="center-block img-responsive img-circle" src="http://lorempixel.com/100/100" alt="">'+
                                        '</figure>'+
                                        '<h2 class="col-lg-10 col-md-10 col-sm-10 col-xs-10">'+ item.title +'</h2>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="block new-content"></div>'+
                            '</article>';

                $('#news').append( _html );
                TweenMax.to('#news .new', 0.5, { css: { left: 0, opacity: 1 }, autoAlpha: 1, ease: Elastic.easeOut });
            });
        } );
    }

    function newEvent() {
        if ( $(this).data('new') === 'open' ) {
            $(this).data('new', 'close');
            openNew( $(this) );
        } else {
            $(this).data('new', 'open');
            closeNew( $(this) );
        }
            
    }

    function openNew($this) {
        console.log( $this );
        var _title  = $this.find('h2'),
            _new = $this.closest('.new').find('.new-content'),
            _id  = $this.context.id;
        console.log( _new );

        $('h1').toggleClass('actived');

        $.getJSON( newUrl, function(data) {
            // console.log( data );
            $.each(data, function(key, item) {
                if ( _id == item.id ) {
                    console.log( item );
                    var _html = '<div class="row">'+
                            '<figure class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'+
                                '<img class="img-responsive" src="'+ item.image +'" alt="">'+
                            '</figure>'+
                            '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">'+
                                '<h3 class="block">'+ item.title +'</h3>'+
                                '<p class="block">'+ item.content +'</p>'+
                            '</div>'+
                        '</div>';

                    _new.html( _html );
                    console.log( _html );
                    console.log( _new.html() );
                }
            });
        } );

        $this.toggleClass('active');
        _new.fadeToggle(400, function() {
            $('h1').text( _title.text() );
        });
    }

    function closeNew($this) {
        var _new = $this.closest('.new').find('.new-content');

        $this.toggleClass('active');
        _new.fadeToggle(300, function() {
            $(this).html('');
            $('h1').toggleClass('actived').html( _preload );
        });
    }

    function initReady() {
        $('#nav-menu').on('click', menuEvent);
    }

    function initLoad() {
        TweenMax.to('#preload', 1.5, { css: { display: 'none', opacity: 0 }, autoAlpha: 0, ease: Power3.easeOut, onComplete: function() {
            TweenMax.to('#wrapper-container', 1, { css: { bottom: 0, opacity: 1 }, autoAlpha: 1, ease: Linear.easeIn });
            TweenMax.to('#nav-menu, footer', 0.5, { css: { opacity: 1 }, autoAlpha: 1, delay: 0.95, ease: Expo.easeIn });
        } });
    }

    $(document).on('ready', initReady);
    $(document).on('click', '#news .new-preview', newEvent);
    $(window).on('load', initLoad);
})(jQuery, window, document);