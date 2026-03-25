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

## Notes

- This package is workspace-local for now.
- Repositories may consume it through thin local re-export files during the migration period.
- Once the contract surface stabilizes further, it can be versioned and published more formally.
