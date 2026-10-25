# Frontend Product Requirements and As-Built Scope

**Product:** LoyaltyApp digital loyalty stamp card client  
**Status:** UI prototype; behavior is limited to what is present in this repository  
**Platform:** React Native (Android and iOS project scripts are configured)

## Product intent

The client presents a loyalty experience in which customers can view stamp progress and rewards, while business operators can view a dashboard. Current code supplies screen layouts and sample data; it does not yet implement a production loyalty service.

## Current user-facing screens

| Screen | Current behavior |
| --- | --- |
| Splash | Shows logo and app tagline for 1.5 seconds. |
| Onboarding | Three local slides with Next/Get Started controls. |
| Login | Phone and password fields, password visibility toggle, and callbacks for Login/Create Account. Login does not validate or authenticate. |
| Sign-up | User/Admin mode selector and conditional fields, password visibility toggles, and navigation callbacks. Submission does not validate or create an account. |
| Customer Home | Greeting, 7/10 progress card, sample Brew & Beans card, and static loyalty steps. |
| My Cards | Two sample loyalty cards and an unconnected search input. |
| Rewards | Four sample rewards, local All/Available/Claimed filters, and local status change on Redeem. |
| Profile | Sample user information, sample totals, static menu rows, and an unconnected Logout button. |
| Admin Dashboard | Static metric cards, quick-action labels, sample activity, and business overview. |
| Search | Placeholder title and subtitle; not currently linked from the app routes or tab bars. |
| Screen picker | Development menu for opening several screens directly. |

## Current interaction requirements

- Onboarding advances through three local slides and calls its completion callback on the last slide.
- Password controls toggle whether the entered text is visible.
- The rewards tabs filter the current local reward array.
- Redeeming a sample available reward changes its local status to claimed.
- Customer and admin bottom bars invoke local screen selection as documented in [App_Flow.md](./App_Flow.md).

## Explicitly not implemented

The current frontend has no API calls, authentication provider, data persistence, user/session model, business discovery dataset, server-backed role checks, transaction processing, or account-management behavior. In particular:

- Login and sign-up callbacks are not successful authentication.
- The Admin selection on sign-up is a visual form mode, not owner authorization.
- Displayed stamp counts, profile details, metrics, activity, and reward data are examples.
- “Redeem” is not a real or durable reward redemption.
- The interface does not confirm that a stamp is issued or that a reward is eligible.

These behaviors must be implemented against the backend contract before the product goals below can be considered delivered.

## Product goals for a connected release

1. Allow a customer to authenticate and view only their authorized loyalty information.
2. Display authoritative businesses, loyalty cards, stamp balances, and reward eligibility.
3. Allow customers to see clear results for eligible or failed redemption requests.
4. Allow authorized business users to manage their business and perform supported loyalty actions.
5. Keep account roles, balances, and transaction decisions server-authoritative.
6. Provide explicit loading, empty, error, and success feedback for service-backed screens.

## Acceptance criteria for the current prototype

- App renders the splash, onboarding, forms, and screen picker.
- The main customer and admin screen layouts render with their bundled or declared sample content.
- Local rewards filtering and claimed-state behavior function within the mounted screen.
- No documentation or UI claims that sample values are live backend records.

## Acceptance criteria for production functionality

Production acceptance requires the goals above plus verified authentication, server-enforced access control, durable transaction processing, and automated tests. Those criteria are not met by the current frontend code alone.
