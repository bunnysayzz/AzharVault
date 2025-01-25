# Azhar Vault

Azhar Vault is a web application designed to provide a secure and organized space for managing and storing sensitive information. The application is built using Next.js, a popular React-based framework for building server-rendered, statically generated, and performance-optimized websites and applications.

## Features

* Secure login and authentication using a password stored in environment variables
* Organized layout for easy navigation and access to stored information
* Integration with Cloudinary for secure and scalable media storage
* Responsive design for optimal user experience across various devices

## Technologies Used

* Next.js for server-rendered and statically generated pages
* React for building reusable UI components
* TypeScript for static type checking and better code maintainability
* Geist for font optimization and customization
* React Hot Toast for displaying notifications and feedback to users
* Cloudinary for media storage and management

## Environment Variables

The application uses environment variables for storing sensitive information such as API keys and secrets. These variables are defined in the `.env.local` file and are used throughout the application.

* `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: The cloud name for Cloudinary integration
* `CLOUDINARY_API_KEY`: The API key for Cloudinary integration
* `CLOUDINARY_API_SECRET`: The API secret for Cloudinary integration
* `NEXT_PUBLIC_SITE_PASSWORD`: The password for accessing the application

## Getting Started

To get started with the application, clone the repository and install the dependencies using npm or yarn. Then, start the development server using `npm run dev` or `yarn dev`. The application will be available at `http://localhost:3000`.

## Contributing

Contributions to the Azhar Vault project are welcome. If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.
