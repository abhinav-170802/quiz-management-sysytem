<?php
require 'db.php';
try {
    $pw = password_hash('123456', PASSWORD_DEFAULT);
    $pdo->query("UPDATE users SET password='$pw' WHERE name='admin'");
    file_put_contents('hash.txt', $pw);
    echo "Done";
} catch (Exception $e) { echo $e->getMessage(); }
?>
