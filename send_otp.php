<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow from anywhere, or specify the frontend URL
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? null;

if (!$email) {
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit();
}

// Check PHPMailer files
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Generate 6 digit OTP
$otp = (string) rand(100000, 999999);

// Store OTP in session mapping to email (expires in 5 mins)
$_SESSION['otp_data'] = [
    'email' => $email,
    'otp' => $otp,
    'expires' => time() + 5 * 60 // 5 minutes from now
];

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; 
    $mail->SMTPAuth   = true;
    $mail->Username   = 'amitjhadelhi16@gmail.com'; // Your Gmail address
    $mail->Password   = 'hgjl dtpz qvvs hqih';      // Your App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // Recipients
    $mail->setFrom('no-reply@dsaarena.com', 'DSA Quiz Arena');
    $mail->addAddress($email);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Your Verification Code';
    $mail->Body    = '
        <div style="font-family: sans-serif; text-align: center; padding: 20px; background: #0a0a0f; color: #fff;">
            <h2 style="color: #00a2ff;">DSA Quiz Arena</h2>
            <p>Use the following 6-digit code to verify your registration:</p>
            <h1 style="letter-spacing: 5px; color: #ffd700; background: #222; padding: 10px; display: inline-block; border-radius: 8px;">' . $otp . '</h1>
            <p style="color: #888; font-size: 12px; margin-top: 20px;">This code expires in 5 minutes.</p>
        </div>
    ';
    $mail->AltBody = "Welcome to the DSA Quiz Arena! Your verification code is: {$otp}. It will expire in 5 minutes.";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'OTP sent successfully']);
} catch (Exception $e) {
    error_log("Message could not be sent. Mailer Error: {$mail->ErrorInfo}");
    echo json_encode(['success' => false, 'message' => 'Failed to send OTP email']);
}
?>
