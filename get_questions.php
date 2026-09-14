<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

try {
    // Limit strictly to utilized frontend keys reducing HTTP bandwidth
    $stmt = $pdo->query('SELECT id, question, option1, option2, option3, option4, correct_option, difficulty, topic FROM questions ORDER BY difficulty, id');
    $allQuestions = $stmt->fetchAll();

    // The frontend groups questions by mode ('Beginner', 'Intermediate', 'Advanced', 'Competitive Battles')
    // and then by level. A level has 10 questions.
    // Since we are adding questions via admin, we can format them for the frontend dynamically.
    // Let's assume difficulty maps to Modes, and we group every 10 into a level array.

    $formatted = [
        'Beginner' => [],
        'Intermediate' => [],
        'Advanced' => [],
        'Competitive Battles' => []
    ];

    $tempGroups = [
        'Beginner' => [],
        'Intermediate' => [],
        'Advanced' => [],
        'Competitive Battles' => []
    ];

    foreach ($allQuestions as $q) {
        $mode = 'Beginner';
        if ($q['difficulty'] === 'medium') $mode = 'Intermediate';
        if ($q['difficulty'] === 'hard') $mode = 'Advanced';
        
        // We structure each question to match the frontend expectations
        $frontendQ = [
            'id' => $q['id'],
            'q' => $q['question'],
            'options' => [$q['option1'], $q['option2'], $q['option3'], $q['option4']],
            'answer' => (int)$q['correct_option'], // 0-indexed
            'topic' => $q['topic']
        ];
        
        $tempGroups[$mode][] = $frontendQ;
    }

    // Now chunk them into levels (10 questions per level)
    foreach ($tempGroups as $mode => $questionsArr) {
        if (count($questionsArr) > 0) {
            $formatted[$mode] = array_chunk($questionsArr, 10);
        } else {
            $formatted[$mode] = [];
        }
    }

    // Enable explicit client-side caching mechanism for 10 minutes reducing database load entirely
    header("Cache-Control: max-age=600, public");
    echo json_encode(['success' => true, 'questions' => $formatted]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
