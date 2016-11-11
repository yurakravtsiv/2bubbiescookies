<?php
if($_POST["message"]) {
    mail("yura.kravtsiv@gmail.com", "Form to email message", $_POST["message"], "From: an@email.address");
}
?>