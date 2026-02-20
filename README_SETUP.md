# MongoDB Atlas & Prisma Setup Guide

## Prerequisites
1. MongoDB Atlas account (free tier available at https://www.mongodb.com/cloud/atlas)
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
4. Whitelist your IP address (or use `0.0.0.0/0` for development - not recommended for production)
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
- `<cluster>` with your cluster name (e.g., `cluster0.xxxxx`)

**Important:** Never commit the `.env` file to version control!

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

This generates the Prisma Client based on your schema.

### 5. Push Schema to Database

```bash
npm run prisma:push
```

This will create the collections in your MongoDB database based on the Prisma schema.

### 6. (Optional) Open Prisma Studio

To view and manage your data visually:

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555` where you can view and edit your data.

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
- **Faq** - Frequently asked questions (related to programs)
- **Testimonial** - Testimonials (related to programs)
- **Certificate** - Certificate information (one per program)

All related entities are automatically deleted when a program is deleted (cascade delete).

## Notes

- Images are stored as base64 strings in the database
- All dates are stored as strings (ISO format recommended)
- The schema uses MongoDB ObjectId for IDs
- The admin panel now uses MongoDB instead of localStorage

## Troubleshooting

### Connection Issues
- Make sure your IP address is whitelisted in MongoDB Atlas
- Verify your connection string is correct
- Check that your username and password are URL-encoded if they contain special characters

### Prisma Client Issues
- Run `npm run prisma:generate` after any schema changes
- Make sure your `.env` file is in the root directory
- Verify `DATABASE_URL` is set correctly

