<?php
header('Content-Type: application/json');
// Add cache-control to prevent repeated requests from slamming DB (cache for 60s)
header("Cache-Control: max-age=60, public");
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

try {
    // Top 50 users based on XP
    $stmt = $pdo->query('
        SELECT u.id, u.name, u.xp, u.status,
               (SELECT COUNT(*) FROM quiz_attempts a WHERE a.user_id = u.id) as attempts
        FROM users u 
        WHERE u.role = "user" 
        ORDER BY u.xp DESC 
        LIMIT 50
    ');
    $leaderboard = $stmt->fetchAll();
    
    echo json_encode(['success' => true, 'leaderboard' => $leaderboard]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
