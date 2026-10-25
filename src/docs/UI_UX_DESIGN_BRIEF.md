# Frontend UI/UX Reference

**Status:** Describes the visual patterns and interaction currently present in the client  
**Platform:** React Native

This brief is an as-built reference, not a claim that the product has a complete or production-ready design system. Screens share some components and colors, but many colors and dimensions are defined locally.

## Visual direction in code

The interface uses light backgrounds, white cards, rounded surfaces, purple/indigo accents, dark slate text, and Material Design icons. The shared palette in `src/constants/colors.ts` is:

| Token | Value |
| --- | --- |
| Primary | `#4F46E5` |
| Background | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Primary text | `#111827` |
| Secondary text | `#6B7280` |
| Border | `#D9E2EC` |
| Success | `#16A34A` |
| Error | `#DC2626` |
| Warning | `#F59E0B` |

Many components use purple variants such as `#7B3FF2`, `#7C3AED`, and `#6D28D9` instead of the shared primary token. Consolidating these values is future design-system work, not current behavior.

## Screen patterns

- **Splash:** Purple primary background, logo, title, tagline, decorative stars; auto-advances after 1.5 seconds.
- **Onboarding:** Three full-screen slides with centered copy, local illustrations, page indicators, and Next/Get Started action.
- **Login:** White form layout with phone and password inputs, Show/Hide control, Forgot Password text, Login action, and Create Account link.
- **Sign-up:** Scrollable form in a rounded white panel; User/Admin selector changes the set of displayed fields; includes password and confirmation controls.
- **Customer Home:** Greeting header, purple progress summary, loyalty card, and a three-step static “How It Works” panel.
- **My Cards:** Title, search-bar presentation, and stacked loyalty cards.
- **Rewards:** All/Available/Claimed pill tabs and reward rows with image, requirement label, and Redeem/Claimed action.
- **Profile:** Purple identity header, stats panel, menu rows, and Logout action.
- **Admin Dashboard:** Purple metric banner, quick-action grid, engagement callout, recent activity rows, and summary cards.
- **Search:** Minimal placeholder screen.

The values and interactions described above are implemented in screen files; sample content does not represent live customer data. Refer to [PRD.md](./PRD.md) for behavior limits and [App_Flow.md](./App_Flow.md) for route transitions.

## Reusable component catalogue

| Component | Purpose |
| --- | --- |
| `PrimaryText` | Shared text wrapper with default text styling. |
| `PrimaryFormInput` | Labeled text input used by sign-up. |
| `PrimaryPasswordField` | Password entry with a Show/Hide control. |
| `PrimaryRoleButton` | Selects the visual User/Admin sign-up form mode. |
| `PrimaryHeader` | Greeting, subtitle, menu button, and notification badge. |
| `BottomNav` | Customer tab bar. |
| `PrimaryAdminBottomNav` | Admin tab bar. |
| `ScreenContainer` | Basic safe-area container; not currently used by the screens listed above. |
| `PrimarySearchBar` | Controlled search input with optional filter control. |
| `PrimaryLoyaltyStampCard` | Merchant reward summary and stamp markers. |
| `PrimaryStampProgressCard` | Stamp count and SVG progress ring. |
| `LoyaltySteps` | Static Visit/Collect/Redeem instructional row. |
| Admin display components | Metric, stat, activity, and quick-action presentation. |

## Interaction and accessibility observations

- Password visibility has an explicit Show/Hide text control.
- Bottom navigation and primary actions use React Native touch/press controls.
- Some icon-only buttons have hit slop; many others do not expose accessibility labels.
- The SignUp role selector communicates a form variant only; it must not communicate granted authorization.
- Search and profile/admin actions include presentational controls without complete behavior.
- No shared loading, empty, error, or confirmation-state component is currently present.
- Contrast, dynamic text sizing, screen-reader labels, keyboard handling, and small-screen layouts should be validated during production hardening.

## Design-system follow-up

1. Consolidate inline colors into shared design tokens.
2. Standardize spacing, typography, radii, and elevation across screens.
3. Add semantic labels and accessibility state to icon/action controls.
4. Add reusable loading, empty, error, and success feedback patterns for future service-backed screens.
5. Verify responsive layouts and form behavior on supported Android and iOS devices.
