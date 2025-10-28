# CDWPHYSIO: Medical Data Warehouse for Bone Fracture Studies

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-000000?style=flat&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Biome](https://img.shields.io/badge/Biome-000000?style=flat&logo=biome&logoColor=white)](https://biomejs.dev/)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-000000?style=flat&logo=auth&logoColor=white)](https://better-auth.com/)

## Overview

CDWPHYSIO is a specialized Medical Data Warehouse (Clinical Data Warehouse for Physiotherapy) website focused on bone
fracture studies. It serves as a professional repository for medical professionals to access, share, and collaborate on
bone fracture-related data, including studies, authors, images, and other critical information. The platform integrates
with external APIs from similar medical repositories to fetch and aggregate data, ensuring a comprehensive and
up-to-date resource.

Key functionalities include user authentication with admin approval for access, study creation and uploading by
authorized authors, and an admin dashboard for managing users and content. This application is built with modern web
technologies to ensure scalability, security, and a seamless user experience.

## Features

- **Data Repository**: Access to bone fracture studies, including authors, detailed reports, images, and related
  metadata fetched from external APIs of similar medical websites.
- **User Authentication**: Secure sign-in and registration using Better Auth. New users require admin approval before
  gaining access to the data warehouse.
- **Study Creation and Upload**: Signed-in authors can create new studies, upload documents/images, and share them with
  other verified medical users for collaborative research.
- **Admin Dashboard**: Dedicated admin page for approving user access, managing studies, and performing other
  administrative tasks.
- **Responsive UI**: Modern, accessible interface built with Shadcn UI components and styled with Tailwind CSS for
  optimal viewing on all devices.
- **Database Management**: Efficient data handling with Prisma ORM connected to MongoDB for storing user data, studies,
  and approvals.

## Tech Stack

The application leverages a robust set of technologies for development, styling, authentication, database management,
and code quality. Below is a comprehensive list of the stack used, including those mentioned and additional ones
integrated for completeness:

- **Next.js**: A React framework for building server-side rendered and static web applications, providing excellent
  performance, SEO, and developer experience through features like API routes and dynamic routing.
- **TypeScript**: A statically typed superset of JavaScript that adds type safety, improving code reliability,
  maintainability, and catching errors early during development.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development, allowing inline styling with customizable
  classes for responsive and consistent designs.
- **Shadcn UI**: A collection of reusable, customizable UI components built on top of Radix UI and Tailwind CSS,
  enabling quick prototyping of accessible and themeable interfaces.
- **Better Auth**: A modern authentication library for Next.js applications, handling user sign-up, login, sessions, and
  security features like JWT and OAuth with minimal configuration.
- **Prisma**: An ORM (Object-Relational Mapping) tool for Node.js and TypeScript, simplifying database queries,
  migrations, and schema management while supporting MongoDB as the backend.
- **MongoDB**: A NoSQL database for flexible, scalable storage of unstructured data like studies, images, and user
  profiles, integrated seamlessly with Prisma.
- **Biome**: A fast, all-in-one toolchain for JavaScript and TypeScript projects, serving as a linter (replacing ESLint)
  and formatter to enforce code style, catch bugs, and improve code quality.

Additional tools and libraries not explicitly mentioned but integrated:

- **React**: The core JavaScript library for building user interfaces, powering the component-based architecture in
  Next.js.
- **Node.js**: The runtime environment for executing JavaScript on the server side, essential for running the Next.js
  application and Prisma.
- **Git**: Version control system for tracking changes and collaborating on the codebase.
- **Vercel (Deployment)**: Recommended platform for deploying Next.js applications, offering seamless integration,
  CI/CD, and global edge network for fast performance.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```
   git clone https://github.com/luxacta/cdwphysio.git
   cd cdwphysio
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the necessary variables (e.g., MongoDB connection string, Better
   Auth secrets, API keys for external data sources):
   ```
   DATABASE_URL="mongodb://..."
   BETTER_AUTH_SECRET="your-secret-key"
   EXTERNAL_API_KEY="your-api-key-for-bone-fracture-data"
   ```

4. **Run Database Migrations**:
   ```
   npx prisma migrate dev
   ```

5. **Start the Development Server**:
   ```
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Registration and Access**: Users register via the sign-up page. Access to the data warehouse is granted only after
  admin approval from the admin dashboard.
- **Fetching Data**: The app integrates with external APIs (e.g., from medical repositories like PubMed or similar) to
  pull bone fracture studies. Configure API keys in `.env`.
- **Creating Studies**: Logged-in authors can navigate to the "Create Study" page to upload new content.
- **Admin Functions**: Admins log in to the `/admin` route to approve users, review uploads, and manage the repository.

For production deployment, use Vercel or a similar platform. Ensure MongoDB is hosted on a service like MongoDB Atlas
for scalability.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

Use Biome for linting and formatting: `npm run lint` or `npm run format`.

## License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

For questions or support, contact **[luxacta@hotmail.com](mailto:luxacta@hotmail.com)**.
