<body>

<h1>myBank</h1>

<h2>Description</h2>
<p>myBank is a robust mock banking application that enables users to manage accounts, perform transfers, request loans, check balances, and view sortable transactions. Key features include:</p>
<ul>
    <li><strong>Account Management</strong>: Create and manage user accounts.</li>
    <li><strong>Secure Transactions</strong>: Perform money transfers and request loans.</li>
    <li><strong>Password Security</strong>: Passwords are encrypted using bcrypt, ensuring they are stored securely and remain inaccessible to administrators.</li>
    <li><strong>User Verification</strong>: Utilizes httpOnly cookies to store JSON Web Tokens (JWT) for secure user verification during login and transactions.</li>
    <li><strong>Session Management</strong>: A session timer logs users out and clears cookies after 5 minutes of inactivity.</li>
    <li><strong>Comprehensive CRUD Operations</strong>: Manage account creation, deletion, money transfers, and loan requests, all seamlessly integrated and stored in MongoDB Atlas.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
    <li><strong>Frontend</strong>: React, Axios</li>
    <li><strong>Backend</strong>: Node.js, Express</li>
    <li><strong>Database</strong>: MongoDB Atlas, mongoose</li>
    <li><strong>Authentication & Security</strong>: JSON Web Token (JWT), bcrypt</li>
</ul>

<h2>Features</h2>
<ul>
    <li><strong>Account Creation and Management</strong>: Users can create new accounts and manage existing ones.</li>
    <li><strong>Password Encryption</strong>: Ensures secure storage of user passwords using bcrypt.</li>
    <li><strong>Secure User Sessions</strong>: HTTP-only cookies are used to store JWTs for secure user sessions.</li>
    <li><strong>Automatic Logout</strong>: Users are automatically logged out after 5 minutes of inactivity to enhance security.</li>
    <li><strong>CRUD Operations</strong>: Supports creating, reading, updating, and deleting account information and transactions.</li>
    <li><strong>Sortable Transactions</strong>: View and sort transaction history by various criteria.</li>
</ul>




</body>
