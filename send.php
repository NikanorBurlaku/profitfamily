<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь

$name = $_POST['name'];
$phone = $_POST['phone'];
$telegram = $_POST['telegram'];
$link = $_POST['link'];
$info = $_POST['info'];

// Формирование самого письма
$title = "Отклик с сайта ProfiFamily";
$body = "
<h2>Отклик с сайта ProfiFamily</h2>
<b>Имя:</b> $name<br>
<b>Номер телефона:</b> $phone<br>
";
if (!empty($telegram)) $body .= "<b>Телеграм:</b> $telegram<br>";
if (!empty($link)) $body .= "<b>Ссылка на резюме:</b> $link<br>";
if (!empty($info)) $body .= "<b>Дополнительная информация:</b> $info<br>";

$body .= '<br><br>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function ($str, $level) {
        $GLOBALS['status'][] = $str;
    };
    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'example@info'; // Логин на почте
    $mail->Password   = '******'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('example@info', 'Отклик с сайта'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('example@info');

    // Прикрипление файлов к письму
    $file = $_FILES['file'];
    $rfile = null;
    if (!empty($file['name'])) {
        $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name']));
        $filename = $file['name'];
        if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
            $rfile[] = "Файл $filename прикреплён";
        } else {
            $rfile[] = "Не удалось прикрепить файл $filename";
        }
    }

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отравленность сообщения
    if ($mail->send()) {
        $result = "success";
    } else {
        $result = "error";
    }
    $result = 'success';
    $status = null;
} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status-error" => $status]);
