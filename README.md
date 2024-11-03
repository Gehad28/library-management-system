# Library Management System

## Overview

This project is an Angular-based web application designed to facilitate the management of library operations. It utilizes RESTful APIs for seamless communication with a Django backend.

*The Backend is implemented by [Rana Essam](https://github.com/RanaEssam03) in [Library-Management-System](https://github.com/RanaEssam03/Library-Management-System/tree/main/backend)*

## Demo


https://github.com/user-attachments/assets/6ec207a5-0e6d-4c2d-b0a0-e2daa7059899



## API Integration

The application leverages the following RESTful API endpoints to perform various operations:

- **Retrieve All Books:** `GET /get-all-books`
- **Retrieve Specific Book:** `GET /get-book/:id`
- **Delete a Book:** `DELETE /delete-book/:id`
- **Add a New Book:** `POST /add-book`, `Body: { title: '', author: ''}`
- **Borrow a Book:** `PUT /borrow-book/:id`
- **Return a Book:** `PUT /return-book/:id`

## Styling

The application is styled using Angular Material, providing a modern and responsive user experience.

## Getting Started

To set up the application locally, follow these steps after running the backend server from [https://github.com/RanaEssam03/Library-Management-System/tree/main/backend](https://github.com/RanaEssam03/Library-Management-System/tree/main/backend):

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Change into the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install the necessary dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200` to view the application.
