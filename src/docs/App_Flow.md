# Frontend App Flow

**Status:** As implemented in the client repository  
**Scope:** React Native frontend only

This document describes the screen transitions that are wired in `App.tsx`. It does not describe a production authentication flow: the current screens are prototypes and do not call an authentication service.

## Startup flow

1. `App` mounts inside `SafeAreaProvider` and shows `SplashScreen`.
2. `SplashScreen` calls its `onFinish` callback after 1.5 seconds.
3. The app shows the three-slide `OnboardingScreen`.
4. Tapping **Next** advances the slide; tapping **Get Started** shows `LoginScreen`.
5. The login screen is configured with the `customer` role. Its Login callback only changes local screen state; no credentials are checked.
6. After that callback, `AppContent` opens `ScreenAccessScreen`, a development screen picker.

There is no persisted onboarding completion, session restoration, authenticated user lookup, role authorization, or logout flow.

## Screen picker and customer tabs

`ScreenAccessScreen` lists the following destinations:

| Picker item | Rendered screen |
| --- | --- |
| Home Screen | `HomeScreen` |
| My Cards Screen | `MyCardsScreen` |
| Rewards Screen | `RewardsScreen` |
| Profile Screen | `ProfileScreen` |
| Admin Dashboard | `AdminHomeScreen` |
| Splash Screen | `SplashScreen` |
| Onboarding Screen | `OnboardingScreen` |
| Login Screen | `LoginScreen` |
| SignUp Screen | `SignUpScreen` |

The customer bottom bar in `components/common/BottomNav.tsx` contains **Home**, **My Cards**, **All**, **Rewards**, and **Profile**. Selecting **All** displays the screen picker; the other tabs display their corresponding screen.

The screen picker is a prototype/development affordance, not a role-protected production navigation route.

## Sign-up flow

The sign-up form offers User and Admin modes. The selected mode changes which fields are visible:

- User: full name, phone, email, password, and password confirmation.
- Admin: business name, owner name, phone, optional email, category, address, city, password, and password confirmation.

The fields are local component state only. Submitting calls the passed callback without validation, account creation, or persistence. The Login link returns to the login screen.

In the startup branch, sign-up is reached from Login and its submission dismisses the form to `AppContent`. In the screen-picker branch, its submission navigates to Home.

## Admin navigation

`AdminHomeScreen` displays a dashboard and `PrimaryAdminBottomNav` provides Home, Customers, Stamps, Rewards, and More:

- Home opens `AdminHomeScreen`.
- Customers opens `MyCardsScreen`.
- Rewards opens `RewardsScreen`.
- Stamps and More currently open `AdminHomeScreen`.

The admin bottom bar is shown only while `AdminHome` is selected. This is local navigation state, not authorization. Its `activeItem` is not controlled by `App`.

## Screen and data behavior

- **Home:** Shows a greeting, a sample progress value of 7/10, one sample Brew & Beans card, and static “How It Works” content.
- **My Cards:** Shows two sample Brew & Beans cards with 7/10 and 3/10 progress. The search bar is presentational; no query state or filtering is connected.
- **Rewards:** Displays four local sample rewards. Tabs filter the local list, and Redeem changes a reward’s local status to claimed. Changes are lost when the component is unmounted or the app restarts.
- **Profile:** Displays sample identity and loyalty totals. Menu rows and Logout have no handlers.
- **Admin Dashboard:** Displays static metric, activity, and quick-action examples. Quick actions are not connected to workflows.
- **Search:** `SearchScreen` exists but is not part of `ScreenId`, the picker, or either bottom navigation.

No screen currently fetches remote data, stores durable data, or exposes a complete business/customer transaction flow.

## Main source files

- `App.tsx` — initial presentation flow and local screen selection.
- `src/screens/ScreenAccessScreen.tsx` — prototype screen picker.
- `src/screens/auth/splashScreen/SplashScreen.tsx` — timed splash.
- `src/screens/onboarding/OnboardingScreen.tsx` — three onboarding slides.
- `src/screens/auth/loginSignUp/LoginScreen.tsx` and `SignUpScreen.tsx` — local forms and callbacks.
- `src/components/common/BottomNav.tsx` and `src/components/admin/PrimaryAdminBottomNav.tsx` — tab controls.
