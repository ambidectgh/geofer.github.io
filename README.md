<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Informational Website</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f8ff;
            color: #333;
        }
        header {
            background-color: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
            position: relative;
            animation: fadeIn 1s forwards;
        }
        h1 {
            margin: 0;
        }
        nav {
            margin: 20px 0;
        }
        nav a {
            color: white;
            margin: 0 15px;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        nav a:hover {
            color: #ffd700;
        }
        .container {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            animation: slideIn 1s forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        footer {
            text-align: center;
            padding: 10px 0;
            background-color: #007bff;
            color: white;
            position: relative;
            animation: fadeIn 1s 0.5s forwards;
        }
    </style>
</head>
<body>
    <header>
        <h1>Welcome to Our Website</h1>
        <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    <div class="container">
        <h2>About Us</h2>
        <p>We are dedicated to providing the best services to our customers.</p>
        <h2>Our Services</h2>
        <p>Explore our range of services designed to meet your needs.</p>
    </div>
    <footer>
        <p>&copy; 2026 Your Company. All Rights Reserved.</p>
    </footer>
</body>
</html>
