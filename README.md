# QuickRide - SmartCampus Transit System 🚌

QuickRide is a smart, responsive, and full-featured campus shuttle management system. It combines a React.js frontend and Node.js backend in a single project to handle shuttle bookings, wallet management, and admin controls for university campuses.

---

## 🚀 Features

### ✅ User Features
- Register, Login, Logout
- Update/View Profile
- Book Trips (select shuttle, route, date)
- Cancel Trips with auto refund
- View Trip History
- Wallet: View & Recharge

### ✅ Admin Panel
- View all registered users
- Manage Routes (Add, Update, Delete, View)
- Manage Shuttles (Add, Update, Delete, View)
- Recharge User Wallets
- View All Bookings

### ✅ Trip Booking & Wallet Management
- Auto fare deduction during trip booking
- Check shuttle availability before booking
- Admin/User wallet recharge
- Cancel trips with automatic wallet refund

### ✅ Security & Validation
- JWT-based authentication
- Redis token blacklisting on logout
- Input validation (email, password strength, trip data)
- Role-based access control (User/Admin)
- Password reset with email domain restriction (@glbitm.ac.in)

---

## 🧰 Tech Stack

| Layer        | Technology                   |
| ------------ | ---------------------------- |
| Frontend     | React.js, Tailwind CSS       |
| State Mgmt   | React Context API / Redux    |
| Backend      | Node.js, Express.js          |
| Database     | MongoDB + Mongoose           |
| Auth         | JWT + Bcrypt                 |
| Caching      | Redis                        |
| API Testing  | Postman                      |

---

## 📦 Project Structure

quickride/
├── public/                     # Frontend static files
│   └── index.html
├── src/                        # Frontend React app
│   ├── assets/                 # Images, icons, fonts
│   ├── features/               # Feature-based modular folders
│   │   ├── authentication/     # Login, Register components
│   │   ├── user/               # Profile, Wallet, TripHistory, UpcomingTrips
│   │   ├── admin/              # Admin dashboard, user management
│   │   ├── booking/            # Trip booking components
│   │   ├── route/              # Add/View/Update/Delete routes
│   │   ├── shuttle/            # Add/View/Update/Delete shuttles
│   │   ├── trip/               # Trip analytics
│   │   └── wallet/             # Wallet view & recharge
│   ├── responsiveCSS/          # Custom responsive styles
│   │   └── responsive.css
│   ├── App.css                 # Global component styling
│   ├── App.jsx                 # Root component with routing
│   ├── index.css               # Base styles
│   └── main.jsx                # Vite entry point
├── backend/                    # Node.js backend
│   ├── controllers/            # Business logic
│   │   ├── adminFunctionalities.js
│   │   ├── bookingControllers.js
│   │   ├── routeFunctionalitiesImplementation.js
│   │   ├── shuttleFunctions.js
│   │   └── userAuthenticationFunctions.js
│   ├── middleware/             # Auth & role-based access
│   │   ├── adminMiddleware.js
│   │   └── userMiddleware.js
│   ├── models/                 # Mongoose schemas
│   │   ├── booking.js
│   │   ├── route.js
│   │   ├── shuttle.js
│   │   └── user.js
│   ├── routes/                 # Express routers
│   │   ├── adminRouter.js
│   │   ├── authRouter.js
│   │   ├── bookingRouter.js
│   │   ├── routeRouter.js
│   │   └── shuttleRouter.js
│   ├── utils/                  # Helper functions (validation, etc.)
│   │   └── validateUsers.js
│   └── config/                 # DB and Redis config
│       ├── mongo.js
│       └── redis.js
├── .env                        # Environment variables (MongoDB URL, JWT key, Redis URL, etc.)
├── package.json                # Project dependencies & scripts
└── README.md                   # Project documentation
