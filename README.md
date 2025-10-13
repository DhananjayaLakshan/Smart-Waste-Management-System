# Waste Management System ♻️

## Overview

The **Waste Management System** is a comprehensive web application designed to help users actively monitor their **waste production**, manage **waste collection schedules**, and efficiently handle **payments** for waste management services. It provides a user-friendly interface with features like secure authentication, insightful waste data visualizations, and timely notifications for high waste levels.

---

## Features

* **User Authentication**: Secure sign-up and login functionality to ensure personalized access to waste data.
* **Waste Data Monitoring**: Users can track and view their waste production, which is categorized by type: **organic**, **dry**, and **wet**.
* **Charts and Graphs**: Intuitive visualization of waste production data using **bar** and **pie charts** for easy analysis.
* **Payment Processing**: Functionality for users to calculate and securely make **payments** for waste management services.
* **Alerts for High Waste Levels**: Automated **notifications** (alerts) are sent to users when their recorded waste production exceeds predefined thresholds.

---

## Technologies Used

This project leverages a modern stack for a robust and scalable application:

### Frontend
| Technology | Purpose |
| :--- | :--- |
| **React** | Core JavaScript library for building the user interface. |
| **Flowbite** | UI component library based on Tailwind CSS. |
| **Tailwind CSS** | Utility-first CSS framework for styling. |
| **Chart.js** | Library for generating interactive charts and graphs. |
| **React Hooks** | State management within React components. |
| **Axios** | Promise-based HTTP client for making API requests. |
| **React Router** | Declarative routing for the frontend. |

### Backend
| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment. |
| **Express** | Fast, unopinionated, minimalist web framework for Node.js. |
| **MongoDB** | NoSQL database for flexible data storage. |

### Other Tools
* **SweetAlert2**: Used for generating stylish and responsive notifications/alerts.

---

## Getting Started with Project

Follow these steps to set up and run the Waste Management System on your local machine.

### Prerequisites

Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (which includes npm)
* [MongoDB](https://www.mongodb.com/try/download/community) access (either local or cloud-hosted)

### Installation and Setup

1.  **Clone the Repository**

    Use `git` to clone the project to your local machine:

    ```bash
    git clone <repository_url>
    ```

2.  **Install Dependencies**

    Navigate into the project directory and install all necessary dependencies for both the frontend and backend:

    ```bash
    npm install
    ```

3.  **Run Backend Server**

    Start the backend server by running the following command in the terminal:

    ```bash
    npm run dev
    ```

4.  **Run Frontend Server**

    Open a **new terminal window** and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

    Then, start the frontend development server:

    ```bash
    npm run dev
    ```

### Access the Application

The frontend application should now be running.

* Open your web browser and navigate to: **http://localhost:5173/**

### Login

You can log in as an **admin**, **faculty**, or **student** using the provided credentials (ensure these are set up in your environment or database).
