$(document).ready(function(){
    $("#form").submit(function() { //устанавливаем событие отправки для формы с id=form
        debugger;
            var form_data = $(this).serialize(); //собераем все данные из формы
            $.ajax({
            type: "POST", //Метод отправки
            url: "send.php", //путь до php фаила отправителя
            data: form_data,
            success: function() {
                   //код в этом блоке выполняется при успешной отправке сообщения
                   alert("Ваше сообщение отпрвлено!");
            },
                error: function(jqXHR, textStatus, errorThrown) {
                   //код в этом блоке выполняется при успешной отправке сообщения
                   alert(textStatus);
                   alert(errorThrown);
            }
        });
        debugger;
    });  
});