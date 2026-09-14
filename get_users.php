<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

try {
    // Strict column bounds discarding password hashes scaling bandwidth efficiency exclusively filtering admins
    $stmt = $pdo->query("
        SELECT u.id, u.name, u.email, u.xp, u.level, u.streak, u.status, u.created_at,
               (SELECT COUNT(*) FROM quiz_attempts a WHERE a.user_id = u.id) as attempts
        FROM users u 
        WHERE u.role = 'user' 
        ORDER BY u.xp DESC LIMIT 200
    ");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Provide micro-caching window strictly controlling real-time spamming queries targeting leaderboards natively
    header("Cache-Control: max-age=15, public");
    echo json_encode(['success' => true, 'users' => $users]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
