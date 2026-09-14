<?php
header('Content-Type: application/json');
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$questions = $data['questions'] ?? [];

if (empty($questions) || !is_array($questions)) {
    echo json_encode(['success' => false, 'message' => 'No valid questions array mapped from payload.']);
    exit;
}

try {
    $pdo->beginTransaction();
    $stmt = $pdo->prepare('INSERT INTO questions (question, option1, option2, option3, option4, correct_option, difficulty, topic) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    
    $count = 0;
    foreach ($questions as $q) {
        $stmt->execute([
            $q['question'] ?? 'Dummy Component',
            $q['option1'] ?? 'Option A',
            $q['option2'] ?? 'Option B',
            $q['option3'] ?? 'Option C',
            $q['option4'] ?? 'Option D',
            isset($q['correct_option']) ? (int)$q['correct_option'] : 0,
            $q['difficulty'] ?? 'easy',
            $q['topic'] ?? 'General'
        ]);
        $count++;
    }
    
    $pdo->commit();
    echo json_encode(['success' => true, 'message' => "$count questions successfully imported into the registry."]);
} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Transaction explicitly crashed tracking: ' . $e->getMessage()]);
}
?>
