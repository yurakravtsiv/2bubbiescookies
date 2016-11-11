$(document).ready(function(){
    $("form").on('submit', submitForm);
    
 function submitForm(e) {
//        e.preventDefault();

        var form = $(this),
            submitBtn = form.find('button[type="submit"]');

//        if(app.validateForm(form) === false) return false;

//        submitBtn.attr('disabled', 'disabled');

        $.ajax({
        url: "mail.php",
        type: "POST",
        data: $(this).serialize()
        })
        .done(function(msg) {
            if(msg === "OK"){
                console.log("ok");
            }else{
              console.log("no");
            }
        });


    };
    
});
