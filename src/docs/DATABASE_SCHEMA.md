# Frontend Data and Database Status

**Status:** No database schema is implemented in this frontend repository  
**Scope:** Data shapes currently used by the React Native UI

## Source-of-truth statement

There are no database migrations, Supabase client, API service, server-side data models, or persistent storage integration in the frontend code inspected for this document. Consequently, this file does not define or claim an actual production database schema.

The values below are UI sample data and component props only. They are not persisted records, validated server data, or a contract for a backend.

## Data currently represented by the UI

### Loyalty card props

`PrimaryLoyaltyStampCard` accepts:

| Property        | Type                  | UI use                 |
| --------------- | --------------------- | ---------------------- |
| `merchantName`  | `string`              | Merchant heading       |
| `rewardText`    | `string`              | Reward description     |
| `currentStamps` | `number`              | Earned stamp count     |
| `totalStamps`   | `number`              | Total stamp positions  |
| `merchantImage` | Optional image source | Optional merchant logo |

The component clamps the displayed current stamp count between zero and the supplied total. It does not own or save the balance.

`PrimaryStampProgressCard` accepts current and total stamp numbers and renders a percentage ring. The Home screen supplies 7 and 10 as fixed sample values.

### Reward list

`RewardsScreen` declares an in-component `Reward` type with:

| Field    | Type                       | Sample use                                  |
| -------- | -------------------------- | ------------------------------------------- |
| `id`     | `number`                   | React list identity and local update target |
| `title`  | `string`                   | Reward label                                |
| `stamps` | `string`                   | Display-only requirement text               |
| `image`  | `string`                   | Remote image URL                            |
| `status` | `'available' \| 'claimed'` | Local filter and button state               |

The four rewards are initialized in the screen source. Claiming one updates React state only; there is no redemption transaction or durable record.

### Sample profile and dashboard values

`ProfileScreen` hard-codes a sample name, email, phone number, 32 stamps, and 5 redeemed rewards. `AdminHomeScreen` hard-codes customer/stamp/redemption metrics and recent activity. These values must not be interpreted as live customer or business data.

## Data persistence and integration gaps

- Authentication fields are component state; there is no account record or session persistence.
- Loyalty card counts and reward status do not come from an authoritative service.
- The reward “Redeem” action is not verified or recorded by a backend.
- Profile and admin metrics are static display values.
- There is no transaction history, membership identifier, business identifier, or durable identifier contract.

Before connecting a backend, define its schema and API contract from the actual backend implementation. Do not use frontend sample values as a source for balances, permissions, reward eligibility, or transaction outcomes. Keep privileged authorization and transaction validation on the server.

## Frontend files that display sample data

- `src/screens/home/HomeScreen.tsx`
- `src/screens/my-cards/MyCardsScreen.tsx`
- `src/screens/rewards/RewardsScreen.tsx`
- `src/screens/profile/ProfileScreen.tsx`
- `src/screens/home/AdminHomeScreen.tsx`
- `src/components/cards/loyaltyStampCard/PrimaryLoyaltyStampCard.tsx`
- `src/components/cards/stampProgressCard/PrimaryStampProgressCard.tsx`
