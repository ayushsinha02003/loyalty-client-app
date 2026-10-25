# Frontend Technical Reference

**Status:** As implemented in this repository  
**Application:** React Native client

## Runtime and package stack

Values below are taken from `package.json`:

- React Native `0.86.0`
- React `19.2.3`
- TypeScript `^5.8.3`
- `react-native-safe-area-context` `^5.5.2`
- `react-native-svg` `^15.15.5`
- `@react-native-vector-icons/material-design-icons` `^13.1.2`
- Node.js engine requirement `>= 22.11.0`

The project exposes Android, iOS, Metro, Jest, and ESLint scripts. Jest is configured with one basic app-render test in `__tests__/App.test.tsx`.

## Structure and responsibilities

```text
App.tsx
src/
  assets/images/                 Bundled logo, onboarding illustrations, stamp art
  components/
    admin/                       Admin metrics, activity, actions, bottom bar
    button/                      Customer/admin role selector button
    cards/                       Loyalty card and stamp progress card
    common/                      Customer bottom bar, header, screen container
    input/                       Form input and password field
    loyalty/                     Static “how it works” steps
    searchBar/                   Search input presentation
    text/                        Shared text wrapper
  constants/colors.ts            Small shared palette
  docs/                           Frontend documentation
  screens/
    auth/                         Splash, login, and sign-up
    home/                         Customer and admin home screens
    my-cards/                     Customer card list
    onboarding/                   Three-slide introduction
    profile/                      Sample customer profile
    rewards/                      Local reward list and filters
    search/                       Placeholder search screen
    ScreenAccessScreen.tsx        Development screen picker
```

## App composition and navigation

`App.tsx` composes the application under `SafeAreaProvider`, selects a status-bar style from the system color scheme, and uses React `useState` to switch between Splash, Onboarding, Login, SignUp, and `AppContent`.

`AppContent` uses the `ScreenId` union from `ScreenAccessScreen` and local state for the selected screen and active customer tab. Bottom bars and admin tab callbacks are implemented directly in `App.tsx`. There is no navigation package in `package.json`; navigation state is not persisted or deep-linkable. The screen picker is currently the default destination after the initial login callback.

## Data and service boundaries

No API client, `fetch`/Axios call, Supabase SDK, storage client, or data service is present in the frontend source. Screens use literal sample values and component-local React state. There are no shared domain/API types or environment-specific API configuration in this repository.

As a result:

- Form submit callbacks only change screens.
- Reward filtering and claiming are local UI state.
- Home, cards, profile, and admin values are sample content.
- No authentication token or user session is stored.
- No server response can currently be treated as authoritative because none is requested.

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) for the frontend data status and the distinction between UI props and persisted records.

## UI implementation notes

- `PrimaryText` wraps React Native `Text` with a common default style and forwards other text props.
- `PrimaryFormInput` wraps `TextInput` with a label.
- `PrimaryPasswordField` combines a labeled input and visibility toggle.
- `PrimaryLoyaltyStampCard` renders a merchant heading, reward text, count badge, and stamp markers. Its displayed stamp count is clamped to the supplied range.
- `PrimaryStampProgressCard` renders a percentage ring with `react-native-svg`; its percentage is bounded from 0% through 100%.
- `PrimarySearchBar` is controlled: callers must provide `value` and `onChangeText`. `MyCardsScreen` currently renders it without those required props, so the current code may fail TypeScript validation.
- `COLORS` defines primary, background, surface, text, border, success, error, and warning values. Several screens still use their own inline colors.

## Assets and remote images

Bundled images include the app logo, three onboarding illustrations, and stamp artwork. Rewards and the sample profile also use remote image URLs declared directly in screen code; there is no explicit fallback/loading handling for those images.

## Build and validation commands

- `npm run android`
- `npm run ios`
- `npm start`
- `npm test`
- `npm run lint`

The current Jest test verifies only that the root component renders. It is not evidence of backend integration or loyalty workflow correctness.

## Technical gaps before a connected release

1. Resolve the controlled search bar usage and require a clean TypeScript/build check.
2. Agree the navigation and authentication contracts, then implement durable session lifecycle.
3. Add typed service functions and replace sample content with backend responses.
4. Add request loading/error/empty states and safe retry behavior.
5. Implement role-aware navigation based on trusted server data; do not use the sign-up selector as authorization.
6. Add tests for form validation, screen transitions, API behavior, and reward/stamp state refresh.
