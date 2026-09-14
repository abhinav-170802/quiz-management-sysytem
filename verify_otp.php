<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? null;
$otp = $input['otp'] ?? null;

if (!$email || !$otp) {
    echo json_encode(['success' => false, 'message' => 'Email and OTP required']);
    exit();
}

// Ensure session OTP data exists for this email
if (!isset($_SESSION['otp_data']) || $_SESSION['otp_data']['email'] !== $email) {
    echo json_encode(['success' => false, 'message' => 'OTP not requested or expired']);
    exit();
}

$storedData = $_SESSION['otp_data'];

if (time() > $storedData['expires']) {
    unset($_SESSION['otp_data']); // Clean up
    echo json_encode(['success' => false, 'message' => 'OTP has expired']);
    exit();
}

if ($storedData['otp'] === $otp) {
    unset($_SESSION['otp_data']); // OTP consumed
    echo json_encode(['success' => true, 'message' => 'OTP verified successfully']);
} else {
    http_response_code(400); // Bad Request to match fetch handling
    echo json_encode(['success' => false, 'message' => 'Invalid OTP']);
}
?>
