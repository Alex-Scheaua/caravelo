# Caravelo App

## Tech Stack
- Nuxt 4 (SPA mode, SSR disabled, static preset)
- Vue 3 with `<script lang="ts" setup>`
- Capacitor 8 (iOS)
- SCSS (scoped styles, `api: 'modern'`)
- Vitest + @nuxt/test-utils/runtime + happy-dom
- yarn (canonical package manager)

## Commands
- Dev: `yarn dev`
- Build: `yarn build`
- Generate static: `yarn generate`
- Test: `yarn vitest`
- Test single file: `npx vitest path/to/test`

## Project Structure
```
pages/          — page components (index.vue)
components/     — PascalCase .vue components
composables/    — shared state & logic (useState-based)
server/api/     — kebab-case Nitro API routes
types/          — global TypeScript types (no barrel exports)
assets/         — icons/ (inline SVG components), index.scss (global reset)
```

## Conventions

### State Management
- Composables use Vue's `useState()` for reactive state, NOT module-level `ref()`.
- Example: `const count = useState('counter', () => 0)`
- Composables are the single source of shared state — no Pinia.

### Imports
- Use `~/` alias when importing from a different folder.
- Use `./` relative imports for files in the same folder.
- Composables are auto-imported by Nuxt — never import them explicitly.

### Components
- PascalCase filenames (`GeneralButton.vue`, `UsersList.vue`).
- Use type-based `defineProps<{ ... }>()` with `withDefaults` where applicable.
- BEM class naming is a hard convention (`block__element--modifier`).
- `<script lang="ts" setup>` (lang before setup).

### Testing
- Prefer `mountSuspended` from `@nuxt/test-utils/runtime` over `shallowMount`.
- Vitest globals enabled — do NOT import `describe`, `it`, `expect`, `vi`.
- Component tests co-located next to the component: `ComponentName.test.ts`.
- Never modify production components to accommodate tests — mock dependencies in test files instead.

### API Routes (Nitro)
- kebab-case filenames in `server/api/` (`get-users.ts`, `update-flights-quota.ts`).
- Return data directly from the handler.
- Existing routes: `getUsers`, `updateFlightsQuota`, `getFlightQuotaReasons`, `getQuotaChanges`, `createUser`, `deleteUser`.
- Deleting a user requires cascading: delete `quota_changes` first, then the user row.

### Modals
- `TheModal` — the only modal shell. Renders dynamic content via `<component :is="currentEntry.component" v-bind="currentEntry.props" />`.
- Content components rendered inside `TheModal`: `EditFlightsContent`, `AddUserForm`, `DeleteUserConfirm`.
- `useModal` composable manages a stack of entries via `useState<ModalEntry[]>('modalStack', ...)`.
- To open a modal: `openModal({ component: MyContent, props: { ... } })`.
- `closeModal()` pops the last entry from the stack.
- `isModalOpen` is `true` when the stack is non-empty.
- Props are optional and only passed when needed.

### Types
- Global types: define in `types/` files, do NOT barrel-export via `index.ts`.
- Types are auto-available via `~/types/...` imports.

### Styling
- CSS units: `rem` (not px, em, etc.).
- Scoped styles: `<style lang="scss" scoped>`.
- Folder names and API routes: kebab-case.

### Git
- Commit format: `feat|bug|chore/ticket-no commit-message`
- Branch naming: `ticket-no` (e.g. `1234`)
