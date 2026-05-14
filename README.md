# Wanderlust 🌍

**Wanderlust** is a full-stack travel listing platform where adventurers can discover, share, and review unique stays across the globe — from mountain hideaways to beachside retreats. Built from scratch as a personal full-stack development project.

---

## Features

- 🔐 **User Authentication** — Secure signup, login, and logout using Passport.js Local Strategy
- 🏡 **Full Listing CRUD** — Create, browse, edit, and delete your own travel listings
- 🖼️ **Cloud Image Uploads** — Listings support image uploads via Cloudinary + Multer
- ⭐ **Review System** — Authenticated users can post and delete reviews with ratings
- 🏷️ **Category Tagging** — Listings can be tagged (Beach, Mountain, Camping, Heritage, etc.)
- 🛎️ **Amenity Highlights** — Hosts can specify amenities like WiFi, Parking, Pool, Kitchen
- 📱 **Responsive UI** — Mobile-friendly design using EJS templates
- 🛡️ **Ownership Protection** — Only listing/review owners can edit or delete their content
- 🗃️ **Persistent Sessions** — Sessions stored in MongoDB via connect-mongo

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose ODM |
| Authentication | Passport.js (Local Strategy) |
| Templating | EJS + EJS-Mate |
| File Uploads | Multer + Cloudinary |
| Validation | Joi (server-side) |
| Sessions | express-session + connect-mongo |
| Deployment | Render.com |

---

## Project Structure

```
wanderlust/
├── controllers/        # Route handler logic (listings, reviews, users)
├── models/             # Mongoose schemas (Listing, Review, User)
├── routes/             # Express route files
├── views/              # EJS templates and partials
├── public/             # Static assets — CSS, JS, images
├── utils/              # ExpressError class and wrapAsync helper
├── middleware.js        # isLoggedIn, isOwner, isReviewAuthor checks
├── app.js              # App entry point and middleware setup
├── cloudConfig.js      # Cloudinary configuration
├── schema.js           # Joi validation schemas
├── package.json        # Project metadata and dependencies
└── .env                # Secret keys — never commit this file
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account for image storage

### Installation

```bash
# 1. Clone this repository
git clone https://github.com/your-username/wanderlust.git
cd wanderlust

# 2. Install all dependencies
npm install

# 3. Create your environment file
touch .env
```

Populate `.env` with your credentials:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_custom_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

```bash
# 4. Run the development server
node app.js
```

Open `http://localhost:8080` in your browser.

---

## API Endpoints

### Listings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/listings` | All listings | No |
| GET | `/listings/new` | New listing form | Yes |
| POST | `/listings` | Create listing | Yes |
| GET | `/listings/:id` | Listing detail | No |
| GET | `/listings/:id/edit` | Edit form | Yes (owner) |
| PUT | `/listings/:id` | Update listing | Yes (owner) |
| DELETE | `/listings/:id` | Delete listing | Yes (owner) |

### Reviews

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/listings/:id/reviews` | Add review | Yes |
| DELETE | `/listings/:id/reviews/:rid` | Delete review | Yes (author) |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/signup` | Register account |
| GET/POST | `/login` | Login |
| GET | `/logout` | End session |

---

## Validation

Server-side validation is handled by **Joi** in `schema.js`. Key rules:

- Listing title: 5–100 characters, required
- Description: 10–1000 characters, required
- Price: ₹1 to ₹1,00,000 per night
- Category: must be one of the defined enum values
- Amenities: array, max 10 items
- Review rating: integer 1–5
- Review comment: 5–500 characters
- Optional trip type: Solo, Couple, Family, Group, Business

---

## Deployment on Render

1. Push your code to a GitHub repository
2. Create a new **Web Service** on [Render.com](https://render.com)
3. Set the following environment variables in Render's dashboard:
   - `ATLASDB_URL`, `SECRET`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`, `NODE_ENV=production`
4. Set build command: `npm install`
5. Set start command: `node app.js`

The app reads `process.env.PORT` automatically for Render's dynamic port.

---

## Planned Improvements

- [ ] Map view integration using Mapbox GL
- [ ] Search and filter by category, country, or price range
- [ ] Booking and availability calendar
- [ ] User profile pages with listing history
- [ ] Wishlist / save listings feature

---

## Author

**Your Name**
GitHub: [@your-username](https://github.com/your-username)

---

## License

ISC License — free to use for personal and educational purposes.
