<?php
/**
 * DB IMPEX - Production Form Submission & Lead Processor
 * Handles Contact Us, Quote Modal, and Enquiry Now forms.
 */

header('Content-Type: text/html; charset=utf-8');

$recipient_email = "sales@dbimpex.in";
$company_name = "DB IMPEX";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Honeypot check (anti-spam)
    if (!empty($_POST["website_hp"])) {
        die("Spam detected.");
    }

    // 2. Sanitize and retrieve inputs
    $first_name = isset($_POST['first_name']) ? trim(strip_tags($_POST['first_name'])) : '';
    $last_name  = isset($_POST['last_name']) ? trim(strip_tags($_POST['last_name'])) : '';
    $full_name  = isset($_POST['full_name']) ? trim(strip_tags($_POST['full_name'])) : ($first_name . ' ' . $last_name);
    $company    = isset($_POST['company']) ? trim(strip_tags($_POST['company'])) : (isset($_POST['last_name']) ? trim(strip_tags($_POST['last_name'])) : '');
    $email      = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $telephone  = isset($_POST['telephone']) ? trim(strip_tags($_POST['telephone'])) : '';
    $product    = isset($_POST['product']) ? trim(strip_tags($_POST['product'])) : 'General Inquiry';
    $comments   = isset($_POST['comments']) ? trim(strip_tags($_POST['comments'])) : '';

    // Validation
    $errors = [];
    if (empty($full_name) && empty($first_name)) {
        $errors[] = "Please provide your name.";
    }
    if (empty($telephone) && empty($email)) {
        $errors[] = "Please provide a valid phone number or email address.";
    }

    // 3. Log lead locally to ensure zero data loss
    $lead_data = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN',
        'name' => $full_name,
        'company' => $company,
        'email' => $email,
        'phone' => $telephone,
        'product' => $product,
        'comments' => $comments
    ];

    $log_file = __DIR__ . '/leads_log.json';
    $existing = file_exists($log_file) ? json_decode(file_get_contents($log_file), true) : [];
    if (!is_array($existing)) $existing = [];
    $existing[] = $lead_data;
    @file_put_contents($log_file, json_encode($existing, JSON_PRETTY_PRINT));

    // 4. Send email if valid
    $mail_sent = false;
    if (empty($errors)) {
        $subject = "New Inquiry for DB IMPEX: " . ($product ? $product : "General Inquiry");
        $body = "You have received a new inquiry from the DB IMPEX website:\n\n" .
                "Name: " . $full_name . "\n" .
                "Company: " . $company . "\n" .
                "Phone: " . $telephone . "\n" .
                "Email: " . $email . "\n" .
                "Product/Requirement: " . $product . "\n" .
                "Message:\n" . $comments . "\n\n" .
                "Date: " . date('Y-m-d H:i:s') . "\n";

        $headers = "From: webmaster@dbimpex.in\r\n" .
                   "Reply-To: " . ($email ? $email : "sales@dbimpex.in") . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        @mail($recipient_email, $subject, $body, $headers);
        $mail_sent = true;
    }

    // Check if AJAX request
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        echo json_encode(['success' => empty($errors), 'errors' => $errors]);
        exit;
    }

    // Otherwise render confirmation page
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You | DB IMPEX</title>
        <link rel="stylesheet" href="assets/css/style.css">
        <style>
            .thank-you-box {
                max-width: 600px;
                margin: 5rem auto;
                background: #FFFFFF;
                border: 1px solid #E2E8F0;
                border-radius: 16px;
                padding: 3rem;
                text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            }
            .success-icon {
                width: 64px;
                height: 64px;
                background: #EEF4FF;
                color: #2156DA;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                font-size: 2rem;
            }
        </style>
    </head>
    <body style="background-color: #F8FAFC;">
        <div class="thank-you-box">
            <?php if (empty($errors)): ?>
                <div class="success-icon">✓</div>
                <h2>Thank You, <?= htmlspecialchars($full_name) ?>!</h2>
                <p style="margin: 1rem 0 2rem;">Your inquiry regarding <strong><?= htmlspecialchars($product) ?></strong> has been successfully received. Our security solutions team will contact you shortly.</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <a href="index.html" class="btn btn-primary">Return to Homepage</a>
                    <a href="https://wa.me/918320383785" class="btn btn-accent" target="_blank">Chat on WhatsApp</a>
                </div>
            <?php else: ?>
                <div class="success-icon" style="background: #FEE2E2; color: #DC2626;">!</div>
                <h2>Submission Notice</h2>
                <p style="color: #DC2626; margin: 1rem 0 2rem;"><?= implode('<br>', $errors) ?></p>
                <a href="javascript:history.back()" class="btn btn-secondary">Go Back and Correct</a>
            <?php endif; ?>
        </div>
    </body>
    </html>
    <?php
    exit;
} else {
    header("Location: index.html");
    exit;
}
