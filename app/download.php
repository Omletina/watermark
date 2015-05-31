<?php

$filename = '';
if (isset($_GET['file'])) $filename = $_GET['file'];

if (file_exists($filename)) {
        header("Content-type: application/x-download");
        header("Content-Disposition: attachment; filename=$filename");
        readfile($filename);
} else { header("HTTP/1.1 404 Not Found"); echo '404 Not Found'.$filename; }

?>