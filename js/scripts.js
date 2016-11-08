$(function () {
    $( ".menu-link-item" )
      .mouseover(function() {
        $( this ).addClass('active');
      })
      .mouseout(function() {
        $( this ).removeClass('active');
      })
      .click(function() {
        $( this ).parent().parent().find('.current').removeClass('current');
        $( this ).addClass('current');
      });
    
    $( ".portfolio-item" )
      .mouseover(function() {
        $( this ).find('.item-title-text').hide();
        $( this ).find('.item-title img').hide();
        $( this ).find('.button').show();
      })
      .mouseout(function() {
        $( this ).find('.button').hide();
        $( this ).find('.item-title img').show();
        $( this ).find('.item-title-text').show();
      });
    
    $(document).ready(function(){
      $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
      });
        
        function setSlickArrowPos() {
            var sliderHeight = $( '.slider' ).height() / 2 + 'px';
            $( '.slick-arrow' ).css('top', sliderHeight);    
        }
        setSlickArrowPos();
        $( window ).resize(function() {
          setSlickArrowPos();
        });
    });
    
});

