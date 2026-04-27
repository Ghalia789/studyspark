# StudySpark

A modern study and task management application built with Next.js. Organize your academic tasks by subject, set priorities, track due dates, and stay on top of your studies with an intuitive interface.

## Features

- **Task Management** - Create, edit, and manage study tasks with title, description, and detailed information
- **Subject Organization** - Organize tasks by subject for better structure and focus
- **Priority Levels** - Set task priority as low, medium, or high to prioritize your workload
- **Due Date Tracking** - Track when tasks are due to stay on schedule
- **Status Tracking** - Mark tasks as completed or pending
- **Today View** - See tasks scheduled for today at a glance
- **Dashboard** - Overview of your study progress and upcoming tasks
- **Subject Management** - Organize and manage your subjects
- **Settings** - Customize your preferences
- **Theme Support** - Toggle between dark and light modes for comfortable studying

## Tech Stack

- **Framework**: Next.js 16.1.4 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Icons**: Lucide React
- **React**: 19.2.3

## Project Structure

```
src/
├── pages/              # Application routes and pages
│   ├── index.tsx       # Home/welcome page
│   ├── dashboard.tsx   # Dashboard overview
│   ├── today.tsx       # Today's tasks view
│   ├── tasks.tsx       # Main task management
│   ├── subjects.tsx    # Subject management
│   ├── settings.tsx    # Settings page
│   └── api/            # API routes
├── components/         # Reusable React components
│   ├── Navbar.tsx      # Sidebar navigation
│   ├── TaskItem.tsx    # Individual task component
│   ├── Modal.tsx       # Modal dialogs
│   ├── Button.tsx      # Button component
│   ├── Input.tsx       # Input fields
│   ├── Textarea.tsx    # Text area component
│   ├── Select.tsx      # Select dropdown
│   ├── Badge.tsx       # Badge labels
│   ├── Card.tsx        # Card containers
│   ├── Alert.tsx       # Alert notifications
│   ├── EmptyState.tsx  # Empty state component
│   └── ThemeToggle.tsx # Dark/light mode toggle
├── assets/             # Icons and illustrations
└── styles/             # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build for production:

```bash
npm run build
```

### Start

Start the production server:

```bash
npm start
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Development

The application uses TypeScript for type safety and Tailwind CSS for styling. All components are built with React and organized in the `src/components` directory. Pages are managed in the `src/pages` directory using Next.js Pages Router.

Dark/light theme support is available through the `ThemeToggle` component, allowing users to customize their viewing experience.
