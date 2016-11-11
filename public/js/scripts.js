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
    
//    $( ".portfolio-item" )
//      .mouseover(function() {
//        $( this ).find('.item-title-text').hide();
//        $( this ).find('.item-title img').hide();
//        $( this ).find('.button').show();
//      })
//      .mouseout(function() {
//        $( this ).find('.button').hide();
//        $( this ).find('.item-title img').show();
//        $( this ).find('.item-title-text').show();
//      });
    
    $( ".portfolio-card" )
      .mouseover(function() {
        $( this ).find('.price').hide();
        $( this ).find('.button').show();
      })
      .mouseout(function() {
        $( this ).find('.button').hide();
        $( this ).find('.price').show();
      });

    $( ".portfolio-card .button" ).click(function() {
        var cookieDesign = $( this ).parent().siblings('.header').text();
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
    
    $( ".portfolio-menu li" )
      .click(function() {
        $( this ).parent().find('.current').removeClass('current');
        $( this ).addClass('current');
      });
    
    $( "#cookieDesign" ).val(localStorage.getItem("cookieDesign"));
    
    $( "#orderDate" ).val(todayDate());
    
    $( ".menu-link-item" ).click(function() {
        localStorage.removeItem("cookieDesign");
    });
    
    $( "#cancelBtn" ).click(function(e) {
        e.preventDefault();
        $( "input:not(:submit)" ).val('');
        $( ".fileName" ).text('Browse...');
        $( "#orderDate" ).val(todayDate());
        localStorage.removeItem("cookieDesign");
    });
    

    var fullUrl =  location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    $("#sendBtn").click(function(e){      
      var formData = $("#emailForm").serialize();
      $("#msg").text("Email sending Please wait..");
                $.ajax({
                url: fullUrl+'/send',
                type: 'POST',
                data: formData,
                success: function(result) {
                                 $("#msg").empty().text(result);
                         },
                error: function(e) {
                                 $("#msg").empty().text("There is some error to send email, Error code:"+e.status +", Error message:"+e.statusText);
                       },
                dataType: "html",
                timeout: 60000
            });
    });
    return false;
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

