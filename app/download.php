<?php

$filename = $_SERVER['DOCUMENT_ROOT'].'/upload/images/files/result.png';

if (file_exists($filename)) {
        header("Content-type: application/x-download");
        header("Content-Disposition: attachment; filename=result.png");
        readfile($filename);
} else { header("HTTP/1.1 404 Not Found"); echo '404 Not Found'.$filename; }

?>