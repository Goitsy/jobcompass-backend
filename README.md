# JobCompass: Job Application Tracking Platform

## Project Overview

JobCompass is a comprehensive web application designed to help job seekers efficiently track and manage their job applications throughout the entire job hunting process. Built with modern web technologies, the platform provides users with powerful tools to organize, monitor, and analyze their job search journey.

## Key Features

- Job Application Tracking

  - Add, edit, and delete job applications
  - Track application status (Applied, Interview, Offer, Rejected)
  - Store detailed job application information

- Analytics Dashboard

  - Visualize job application statistics
  - Track application status distribution
  - Monitor job search progress

- User Authentication

  - Secure user registration and login
  - Firebase authentication integration
  - Protected routes for personalized experience

- Customizable User Experience
  - Dark and light theme modes
  - Personalized user settings
  - Responsive design for multiple devices

## Tech Stack

### Frontend

- React (TypeScript)
- React Router for navigation
- Material-UI for component design
- Axios for API communication
- Chart.js for data visualization

### Backend

- Node.js with Express
- MongoDB for database
- Mongoose for data modeling
- Firebase Authentication
- JWT for secure authentication
- Nodemailer for email notifications

### Additional Technologies

- Cloudinary for image uploads
- Firebase Admin SDK
- Bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Set up environment variables
5. Run the application
   - Frontend: `npm run dev`
   - Backend: `npm run dev`

## Project Structure

```
JobCompass/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── routes/
│   │   └── state/
│
└── backend/
    ├── models/
    ├── routes/
    └── server.js
```

## Future Enhancements

- Job application email reminders
- Integration with job search platforms
- Advanced filtering and search
- More detailed analytics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open-source and available under the License.
