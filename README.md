# 🏠 RealEstate Hub

A modern real estate platform built with Next.js and Express, designed to connect property buyers, sellers, and real estate agents in one seamless application.

## 📋 Features

- **Property Listings**: Browse comprehensive property listings with detailed information and high-quality images
- **Advanced Search**: Filter properties by location, price range, property type, and amenities
- **User Authentication**: Secure signup/login for buyers, sellers, and agents
- **Property Management**: For sellers and agents to add, edit, and manage property listings
- **Favorites & Saved Searches**: Allow users to save favorite properties and search criteria
- **Appointment Scheduling**: Book property viewings with real-time availability
- **Messaging System**: Direct communication between buyers, sellers, and agents
- **Interactive Maps**: View property locations with integrated mapping
- **Mortgage Calculator**: Estimate monthly payments based on price, down payment, and interest rate

## 🛠️ Tech Stack

### Frontend
- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Query**: Data fetching and cache management
- **Mapbox**: Interactive property location maps

### Backend
- **Express**: Node.js web application framework for the API
- **MongoDB**: NoSQL database for storing property and user data
- **Mongoose**: MongoDB object modeling for Node.js
- **JSON Web Token (JWT)**: For secure authentication
- **Multer**: Handling multipart/form-data for image uploads
- **Socket.IO**: Real-time messaging functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/realestate-hub.git
cd realestate-hub
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In server directory, create .env file
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# In client directory, create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

4. Start development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd ../client
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
realestate-hub/
├── client/                   # Next.js frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Page layouts
│   │   ├── pages/            # Next.js pages
│   │   ├── services/         # API services
│   │   ├── styles/           # Global styles
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Utility functions
│   ├── .env.local            # Environment variables
│   └── next.config.js        # Next.js configuration
├── server/                   # Express backend
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middlewares/      # Express middlewares
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   └── app.js            # Express app setup
│   ├── .env                  # Environment variables
│   └── server.js             # Entry point
└── README.md                 # Project documentation
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user information

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create a new property listing
- `PUT /api/properties/:id` - Update a property listing
- `DELETE /api/properties/:id` - Remove a property listing

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/properties` - Get properties by user

### Favorites
- `GET /api/favorites` - Get user's favorite properties
- `POST /api/favorites/:propertyId` - Add property to favorites
- `DELETE /api/favorites/:propertyId` - Remove property from favorites

### Appointments
- `GET /api/appointments` - Get user's appointments
- `POST /api/appointments` - Create a new appointment
- `PUT /api/appointments/:id` - Update an appointment
- `DELETE /api/appointments/:id` - Cancel an appointment

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 🚢 Deployment

### Backend
The Express backend can be deployed to:
- Heroku
- DigitalOcean
- AWS Elastic Beanstalk

### Frontend
The Next.js frontend can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact
- Project Link: [https://github.com/yourusername/realestate-hub](https://github.com/yourusername/realestate-hub)
- Developer: [your-email@example.com](mailto:your-email@example.com)