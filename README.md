# SynergySphere - Advanced Team Collaboration Platform (MVP)

SynergySphere is a modern, responsive collaboration tool built to help teams stay organized, communicate effectively, and work smarter together. This MVP focuses on core features like task management, project tracking, and team discussions, with a clean interface that works smoothly on both desktop and mobile.

---

## 🚀 Features

### Core Functionality

* **User Authentication** – Secure sign-up and login
* **Project Management** – Create and track multiple projects
* **Task Management** – Assign tasks with due dates, priorities, and status updates
* **Team Collaboration** – Add members to projects and share responsibilities
* **Real-time Updates** – Live task progress and status changes
* **Responsive Design** – Fully optimized for desktop and mobile

### Highlights

* Create and manage projects with ease
* Assign and track tasks (To Do, In Progress, Done)
* Manage team members and their workload
* Visualize progress at both project and task levels
* Simple search and filtering for quick navigation
* Local data persistence (so your data stays even after a refresh)

---

## 🛠️ Tech Stack

* **Frontend**: React 18 + TypeScript
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Routing**: React Router DOM
* **State Management**: React Context API
* **Storage**: Local Storage (for MVP)
* **Date Handling**: date-fns

---

## 📦 Installation & Setup

### Requirements

* Node.js (v14 or later)
* npm or yarn

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd synergysphere-mvp

# Install dependencies
npm install

# Start the development server
npm start
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

### Demo Login

You can use the following for testing:

* **Email**: [demo@synergysphere.com](mailto:demo@synergysphere.com)
* **Password**: any password

Or simply sign up as a new user.

---

## 🎯 How to Use

1. **Sign Up / Log In** to your account
2. **Create a Project** using the dashboard
3. **Add Tasks** with descriptions, due dates, and priorities
4. **Assign Team Members** to tasks
5. **Track Progress** with clear visual indicators

---

### Project Dashboard

* View all your projects in one place
* Quick statistics and progress overview
* Search and filter projects
* Jump directly to project details

### Task Management

* Create tasks with descriptions and deadlines
* Assign to team members
* Track status (To Do, In Progress, Done)
* Visual progress indicators

### Team Collaboration

* Invite members to projects
* Assign tasks and track individual progress
* Stay updated with real-time changes

---

## 📱 Mobile Experience

The platform is designed mobile-first and works seamlessly on any device:

* Touch-friendly controls
* Clean layouts for smaller screens
* Fast loading and smooth navigation
* Works offline with local storage

---

## 🔧 Development

### Project Structure

```
src/
├── components/       # UI components
├── contexts/         # Context API providers
├── pages/            # Application pages
├── types/            # TypeScript types
├── utils/            # Helper functions
└── App.tsx           # Main entry point
```

### Key Components

* **Layout** – Main app layout with navigation
* **ProjectCard** – Displays project info
* **TaskCard** – Displays individual task
* **CreateProjectModal** – New project form
* **CreateTaskModal** – New task form
* **TaskDetailModal** – Detailed task view/edit

### Data Handling

* Stored in local storage for persistence
* Optimistic UI updates for instant feedback
* Efficient structures for projects, tasks, and users

---

## 🎨 Design Principles

* **Simple Navigation** – Easy to move between projects and tasks
* **Clarity First** – Important information is always visible
* **Consistent Design** – Unified look and feel
* **Accessibility** – Supports keyboard navigation and screen readers
* **Mobile-First** – Designed for phones but scales to desktop

---

## 🚀 What’s Next

This MVP lays the foundation. Future improvements include:

* Real-time collaboration (WebSockets)
* File sharing and document management
* Advanced reporting and analytics
* Integration with calendars and external tools
* Push notifications
* Team chat and direct messaging
* Backend API with database + JWT authentication

