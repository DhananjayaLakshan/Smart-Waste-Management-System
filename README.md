# Fortified Waste Management System (OWASP Top 10 Mitigation)

[![Snyk Vulnerabilities](https://snyk.io/test/github/DhananjayaLakshan/SSD_Assignment/badge.svg)](https://snyk.io/test/github/DhananjayaLakshan/SSD_Assignment)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository hosts a fortified and secured version of the **Smart Waste Management System**. Following a comprehensive security audit using the **Snyk** tool, our team identified and remediated critical vulnerabilities aligned with the OWASP Top 10 framework. The goal was to significantly enhance the project's security posture, ensuring data integrity, secure authentication, and resilience against common web attacks.

The original, vulnerable project can be found here: [Smart-Waste-Management-System](https://github.com/DhananjayaLakshan/Smart-Waste-Management-System).

---

## 🛡️ Security Enhancements Implemented

This project addresses several critical vulnerability categories. The following is a summary of the fixes implemented based on the security audit.

### 1. Identification and Authentication Failures

To prevent unauthorized access and credential theft, we implemented:
* **Strong Password Policies**: Enforced complex password requirements (length, uppercase, lowercase, number, special character) using Joi schema validation.
* **Secure Password Hashing**: Integrated `bcrypt` to hash and salt user passwords before storing them in the database, preventing plaintext credential exposure.
* **Safe Password Comparison**: Used `bcrypt.compare()` for password verification to protect against timing attacks.

### 2. Security Misconfiguration

We hardened the application's configuration to minimize attack surfaces:
* **Secure HTTP Headers**: Added the `helmet` middleware to set various security-related HTTP headers, protecting against common attacks like clickjacking and XSS.
* **Strict CORS Policy**: Configured a strict Cross-Origin Resource Sharing (CORS) policy to only allow requests from whitelisted frontend URLs, preventing unauthorized cross-origin access.
* **Payload Size Limiting**: Set a `10kb` request body size limit to prevent Denial of Service (DoS) attacks via large payloads.
* **Global Error Handling**: Implemented a global error handler that prevents leaking sensitive stack traces and internal error details to the client in a production environment.

### 3. Injection

To protect against query manipulation and parameter-based attacks:
* **NoSQL Injection Prevention**: Used the `express-mongo-sanitize` middleware to strip any user-supplied data containing prohibited characters (like `$` or `.`) from request bodies, query strings, and parameters.
* **HTTP Parameter Pollution (HPP) Prevention**: Integrated the `hpp` middleware to prevent attackers from overriding parameters by creating a whitelist of parameters that are allowed to appear multiple times.

### 4. Insecure Design

The initial database schema design was improved to enforce data integrity and security from the ground up:
* **Robust Schema Validation**: Enforced `required` fields, email format validation using regex, and string normalization (`trim`, `lowercase`) in the Mongoose User schema.
* **Uniqueness Constraints**: Ensured the email field is unique to prevent duplicate account creation.
* **Secure Defaults**: Set a default non-privileged role (`isAdmin: false`) to prevent unauthorized privilege escalation.

### 5. Software and Data Integrity Failures

To ensure application availability and protect against resource exhaustion attacks:
* **Rate Limiting**: Implemented `express-rate-limit` to throttle requests. This includes a global limit for all endpoints and a stricter limit specifically for authentication routes to prevent brute-force attacks.

### 6. Vulnerable and Outdated Components

We addressed risks associated with third-party dependencies:
* **Dependency Management**: Updated the MongoDB connection logic to use a modern, singleton pattern, improving performance, reliability, and compatibility with the latest driver versions.
* **Code Modernization**: Refactored database connection code to use modern JavaScript class syntax for better maintainability and error handling.

### 7. Security Logging and Monitoring Failures

To improve application stability and ensure graceful failure:
* **Graceful Shutdown**: Implemented listeners for `SIGTERM`, `unhandledRejection`, and `uncaughtException` to ensure the server shuts down gracefully without crashing abruptly, preventing data loss and service downtime.

---

## 🛠️ Vulnerability Analysis Tool

The vulnerabilities in the original project were identified using **Snyk**, a developer security platform that helps scan and fix vulnerabilities in code, dependencies, and containers.



---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

* Node.js (v14 or higher)
* npm
* MongoDB instance (local or cloud)

### Installation

1.  **Clone the Repository**
    ```sh
    git clone [https://github.com/DhananjayaLakshan/SSD_Assignment.git](https://github.com/DhananjayaLakshan/SSD_Assignment.git)
    ```

2.  **Install Backend Dependencies**
    ```sh
    cd SSD_Assignment
    npm install
    ```

3.  **Install Frontend Dependencies**
    ```sh
    cd frontend
    npm install
    ```

4.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following variables:
    ```
    PORT=5001
    MONGO_URL=<YOUR_MONGODB_CONNECTION_STRING>
    FRONTEND_URL=http://localhost:5173
    JWT_SECRET=<YOUR_JWT_SECRET_KEY>
    ```

5.  **Run the Application**
    * **Start the Backend Server (from the root directory):**
        ```sh
        npm run dev
        ```
    * **Start the Frontend Server (from the `frontend` directory):**
        ```sh
        npm run dev
        ```

6.  **Access the Application**
    Open your browser and navigate to `http://localhost:5173/`.

---

## 💻 Technologies Used

* **Frontend**: React, Flowbite, Tailwind CSS, Chart.js, Axios, SweetAlert2
* **Backend**: Node.js, Express.js
* **Database**: MongoDB, Mongoose
* **Security**: Helmet, Express-Rate-Limit, HPP, Express-Mongo-Sanitize, Bcrypt

---

## Acknowledgments

* This project was completed as part of the **Secure Software Development (SE4030)** module at the **Sri Lanka Institute of Information Technology (SLIIT)**.
* Credit to the original author of the Smart Waste Management System.
