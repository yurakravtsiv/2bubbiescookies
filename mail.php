<?php
    include 'defines.php';
    include 'email_validation.php';

    $post = (!empty($_POST)) ? true: false;

    if($post){
//
//        $recepient = "grytsenko.kate.ua@gmail.com";
//        $sitename = "Lasoft";
//

        $name = stripslashes($_POST["name"]);
        $email = stripslashes($_POST["email"]);
        $skype = stripslashes($_POST["skype"]);
        $comment = stripslashes($_POST["comment"]);
        $subject = 'Request';
        $error = '';
        $message = "'Name:'.$name
                    'Email:'.$email
                    'Skype:'.$skype";

        if(!ValidateEmail($email)){
            $error = 'Email isn`t correct!';
        }

        if(!$error){
            // // Сообщение
            // $message = "Line 1\r\nLine 2\r\nLine 3";
            //
            // // На случай если какая-то строка письма длиннее 70 символов мы используем wordwrap()
            // $message = wordwrap($message, 70, "\r\n");

            // Отправляем
            $mail = mail('yura.kravtsiv@gmail.com', $subject, $message);

            if($mail){
                die('OK');
            }else {
                die('Not Ok');
            }

        }else{
            echo 'Error Result';
            die();
        }

    }
