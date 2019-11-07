<?php 

if (isset($_POST['submit'])) {
    print_r($_POST);
    $to = 'kvc@kvc42.ru'; 
    $subject = 'Заявка. дизайнштор.рус';
    $from = "brilew.a.s@gmail.com";
    $headers = "From:" . $from;

    if($_POST['name'] && $_POST['phone']){
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $time = $_POST['time'] ?? null;
        $mail = $_POST['mail'] ?? null;        
        $comment = $_POST['comment'] ?? null;

        $message = "Имя: $name, Номер телефона: $phone \n";
        $message .= $time ? "Время: $time \n" : "";
        $message .= $mail ? "Почта: $mail \n" : "";
        $message .= $comment ? "Комментарий: $comment \n" : "";
        
        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(['status'=> true]);
        }
        else {
            echo json_encode(['status'=> false]);
        }
    }else{
        echo json_encode(['status'=> false]);
    }
}

?>