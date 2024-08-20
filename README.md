# AI-Powered Flashcard Generator

## Overview

AI-Powered Flashcard Generator is a web application that allows users to create customized flashcards using artificial intelligence. This project leverages cutting-edge technologies to provide a seamless, efficient, and user-friendly experience for students, professionals, and lifelong learners.

## Features

- **AI-Generated Flashcards**: Utilizes OpenAI's GPT models to create relevant and accurate flashcards from user-provided text.
- **User Authentication**: Secure sign-up and login functionality powered by Clerk.
- **Database Storage**: Firebase integration for storing user data and flashcard sets.
- **Payment Integration**: Stripe payment processing for premium features or subscriptions.
- **Responsive Design**: Built with Next.js for a smooth, fast, and responsive user interface.

## Tech Stack

- **Frontend**: Next.js (React framework)
- **Backend**: Node.js
- **Authentication**: Clerk
- **Database**: Firebase
- **AI Integration**: OpenAI API
- **Payment Processing**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account
- OpenAI API key
- Stripe account
- Clerk account

### Installation

1. Clone the repository:https://github.com/aduuuna/AI-FlashCard-Stripe
2. Navigate to the project directory: cd flashcard-saas
3. Install dependencies:npm install
4. Set up environment variables. 
Create a `.env.local` file in the root directory and add the following:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key

5. Run the development server:npm run dev.
6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Sign up or log in using Clerk authentication.
2. Navigate to the flashcard creation page.
3. Enter the text you want to create flashcards from.
4. Click "Generate Flashcards" to use AI to create your flashcard set.
5. Review, edit, or save your flashcards.
6. Access your saved flashcards from your dashboard.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


## Acknowledgements

- OpenAI for providing the AI model
- Clerk for authentication services
- Firebase for database solutions
- Stripe for payment processing
- Next.js team for the amazing React framework

## Screenshots

