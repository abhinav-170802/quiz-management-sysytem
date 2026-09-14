<?php
header('Content-Type: application/json');

require 'db.php';

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get the JSON POST data
$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Prevent duplicate email
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Email is already registered.']);
    exit;
}

// Also prevent duplicate username (name)
$stmt = $pdo->prepare('SELECT id FROM users WHERE name = ?');
$stmt->execute([$name]);
if ($stmt->fetch()) {
    echo json_encode(['success' => false, 'message' => 'Username is already taken.']);
    exit;
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Insert into users
try {
    $stmt = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$name, $email, $hashed_password]);

    // Send Welcome Email mapping their exclusive Username
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'amitjhadelhi16@gmail.com'; 
        $mail->Password   = 'hgjl dtpz qvvs hqih';      
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('no-reply@dsaarena.com', 'DSA Quiz Arena');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Welcome to DSA Quiz Arena! Here is your Username';
        $mail->Body    = '
            <div style="font-family: sans-serif; text-align: center; padding: 20px; background: #0a0a0f; color: #fff;">
                <h2 style="color: #00a2ff;">Welcome to DSA Quiz Arena!</h2>
                <p>You have successfully registered. Your unique login Username is:</p>
                <h1 style="letter-spacing: 2px; color: #ffd700; background: #222; padding: 10px; display: inline-block; border-radius: 8px;">' . htmlspecialchars($name) . '</h1>
                <p style="color: #888; font-size: 14px; margin-top: 20px;">Use this Username to log in to your account.</p>
            </div>
        ';
        $mail->send();
    } catch (\PHPMailer\PHPMailer\Exception $e) {
        error_log("Welcome Email failed: {$mail->ErrorInfo}");
    }
    
    echo json_encode(['success' => true, 'message' => 'User registered successfully. Welcome email sent.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
