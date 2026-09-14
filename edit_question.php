<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id = isset($data['id']) ? (int)$data['id'] : 0;
$q = $data['question'] ?? '';
$o1 = $data['option1'] ?? '';
$o2 = $data['option2'] ?? '';
$o3 = $data['option3'] ?? '';
$o4 = $data['option4'] ?? '';
$ans = isset($data['correct_option']) ? (int)$data['correct_option'] : -1;
$diff = $data['difficulty'] ?? 'easy';
$topic = $data['topic'] ?? 'General';

if ($id <= 0 || empty($q) || empty($o1) || empty($o2) || $ans < 0 || $ans > 3) {
    echo json_encode(['success' => false, 'message' => 'Required fields missing or invalid.']);
    exit;
}

try {
    $stmt = $pdo->prepare('UPDATE questions SET question=?, option1=?, option2=?, option3=?, option4=?, correct_option=?, difficulty=?, topic=? WHERE id=?');
    $stmt->execute([$q, $o1, $o2, $o3, $o4, $ans, $diff, $topic, $id]);
    echo json_encode(['success' => true, 'message' => 'Question updated successfully.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
