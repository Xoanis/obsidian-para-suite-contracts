# Obsidian PARA Suite Contracts

`obsidian-para-suite-contracts` is the shared public-contract layer for the distributed Obsidian plugin workspace.

Current scope:

- Telegram plugin public API contracts
- PARA Core consumer-facing public API contracts

Current goal:

- keep one source of truth for cross-plugin types
- reduce contract drift between repositories
- support gradual migration from duplicated local type files to shared contracts

## Current Consumers

- [obsidian-telegram-bot](C:/Users/petro/OneDrive/Документы/codex_projects/obsidian/obsidian-telegram-bot)
- [obsidian-expense-manager](C:/Users/petro/OneDrive/Документы/codex_projects/obsidian/obsidian-expense-manager)

## Package Shape

- source lives in `src/`
- publishable artifacts are emitted to `dist/`
- public entry points are:
  - `obsidian-para-suite-contracts`
  - `obsidian-para-suite-contracts/telegram`
  - `obsidian-para-suite-contracts/para-core`
  - `obsidian-para-suite-contracts/finance-intake`

## Development

Install dependencies:

```powershell
npm install
```

Type-check the package:

```powershell
npm run check
```

Build the publishable `dist/` output:

```powershell
npm run build
```

## Notes

- This package is workspace-local for now.
- Repositories may consume it through thin local re-export files during the migration period.
- The package now emits publishable `dist/` entry points so consumers can stay aligned with a future standalone release model.
