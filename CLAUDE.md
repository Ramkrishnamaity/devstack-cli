# DevStack CLI

CLI tool to scaffold production-ready Node.js, React, and Next.js projects.

## Project Structure

```
src/               CLI source (ESM, "type": "module")
  index.js         entry point
  cli.js           inquirer prompts
  scaffold.js      copies template + installs deps
templates/
  node-ts/         Node.js + TypeScript ✅
  node-js/         Node.js + JavaScript ✅
  react-ts/        🔜 coming soon
  react-js/        🔜 coming soon
  nextjs-ts/       🔜 coming soon
  nextjs-js/       🔜 coming soon
```

## Running Locally

```bash
pnpm dev       # runs src/index.js
```

## Key Decisions

- CLI uses ESM (`"type": "module"`) — use `import/export` everywhere
- Install uses `--ignore-scripts` to avoid pnpm v11 `@scarf/scarf` build error
- React + Next.js templates show "coming soon" and exit cleanly

## node-ts template

- Path aliases: `@/` via `tsconfig-paths` (dev) + `tsc-alias` (build)
- Build: `tsc && tsc-alias`
- Uniform response: `{ status: bool, message: string }`

## node-js template

- Path aliases: `#` via Node.js built-in subpath imports (`"imports"` in package.json)
- `#/` prefix is INVALID in Node.js — always use `#something` not `#/something`
- No build step needed

## Template package.json

Both node templates include: express@5, helmet, cors, morgan, cookie-parser, express-rate-limit, joi, moment, swagger-ui-express, dotenv
