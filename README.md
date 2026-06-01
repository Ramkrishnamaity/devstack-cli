# devstack-cli

A CLI tool to scaffold production-ready Node.js projects in seconds — no repetitive setup, no boilerplate.

## Usage

```bash
npx devstack-cli
```

Or install globally:

```bash
npm install -g devstack-cli
```

## What it does

Asks you 4 questions and scaffolds a ready-to-run project:

```
? Project name:      my-app
? Framework:         Node.js
? Language:          TypeScript
? Package manager:   pnpm
```

Then copies the template, installs dependencies, and tells you exactly what to run next.

## Available Templates

| Framework | JavaScript | TypeScript |
|-----------|------------|------------|
| Node.js   | ✅          | ✅          |
| React     | 🔜 Soon    | 🔜 Soon    |
| Next.js   | 🔜 Soon    | 🔜 Soon    |

## What's included in Node.js templates

- **Express** with production-ready setup
- **Security** — Helmet, CORS, rate limiting, cache-control headers
- **Validation** — Joi env schema validation
- **Logging** — Morgan + file-based error logs
- **Swagger UI** — auto-generated API docs at `/api-docs`
- **Error handling** — unified `StatusError` class with global handler
- **Structure** — controllers, services, routes, middlewares, models

### TypeScript extras
- Path aliases (`@/`) via tsconfig-paths
- Build with `tsc && tsc-alias`
- Strict mode enabled

### JavaScript extras
- Native Node.js subpath imports (`#`) for clean aliases
- No build step needed

## Project structure (Node.js)

```
src/
├── config/         env.ts + database.ts
├── controllers/    request handlers
├── middlewares/    custom middlewares
├── models/         data models
├── routes/         route definitions
├── services/       business logic
├── swagger/        API documentation
└── utils/
    ├── constants/
    ├── helpers/    StatusError, errorHandler, controller wrapper
    ├── schemas/    Joi validation schemas
    └── types/
```

## License

MIT
