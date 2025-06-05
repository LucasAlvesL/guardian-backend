# Guardian Backend

## Overview
Guardian Backend is a Node.js-based application designed to manage shelters, resources, and personnel efficiently. It provides robust APIs for authentication, resource registration, and shelter management.

## Functional Resources
- **Authentication**: Secure login and token generation for shelters.
- **Resource Registration**: Add resources with unique latitude and longitude.
- **Shelter Registration**: Register shelters with capacity constraints.
- **Error Handling**: Custom error classes for various scenarios.

## Non-Functional Resources
- **Scalability**: Designed to handle increasing numbers of shelters and resources.
- **Performance**: Optimized database queries using Prisma.
- **Security**: JWT-based authentication and secure environment variable management.
- **Maintainability**: Modular code structure for easy updates and debugging.

## Business Rules
- **Shelter Capacity**: A shelter cannot exceed its defined capacity.
- **Unique Resource Location**: Resources must have unique latitude and longitude.
- **Duplicate Shelter Prevention**: Shelters with the same name and location cannot be registered twice.
- **Authentication Validity**: Only authenticated shelters can access certain resources.

## Features
- **Authentication**: Secure JWT-based authentication for shelters.
- **Resource Management**: Register and manage resources with unique latitude and longitude.
- **Shelter Management**: Register shelters and handle capacity constraints.
- **Error Handling**: Custom error classes for invalid credentials, resource not found, shelter capacity, and duplicate shelter entries.

## Technologies Used
- **Node.js**: Backend runtime.
- **TypeScript**: Type-safe development.
- **Prisma**: Database ORM.
- **Vitest**: Testing framework.
- **Docker**: Containerization.

## Project Structure
```
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── vite.config.mts
├── generated/
│   ├── prisma/
│   └── runtime/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── vitest-environment-prisma/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── @types/
│   ├── env/
│   ├── errors/
│   ├── infra/
│   ├── lib/
│   └── modules/
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Docker
- PostgreSQL

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/LucasAlvesL/guardian-backend.git
   cd guardian-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required variables (refer to `src/env/index.ts`).

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the application:
   ```bash
   npm start
   ```

### Running Tests
Run unit tests using Vitest:
```bash
npm run test
```