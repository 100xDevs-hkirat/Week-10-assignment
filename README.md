# Course Selling App

Welcome to the Course Selling App! This Next.js project offers a platform for users to explore, edit, and add online courses. Below, you'll find an overview of the technologies used and the main features of the app.

## Technologies Used

- **Next.js**: A React framework for building server-rendered React applications.
- **React**: A JavaScript library for building user interfaces.
- **Material-UI (MUI)**: A popular React UI framework for designing visually appealing web applications.
- **Recoil**: A state management library for managing complex application state in a simple way.
- **Middleware**: Custom middleware for handling authentication and authorization.
- **JWT (JSON Web Tokens)**: Cookie-based authentication using JWT for secure user sessions.
- **MongoDB**: A NoSQL database for storing and managing course and user data.
- **TypeScript**: A statically typed superset of JavaScript for improved development efficiency and code quality.
- **Server-Side Rendering (SSR)**: Providing initial page load performance and SEO benefits.
- **... (Add any other technologies you've used)**

## Features

### User Authentication

- **Sign Up and Sign In**: Users can register and log in to their accounts securely.
- **JWT-Based Auth**: Cookie-based JWT authentication for maintaining user sessions.
- **Admin Access**: Admins have special privileges to manage courses.

### Course Management

- **Add New Courses**: Admins can add new courses with details like title, description, imageLink and price.
- **Edit Courses**: Admins have the ability to edit course details and make updates.
- **Course Listings**: Users can view a list of available courses with their descriptions without authentication.

### Server-Side Rendering

- **SSR Enabled**: Utilize server-side rendering for improved page load performance and SEO benefits.
- **Public Course Listing**: Allow users to see course listings without requiring sign-up.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository.
2. Install the required dependencies using `npm install` or `yarn install`.
3. Set up your MongoDB database and configure the necessary credentials.
4. Create a `.env.local` file and provide the required environment variables (e.g., JWT secret, MongoDB connection).
5. Start the development server using `npm run dev` or `yarn dev`.

## Contributing

Contributions to enhance this project are welcome! Feel free to open issues and pull requests for bug fixes, new features, or improvements.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to tailor this template to match your project's details accurately. Make sure to replace the placeholder text with the correct information about
