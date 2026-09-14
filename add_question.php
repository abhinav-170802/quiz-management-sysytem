<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Typical add_question payload needed
$question = $data['question'] ?? '';
$option1 = $data['option1'] ?? '';
$option2 = $data['option2'] ?? '';
$option3 = $data['option3'] ?? '';
$option4 = $data['option4'] ?? '';
$correct_option = isset($data['correct_option']) ? (int)$data['correct_option'] : -1;
$difficulty = $data['difficulty'] ?? 'easy';
$topic = $data['topic'] ?? 'General';

if (empty($question) || empty($option1) || empty($option2) || $correct_option < 0 || $correct_option > 3) {
    echo json_encode(['success' => false, 'message' => 'Required fields are missing or invalid.']);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO questions (question, option1, option2, option3, option4, correct_option, difficulty, topic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $stmt->execute([$question, $option1, $option2, $option3, $option4, $correct_option, $difficulty, $topic]);
    
    echo json_encode(['success' => true, 'message' => 'Question added successfully.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
