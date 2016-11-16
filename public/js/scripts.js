$(function () {
    
    var form = $("#emailForm");
    var fileString;
    var fullUrl =  location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    
    // Slick init
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
    
    
    // Menu links hover and select
//    $( ".menu-link-item" )
//      .mouseover(function() {
//        $( this ).addClass('active');
//      })
//      .mouseout(function() {
//        $( this ).removeClass('active');
//      });
    
    // Portfolio card show order button
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
    
    // Go to portfolio
    $( ".portfolio-item" )
      .click(function() {
        var category = $( this ).find('.item-title-text').text();
        window.location.href = 'portfolio.html';
        
//        setTimeout(function() { 
//            debugger;
//            $( '.portfolio-menu li' ).parent().find('.current').removeClass('current');
//            for ( var i = 0; i < $('.portfolio-menu').find('li').length; i++ ) 
//            {
//                debugger;
//                if( $('.portfolio-menu').find('li')[i].innerHTML == category && $('.portfolio-menu').find('li')[i].innerText == category ) {
//                    $('.portfolio-menu').find('li')[i].className = 'current';
//                }
//            }
//        }, 1000);
      });
    
    // Portfolio menu select item
    $( ".portfolio-menu li" )
      .click(function() {
        $( this ).parent().find('.current').removeClass('current');
        $( this ).addClass('current');
      });
    
    //Filling form fields
    $( "#cookieDesign" ).val(localStorage.getItem("cookieDesign"));
    $( "#orderDate" ).val(todayDate());
    
    //Cleanning form fields
    $( "#cancelBtn" ).click(function(e) {
        e.preventDefault();
        $( "input" ).val('');
        $( "textarea" ).val('');
        $( ".fileName" ).text('Browse...');
        $( "#orderDate" ).val(todayDate());
        localStorage.removeItem("cookieDesign");
        $("#msg").text("");
        form.find('input,textarea').css('border-color', '#76bddd');
    });
    
    $( ".menu-link-item" ).click(function() {
        localStorage.removeItem("cookieDesign");
    });
     
    //File to base64
    var handleFileSelect = function(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;
                fileString = btoa(binaryString);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('file').addEventListener('change', handleFileSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
    
    //Send form
    $("#sendBtn").click(function(e){     
      if (validateForm(form) != false ) { 
        
        var formData = $("#emailForm").serialize();
        var fileName = $( '#file' )[0].files[0].name;
        var formDataFileAppendix = '&fileName=' + fileName + '&file=' + fileString;
        formData = formData + formDataFileAppendix;
        
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
      }
      return false;
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

function validateForm(form) {
    $( "input,textarea" ).change(function() {
        validateForm(form);
    });
    if( form.find('#firstLastName').val().length > 1 ) {
        form.find('#firstLastName').css('border-color', '#bec6d3');
    }
    else {
        form.find('#firstLastName').css('border-color', 'red');
    } 
    
    var regexPhone = /^[0-9+()]+$/;
    if( regexPhone.test(form.find('#phoneNumber').val()) ) {
        form.find('#phoneNumber').css('border-color', '#bec6d3');
    }
    else {
        form.find('#phoneNumber').css('border-color', 'red');
    }
    
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if( regexEmail.test(form.find('#email').val()) ) {
        form.find('#email').css('border-color', '#bec6d3');
    }
    else {
        form.find('#email').css('border-color', 'red');
    }
    
    if( form.find('#cookieDesign').val().length > 1 ) {
        form.find('#cookieDesign').css('border-color', '#bec6d3');
    }
    else {
        form.find('#cookieDesign').css('border-color', 'red');
    }
    
    if( form.find('#quantity').val() > 0) {
        form.find('#quantity').css('border-color', '#bec6d3');
    }
    else {
        form.find('#quantity').css('border-color', 'red');
    }
    
    if( form.find('#messageOnSticker').val().length > 1 ) {
        form.find('#messageOnSticker').css('border-color', '#bec6d3');
    }
    else {
        form.find('#messageOnSticker').css('border-color', 'red');
    }

    if( form.find('#dateNeeded').val() >= form.find('#orderDate').val() && form.find('#dateNeeded').val().length != "") {
        form.find('#dateNeeded').css('border-color', '#bec6d3');
    }
    else {
        form.find('#dateNeeded').css('border-color', 'red');
    }
    
    if( form.find('#shippingAddress').val().length > 1 ) {
        form.find('#shippingAddress').css('border-color', '#bec6d3');
    }
    else {
        form.find('#shippingAddress').css('border-color', 'red');
    } 
    
    var temp = 0;
    for ( var i = 0; i < form.find('input,textarea').length; i++ ) 
    {
        var el = '#' + form.find('input,textarea')[i].id;
        if( form.find(el).css('border-color') == 'rgb(255, 0, 0)' ) {
            ++temp;
            $('#msg').css('color', 'red');
            $('#msg').text('Incorrect data');
            return false;
        }
    }
    if (temp == 0) {
        $('#msg').text('');
        $('#msg').css('color', '#76bddd');
    }
}

