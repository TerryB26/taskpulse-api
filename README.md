# taskpulse-api
A scalable, TypeScript-based RESTful API for task management, built with Express, Prisma, and PostgreSQL. Features include user authentication, task CRUD operations, tagging, and filtering/sorting.

## Prerequisites
- **Node.js**: Version 22+ (currently tested on 18.18.2, upgrade recommended for submission)
- **PostgreSQL**: A running instance (e.g., local or cloud-hosted)
- **Thunder Client**: VS Code extension for testing (or Postman/Insomnia)

- Install: `npm install`
- Set `.env` with `DATABASE_URL`, `JWT_SECRET`, `PORT`
- Migrate: `npx prisma migrate dev`
- Run: `npm run dev`
- Test:  `thunder-collection_TaskPulse-API.json` into Thunder Client its located on API Collection folder