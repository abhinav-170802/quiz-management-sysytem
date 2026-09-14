<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$score = $data['score'] ?? 0;
$total_questions = $data['total_questions'] ?? 10;
$time_taken = $data['time_taken'] ?? 0;
$xp_gained = $data['xp_gained'] ?? 0;
$stars_earned = $data['stars_earned'] ?? 0; // if we want to store stars as XP multiplier or similar

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'User ID is missing.']);
    exit;
}

try {
    $pdo->beginTransaction();

    // 1. Insert Quiz Attempt
    $stmt = $pdo->prepare('INSERT INTO quiz_attempts (user_id, score, total_questions, time_taken) VALUES (?, ?, ?, ?)');
    $stmt->execute([$user_id, $score, $total_questions, $time_taken]);

    // 2. Update User XP and Stats
    // Assuming stars earned are added to a specific column or just calculated in xp. 
    // Wait, the frontend uses "stars" which we can map to the DB. Since the DB requirement doesn't have `stars` column, 
    // we'll update the user's `xp` and `level`.
    $stmt = $pdo->prepare('UPDATE users SET xp = xp + ? WHERE id = ?');
    $stmt->execute([$xp_gained, $user_id]);

    // Calculate new level (1000 XP per rank/level roughly, or just based on frontend logic)
    // We'll leave the complex calculations to frontend or keep this simple.

    $pdo->commit();

    echo json_encode(['success' => true, 'message' => 'Quiz result saved.']);

} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
