# Course Selling App

Welcome to the Course Selling App! This Next.js project allows users to explore and manage online courses. Below, you'll find an overview of the technologies used and the key features of the app.

## Technologies Used

- **Next.js**: A React framework for building server-rendered React applications.
- **React**: A JavaScript library for building user interfaces.
- **Material-UI (MUI)**: A popular React UI framework for designing visually appealing web applications.
- **Recoil**: A state management library for managing the global state of your application.
- **Middleware**: Custom middleware to enhance the functionality of the application.
- **Cookie-Based Authentication**: Implements user authentication using JSON Web Tokens (JWT) and cookies for a secure login experience.
- **MongoDB**: A NoSQL database used to store and manage course and user data.
- **Typescript**: To avoid any type errors which can lead to project breakage.

## Features

### User Authentication

- Sign up and log in using secure authentication mechanisms.
- Utilizes JSON Web Tokens (JWT) for cookie-based authentication.

### Admin Dashboard

- Admin users can sign up and log in with special privileges.
- Admins can edit and add new courses to the platform.
- Course details include title, instructor, description, and more.

### Middleware for Authorization

- Custom middleware ensures proper authorization for specific actions.
- Control access to admin features based on user roles.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository.
2. Install the required dependencies using `npm install` or `yarn install`.
3. Set up your MongoDB database and configure the necessary credentials in a .env file.
4. Start the development server using `npm run dev` or `yarn dev`.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests for enhancements, new features, and bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to adapt this template to accurately describe your project's features and technologies. Make sure to provide instructions for running the project locally and include any other relevant information that could benefit users and contributors.
