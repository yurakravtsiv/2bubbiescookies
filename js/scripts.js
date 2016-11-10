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

    $( ".portfolio-item .button" ).click(function() {
        var cookieDesign = $( this ).siblings('.item-title-text').text();
        localStorage.setItem("cookieDesign", cookieDesign);
        window.location.href = 'order.html';
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
    
    $( "#cookieDesign" ).val(localStorage.getItem("cookieDesign"));
    
    $( "#orderDate" ).val(todayDate());
    
    $( "#cancelBtn" ).click(function(e) {
        e.preventDefault();
        $( "input:not(:submit)" ).val('');
        $( ".fileName" ).text('Browse...');
        $( "#orderDate" ).val(todayDate());
        localStorage.removeItem("cookieDesign");
    });
     
    $( "input:submit" ).click(function() {
        
    });
});

function todayDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

