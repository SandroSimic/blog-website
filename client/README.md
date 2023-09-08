# MERN Stack Blog Project with React and Vite

[![GitHub license](https://img.shields.io/github/license/yourusername/your-repo-name)](https://github.com/yourusername/your-repo-name/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/your-repo-name)](https://github.com/yourusername/your-repo-name/issues)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/your-repo-name)](https://github.com/yourusername/your-repo-name/stargazers)

Welcome to the MERN Stack Blog Project with React and Vite! This repository contains the source code for a full-stack blog application built using the MERN stack, React as the frontend library, and Vite as the build tool. You can use this project as a template for creating your own blog or as a learning resource to understand MERN stack development with Vite.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization.
- Create, read, update, and delete blog posts.
- User-friendly and responsive UI built with React.
- Comment system for blog posts.
- Search functionality.
- User profile management.
- Deployment-ready configuration.
- RESTful API with Express.js.
- MongoDB database for data storage.
- Lightning-fast development with Vite.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your machine.
- MongoDB installed locally or access to a MongoDB database server.
- A text editor or IDE of your choice.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SandroSimic/blog-website.git
Navigate to the project directory:

bash
Copy code
cd your-repo-name
Install server dependencies:

bash
Copy code
cd server
npm install
Install client dependencies:

bash
Copy code
cd client
npm install
Usage
Configure your environment variables:

Create a .env file in the server directory and set the following variables:

makefile
Copy code
PORT=3001
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
Replace your-mongodb-uri with your MongoDB connection URI.

Replace your-secret-key with your JWT secret key for authentication.

Start the server:

bash
Copy code
cd ../server
npm start
Start the client with Vite:

bash
Copy code
cd ../client
npm run dev
Open your web browser and access the application at http://localhost:3000.
