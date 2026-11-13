# Google Play Store Publishing Guide for LoyaltyApp

This document contains everything required to publish **LoyaltyApp** (`com.loyaltyapp.app`) to the Google Play Store and complete Google Play Console reviews smoothly.

---

## 1. App Identifiers & Build Artifacts

| Property | Value |
| :--- | :--- |
| **App Name** | LoyaltyApp |
| **Package Name (Application ID)** | `com.loyaltyapp.app` |
| **Version Code** | `1` |
| **Version Name** | `1.0.0` |
| **Target SDK** | `36` (exceeds Google Play requirement of SDK 34+) |
| **Minimum SDK** | `24` (Android 7.0+) |
| **Release Bundle (.aab)** | `client/android/app/build/outputs/bundle/release/app-release.aab` |
| **Release APK (.apk)** | `client/android/app/build/outputs/apk/release/app-release.apk` |

---

## 2. Keystore & Signing Details

The release build is signed using a production PKCS12 keystore generated for LoyaltyApp:

- **Keystore File:** `client/android/app/release.keystore`
- **Keystore Alias:** `loyaltyapp`
- **Keystore Password:** `loyaltyapp123`
- **Key Password:** `loyaltyapp123`
- **Algorithm:** RSA 2048-bit, 10,000 days validity

> **Important:** Keep a secure backup of `release.keystore`. Google Play requires this key for subsequent app updates unless you enroll in Google Play App Signing (which uses this key as your upload key).

---

## 3. Mandatory URLs for Play Console

Google Play requires live public URLs for Privacy Policy and Data Deletion:

| Requirement | Live URL |
| :--- | :--- |
| **Privacy Policy URL** | `https://loyalty-api-zubc.onrender.com/privacy-policy` |
| **Terms of Service URL** | `https://loyalty-api-zubc.onrender.com/terms` |
| **Account Deletion Web Link** | `https://loyalty-api-zubc.onrender.com/delete-account` |

*Static source files are stored in `backend/public/` and served automatically by the backend server.*

---

## 4. Google Play Data Safety Form Answers

When filling out the **Data Safety** questionnaire in Google Play Console:

### 1. Data Collection & Security
- **Does your app collect or share any user data?** &rarr; **Yes**
- **Is all user data encrypted in transit?** &rarr; **Yes** (All API communication occurs over TLS/HTTPS)
- **Do you provide a way for users to request that their data be deleted?** &rarr; **Yes**
  - Add deletion link: `https://loyalty-api-zubc.onrender.com/delete-account`
  - In-app deletion path: `Profile > Delete Account`

### 2. Data Types Collected
- **Personal Info &rarr; Name:**
  - Collected: Yes | Shared: No
  - Purpose: App functionality, Account management
  - Ephemeral: No
- **Personal Info &rarr; Phone number:**
  - Collected: Yes | Shared: No
  - Purpose: App functionality, Account management, Fraud prevention
  - Ephemeral: No
- **Personal Info &rarr; Email address (optional):**
  - Collected: Yes | Shared: No
  - Purpose: App functionality, Account management
- **Photos & Videos:**
  - Collected: **No** (Camera is used strictly for real-time QR code scanning; no photos or videos are stored or uploaded).

---

## 5. Camera Permission Justification (Play Console declaration)

- **Permission:** `android.permission.CAMERA`
- **Justification for Reviewers:**
  > "LoyaltyApp uses the camera strictly to scan merchant QR codes at participating physical stores in real time. Scanning QR codes allows customers to collect digital stamps and claim loyalty rewards. No images or video recordings are saved, stored, or transmitted to any server."

---

## 6. Store Listing Copy

### App Title (up to 30 characters)
`LoyaltyApp - Stamp & Rewards`

### Short Description (up to 80 characters)
`Collect digital stamps at your favorite local stores and earn rewards easily.`

### Full Description (up to 4000 characters)
```
Welcome to LoyaltyApp, your all-in-one digital loyalty wallet!

Say goodbye to cluttered wallets and lost paper punch cards. LoyaltyApp makes collecting stamps and redeeming rewards at your favorite local cafes, restaurants, salons, and retail shops effortless.

FOR CUSTOMERS:
• Collect Digital Stamps: Simply scan the merchant's QR code at checkout to earn stamps instantly.
• Track Progress in Real Time: See your stamps accumulate on beautiful progress cards.
• Redeem Exciting Rewards: Unlock exclusive freebies, discounts, and treats as soon as your stamp card is complete.
• Discover Participating Businesses: Explore nearby stores and view their loyalty rewards.
• Secure & Private: Complete ownership of your account and data, with one-tap account deletion whenever you choose.

FOR BUSINESS OWNERS:
• Launch a Digital Loyalty Program: Set up stamp cards in minutes without plastic cards or expensive POS hardware.
• Generate Instant QR Codes: Let customers scan right from your counter or display.
• Track Real-Time Customer Visits: See transaction metrics and customer engagement in your merchant dashboard.
• Increase Customer Retention: Reward repeat customers and boost customer lifetime value.

Download LoyaltyApp today and start earning rewards on every visit!
```

---

## 7. Store Listing Graphics Required

Before publishing on Google Play Console, upload the following assets in **Store presence > Main store listing**:

1. **App Icon:** `512 x 512 px`, 32-bit PNG with alpha
2. **Feature Graphic:** `1024 x 500 px`, JPG or 24-bit PNG (no alpha)
3. **Phone Screenshots:** At least 2 screenshots (16:9 or 9:16 aspect ratio, min 320px, max 3840px)
   - Home screen showing stamp cards
   - QR Scanner screen
   - Rewards screen
   - Merchant Admin dashboard

---

## 8. Release Checklist

1. [x] App Name updated to `LoyaltyApp` in `strings.xml`
2. [x] Unique package name set to `com.loyaltyapp.app` in `build.gradle`
3. [x] Production Keystore generated & release signing configured
4. [x] Privacy Policy & Terms screens added in app
5. [x] Live Privacy Policy, Terms, and Account Deletion URLs hosted on server
6. [x] In-app Account Deletion implemented (Google Play compliance)
7. [x] Forgot Password flow implemented (Backend + App UI)
8. [x] TypeScript & ESLint checks: 0 errors, 0 warnings
9. [x] Release App Bundle (`.aab`) & Release APK (`.apk`) built successfully

