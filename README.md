# AI Mock Interview Platform

An advanced AI-powered mock interview application built with Next.js, designed to help users prepare for job interviews through realistic, interactive sessions.

## 🚀 Features

- **AI-Powered Interviews**: Interactive interview sessions driven by OpenAI agents.
- **Smart Resume Parsing**: Automatically extracts and analyzes resume details using AI.
- **Real-time Interaction**: Video and audio-enabled interview environment.
- **Comprehensive Dashboard**: Manage interviews, view history, and track progress.
- **Secure Authentication**: Integrated with Clerk for robust user management.
- **Responsive Design**: Beautiful UI built with Tailwind CSS and Radix UI.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Radix UI, Lucide React
- **Database**: MongoDB (Mongoose)
- **Authentication**: Clerk
- **AI/ML**: OpenAI API (`@openai/agents`)
- **File Storage**: Cloudinary
- **Form Handling**: React Hook Form + Zod

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (Atlas or local)
- Clerk account
- OpenAI API key
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mock-interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (Clerk)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   WEBHOOK_SECRET=your_clerk_webhook_secret

   # AI (OpenAI)
   OPENAI_API_KEY=your_openai_api_key

   # Storage (Cloudinary)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/app` - Next.js App Router pages and API routes
- `/components` - Reusable UI components
- `/lib` - Utility functions and configurations
- `/models` - Mongoose database models
- `/services` - Business logic and AI services
- `/schemas` - Zod validation schemas

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
