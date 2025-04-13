# Bilal Khalil Khankhail - Personal Portfolio

This is a modern, responsive personal portfolio website built with Next.js, showcasing Bilal Khalil Khankhail's skills, experience, and projects as a Frontend Engineer.

## Project Overview

This portfolio website includes:

- **Multi-language Support**: Content in both English and Urdu
- **Interactive UI**: Modern design with animations, transitions, and hover effects
- **Responsive Layout**: Fully responsive design that works on all devices
- **Key Sections**:
  - Home/Landing page
  - Skills showcase with categorized technology expertise
  - Professional experience with detailed work history
  - Projects gallery with filtering by technology
  - Contact section with form and social links

## Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Styling**: TailwindCSS, CSS animations
- **UI Components**: Custom components with ShadCN UI
- **Accessibility**: ARIA-compliant components for screen reader support
- **Animations**: Custom animations and transitions using MagicUI components

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts including local custom fonts.

## Project Structure

- `app/`: Main application pages
  - `page.tsx`: Home page with all sections
  - `projects/`: Projects gallery with filtering
- `components/`: Reusable components
  - `CustomComponents/`: Custom project-specific components
  - `magicui/`: Animation and UI effect components
  - `sections/`: Main content sections (Home, Skills, Experience, etc.)
  - `ui/`: Base UI components (Input, Dialog, Button, etc.)
- `public/`: Static assets including SVGs and images
- `lib/`: Utility functions and shared resources

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
