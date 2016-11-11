<?php
    function ValidateEmail($value){
        $regex = '/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,10})$/';
        if($value == ''){
            return false;
        }else{
            $string = preg_replace($regex, '', $value);
        }

        return empty($string) ? true : false;
    }
?>
