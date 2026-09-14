<?php
header('Content-Type: application/json');

require 'db.php';

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$username = trim($data['username'] ?? '');
$password = $data['password'] ?? '';
$roleCheck = $data['role'] ?? 'user';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required.']);
    exit;
}

try {
    // Check if user exists by explicit Username
    $stmt = $pdo->prepare('SELECT id, name, email, password, role, xp, status FROM users WHERE name = ? AND role = ?');
    $stmt->execute([$username, $roleCheck]);
    $user = $stmt->fetch();

    if ($user) {
        if ($user['status'] === 'banned') {
            echo json_encode(['success' => false, 'message' => 'This account has been banned.']);
            exit;
        }

        // Standard user or admin password check
        if (password_verify($password, $user['password'])) {
            // Remove password from response
            unset($user['password']);
            
            // For admins, we can use 123456 as a backdoor if it's explicitly needed according to existing logic, 
            // but password_verify handles it securely now. Assuming admin password is set to '123456' properly hashed in DB.

            echo json_encode([
                'success' => true, 
                'message' => 'Login successful.',
                'user' => $user
            ]);
        } else {
            // Check for hardcoded admin plain text bypass if needed, but it's better to stick to securely hashed. 
            // We seeded admin in schema.sql with hashed '123456'.
            echo json_encode(['success' => false, 'message' => 'Invalid password.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Account not found or invalid role.']);
    }

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
