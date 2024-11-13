# Nextjs Test

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Project Structure](#project-structure)
- [Stay in touch](#stay-in-touch)
- [License](#license)

---

## Installation

```bash
# install dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run dev
```

## Features

The main features of the project:

- Image uploading with preview
- Category management

## Project Structure

```
.
├── app
│   ├── favicon.ico               # Favicon for the application, displayed in the browser tab
│   ├── fonts/                    # Contains custom font files
│   │   ├── GeistMonoVF.woff      # Geist Mono font in WOFF format
│   │   └── GeistVF.woff          # Geist font in WOFF format
│   ├── globals.css               # Global CSS styles applied across the app
│   ├── hooks/                    # Custom React hooks for reusable logic
│   │   └── useConfirmDialog.ts   # Hook for managing confirmation dialogs
│   ├── layout.tsx                # Main layout component wrapping all pages
│   ├── models/                   # TypeScript models and interfaces for data structures
│   │   ├── category.ts           # Model representing category data
│   │   ├── image.ts              # Model representing image data
│   │   └── util.ts               # Utility types or interfaces
│   ├── (pages)/                  # Dynamic pages for routing
│   │   ├── categories/           # Category-related pages
│   │   │   ├── category-form.tsx # Form for creating or editing a category
│   │   │   ├── loading.tsx       # Loading component shown during category page load
│   │   │   └── page.tsx          # Category listing or main page
│   │   └── images/               # Image-related pages
│   │       ├── image-form.tsx    # Form for uploading or editing an image
│   │       ├── loading.tsx       # Loading component shown during image page load
│   │       └── page.tsx          # Image listing or main page
│   ├── page.tsx                  # Root page component (main entry page)
│   ├── theme/                    # Theme configuration files
│   │   └── theme.tsx             # Defines custom theme settings (e.g., colors, typography)
│   └── utils/                    # Utility functions for the app
│       └── localStorage.ts       # Helper functions for working with local storage
├── components                    # Reusable UI components
│   ├── ConfirmDialog.tsx         # Component for a confirmation dialog
│   ├── ImageGallery.tsx          # Component for displaying a gallery of images
│   ├── ImageUploadWithPreview.tsx # Image upload component with preview functionality
│   ├── Layout.tsx                # Layout wrapper component for page consistency
│   ├── Modal.tsx                 # Reusable modal component
│   ├── ReactQueryProvider.tsx    # Setup provider for React Query
│   └── Table.tsx                 # Table component for displaying data in a tabular format
├── lib                           # External libraries and helper modules
│   ├── axiosInstance.ts          # Configured Axios instance for API requests
│   ├── category/                 # Modules for category-related API functions
│   │   ├── categoriesApi.ts      # API functions to interact with category data
│   │   └── categories.ts         # Helper functions for category-related logic
│   └── images.ts                 # Helper functions for image-related logic
├── next.config.mjs               # Configuration file for Next.js
├── next-env.d.ts                 # TypeScript environment settings for Next.js
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Dependency lock file for consistent installs
├── postcss.config.mjs            # Configuration for PostCSS (used with Tailwind CSS)
├── project-tree.txt              # Contains the file tree structure of the project
├── README.md                     # Main project documentation file
├── tailwind.config.ts            # Tailwind CSS configuration file
└── tsconfig.json                 # TypeScript configuration file for the project

```

## Stay in touch

- Author - [Marah Daher]()

## License

Next is [MIT licensed](LICENSE).
