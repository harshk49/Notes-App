# Notes App

The **Notes App** is a simple and intuitive application built using the **MERN** stack (MongoDB, Express, React, Node.js). This application allows users to easily create, edit, delete, and manage notes in a user-friendly environment. It is designed with a clean and responsive interface using **Tailwind CSS**, ensuring that it works well across different devices.

## Screenshots
![Screenshot 2024-09-21 183057](https://github.com/user-attachments/assets/a64339b5-a845-4ab4-b784-6b8b0123a70b)
![Screenshot 2024-09-21 183007](https://github.com/user-attachments/assets/8a14310e-0105-482e-8f0f-a7402dba08ce)
![Screenshot 2024-09-21 183001](https://github.com/user-attachments/assets/3e0c7374-e94b-4fb3-a25e-2af7f9b1bee3)
![Screenshot 2024-09-21 182955](https://github.com/user-attachments/assets/1cf077fe-1196-44aa-86f7-176b3da4d0d7)
![Screenshot 2024-09-21 182926](https://github.com/user-attachments/assets/42146cbe-b049-48ae-b01a-e45ca673616c)






## Features

- User registration and authentication
- Create, edit, delete, and pin notes
- Search functionality for notes
- Responsive design using Tailwind CSS

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (either locally or MongoDB Atlas)
- **Git** (optional, for cloning the repository)
- **React** (included as part of the frontend setup; ensure that your development environment can handle React applications)


### Setup MongoDB

1. **Create a MongoDB Database**:
   - If using MongoDB Atlas, sign in and create a new cluster. Follow the instructions to set up your database and user credentials.
   - If using a local MongoDB instance, ensure it is running.

2. **Connection String**:
   - Copy your connection string (for MongoDB Atlas, it looks something like this):
     ```
     mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
     ```
   - Replace `<username>`, `<password>`, and `<dbname>` with your actual database credentials.

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/harshk49/Notes-App
   cd notes-app/backend
2. **Install Dependencies**:
   ```bash
   npm install
3. **Configure Environment Variables:**:
   Create a .env file in the backend directory and add the following:
   ```bash
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ```
   In the config.json file, replace the connectionString with your MongoDB connection string.
4. **Start the Backend Server**:
```bash
node index.js
```
The server will run on http://localhost:8000.

### Frontend Setup
1. **Navigate to the Frontend Directory**:
```bash
cd notes-app/frontend
```
2. **Install Dependencies**:
```bash
npm install
```
3. **Start the Frontend**:
```bash
npm run dev
```
The frontend will be available at http://localhost:5173.

## Usage
1. **Register a New Account**:
Navigate to the /signup page and fill in your details to create a new account.
2. **Log In**:
Go to the /login page and enter your credentials.
3. **Manage Notes**:
Once logged in, you can create, edit, delete, and search your notes.

# License
This project is licensed under the MIT License - see the LICENSE file for details.


Feel free to copy and paste this directly into your `README.md` file! Let me know if you need any more help!


