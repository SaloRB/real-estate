# 🏠 RENTIFUL

A modern real estate platform built with Next.js and Express, designed to connect property buyers, sellers, and real estate agents in one seamless application.

## 📋 Features

- **Property Listings**: Browse comprehensive property listings with detailed information and high-quality images
- **Advanced Search**: Filter properties by location, price range, property type, and amenities
- **User Authentication**: Secure authentication handled by AWS Cognito and Amplify
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
- **AWS Amplify**: Authentication UI components and integration with Cognito

### Backend
- **Express**: Node.js web application framework for the API
- **Prisma**: Modern ORM for database access
- **PostgreSQL**: Relational database for storing property and user data
- **AWS Cognito**: User authentication and authorization service
- **Multer**: Handling multipart/form-data for image uploads
- **Socket.IO**: Real-time messaging functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (local installation)
- AWS account (for Cognito and Amplify services)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/rentiful.git
cd rentiful
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
DATABASE_URL="postgresql://username:password@localhost:5432/rentiful_db"
AWS_REGION=your_aws_region
AWS_USER_POOL_ID=your_cognito_user_pool_id
AWS_USER_POOL_WEB_CLIENT_ID=your_cognito_client_id
PORT=5000

# In client directory, create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_AWS_REGION=your_aws_region
NEXT_PUBLIC_USER_POOL_ID=your_cognito_user_pool_id
NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID=your_cognito_client_id
```

4. Set up the database
```bash
# In server directory
npx prisma migrate dev --name init
```

5. Start development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd ../client
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
rentiful/
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
│   ├── prisma/
│   │   ├── schema.prisma     # Prisma schema
│   │   └── migrations/       # Database migrations
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── middlewares/      # Express middlewares
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Utility functions
│   │   └── app.js            # Express app setup
│   ├── .env                  # Environment variables
│   └── server.js             # Entry point
└── README.md                 # Project documentation
```

## 🔄 API Endpoints

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

## 🔐 Authentication with AWS Cognito

RENTIFUL uses AWS Cognito for secure user authentication:

1. User registration and login are handled by AWS Cognito
2. AWS Amplify provides UI components for authentication
3. JWT tokens from Cognito are used to authenticate API requests
4. Express middleware validates tokens for protected routes
5. User data is synchronized between Cognito and the PostgreSQL database

### Implementing Authentication

```javascript
// In client/src/pages/_app.js
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: true
  }
});
```

## 💾 Database with Prisma

RENTIFUL uses Prisma ORM with PostgreSQL:

1. Prisma schema defines the data model
2. Migrations handle database schema changes
3. Prisma Client provides type-safe database access

### Example Prisma Schema

```prisma
// In server/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String        @id @default(uuid())
  cognitoId     String        @unique
  email         String        @unique
  name          String?
  phone         String?
  role          UserRole      @default(RENTER)
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  properties    Property[]
  favorites     Favorite[]
  appointments  Appointment[]
}

model Property {
  id            String        @id @default(uuid())
  title         String
  description   String
  price         Float
  address       String
  city          String
  state         String
  zipCode       String
  bedrooms      Int
  bathrooms     Int
  sqft          Int
  propertyType  PropertyType
  status        ListingStatus @default(AVAILABLE)
  images        String[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  owner         User          @relation(fields: [ownerId], references: [id])
  ownerId       String
  favorites     Favorite[]
  appointments  Appointment[]
}

enum UserRole {
  ADMIN
  AGENT
  OWNER
  RENTER
}

enum PropertyType {
  HOUSE
  APARTMENT
  CONDO
  TOWNHOUSE
}

enum ListingStatus {
  AVAILABLE
  PENDING
  RENTED
}

model Favorite {
  user        User      @relation(fields: [userId], references: [id])
  userId      String
  property    Property  @relation(fields: [propertyId], references: [id])
  propertyId  String
  createdAt   DateTime  @default(now())

  @@id([userId, propertyId])
}

model Appointment {
  id          String    @id @default(uuid())
  date        DateTime
  status      AppointmentStatus @default(PENDING)
  notes       String?
  user        User      @relation(fields: [userId], references: [id])
  userId      String
  property    Property  @relation(fields: [propertyId], references: [id])
  propertyId  String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum AppointmentStatus {
  PENDING
  CONFIRMED
  CANCELED
  COMPLETED
}
```

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
- AWS Elastic Beanstalk
- AWS EC2
- Heroku
- DigitalOcean

### Frontend
The Next.js frontend can be deployed to:
- Vercel (recommended)
- AWS Amplify
- Netlify

### Database
The PostgreSQL database can be deployed to:
- AWS RDS
- Heroku Postgres
- DigitalOcean Managed Databases

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact
- Project Link: [https://github.com/yourusername/rentiful](https://github.com/yourusername/rentiful)
- Developer: [your-email@example.com](mailto:your-email@example.com)