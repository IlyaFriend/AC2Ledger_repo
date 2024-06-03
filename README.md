# University Faculty Achievements Registry

This project is a prototype of a comprehensive registry designed to manage and showcase the academic and professional achievements of university faculty members. The system offers a user-friendly interface for performing CRUD operations on achievements and supports a detailed hierarchical structure of universities, faculties, and departments.
Key Features
* User Authentication and Authorization: Secure login and role-based access control using JWT.
* CRUD Operations: Easily create, read, update, and delete profiles and achievements.
* Scopus Integration: Automatically import academic publications from Scopus to keep faculty portfolios current.
* University Hierarchy Management: Efficiently manage information at the university, faculty, and department levels.
* Points System: Accurately calculate and update achievement scores based on predefined categories and coefficients.
* Modern Technologies: Built with Nuxt 3, MongoDB, Mongoose, and other state-of-the-art web development tools.

Technologies Used
* Nuxt 3: For both client-side and server-side rendering.
* MongoDB & Mongoose: For flexible and scalable data storage and management.
* @nuxtjs/auth: For handling user authentication and session management.
* API Integration: Scopus API for importing publication data.

Getting Started
* Clone the repository
* Install dependencies: npm install
* Create a MongoDB Atlas instanse, and add a trigger on create, update, and delete achievement (the code is in /app/mongodbAtlas/triggers/achievement_alter_scores_on_create_update_delete.js)
* Configure environment variables in .env file
* Run the application: npm run dev
