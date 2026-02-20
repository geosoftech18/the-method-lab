# Prisma & MongoDB Atlas Setup Guide

## Prerequisites
1. MongoDB Atlas account (free tier available)
2. Node.js installed

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (username and password)
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ablr?retryWrites=true&w=majority"
```

Replace:
- `<username>` with your MongoDB username
- `<password>` with your MongoDB password
- `<cluster>` with your cluster name

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Push Schema to Database

```bash
npm run prisma:push
```

This will create the collections in your MongoDB database.

### 6. (Optional) Open Prisma Studio

To view and manage your data:

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555`

## API Routes

The following API routes are available:

- `GET /api/programs` - Get all programs
- `POST /api/programs` - Create a new program
- `GET /api/programs/[id]` - Get a single program
- `PUT /api/programs/[id]` - Update a program
- `DELETE /api/programs/[id]` - Delete a program

## Database Schema

The schema includes:
- **Program** - Main program entity
- **Faculty** - Faculty members (related to programs)
- **FAQ** - Frequently asked questions (related to programs)
- **Testimonial** - Testimonials (related to programs)
- **Certificate** - Certificate information (one per program)

All related entities are automatically deleted when a program is deleted (cascade delete).

## Notes

- Images are stored as base64 strings in the database
- All dates are stored as strings (ISO format recommended)
- The schema uses MongoDB ObjectId for IDs

