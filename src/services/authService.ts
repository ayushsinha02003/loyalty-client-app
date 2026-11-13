import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://loyalty-api-zubc.onrender.com';

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface UserProfile {
  id?: string;
  _id?: string;
  name?: string;
  phone: string;
  role: 'customer' | 'business';
  email?: string;
  isVerified?: boolean;
  profileImage?: string;
  [key: string]: any;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: UserProfile;
    [key: string]: any;
  };
  token?: string;
  user?: UserProfile;
}

export interface RegisterPayload {
  name: string;
  phone: string;
  password: string;
  email?: string;
  role: 'customer' | 'business';
  businessName?: string;
  category?: string;
  address?: string;
  city?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: UserProfile;
    [key: string]: any;
  };
  token?: string;
  user?: UserProfile;
}

// Storage keys
const STORAGE_KEYS = {
  TOKEN: '@loyalty_auth_token',
  USER: '@loyalty_current_user',
  ONBOARDING_DONE: '@loyalty_onboarding_completed',
};

// Module-level cache for instant synchronous access
let authToken: string | null = null;
let currentUser: UserProfile | null = null;

export const getAuthToken = (): string | null => authToken;
export const getCurrentUser = (): UserProfile | null => currentUser;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token).catch((e) =>
      console.warn('Failed to persist auth token', e)
    );
  } else {
    AsyncStorage.removeItem(STORAGE_KEYS.TOKEN).catch(() => {});
  }
};

export const setAuthData = async (token: string, user: UserProfile): Promise<void> => {
  authToken = token;
  currentUser = user;
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (err) {
    console.warn('Failed to persist auth data', err);
  }
};

export const clearAuthData = async (): Promise<void> => {
  authToken = null;
  currentUser = null;
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch (err) {
    console.warn('Failed to clear auth data', err);
  }
};

/**
 * Initializes auth session from device persistent storage.
 * Restores token and user profile into memory so API calls work immediately.
 * Offline-tolerant: if the device is offline or network is slow, existing login is preserved.
 */
export async function initializeAuthSession(): Promise<{
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
}> {
  try {
    const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUserJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);

    if (storedToken) {
      authToken = storedToken;
      if (storedUserJson) {
        try {
          currentUser = JSON.parse(storedUserJson);
        } catch {
          currentUser = null;
        }
      }

      // Background validation with backend profile endpoint (does not block offline usage)
      getProfile()
        .then((profileRes) => {
          if (profileRes.success && (profileRes.user || profileRes.data?.user)) {
            const freshUser = profileRes.user || profileRes.data?.user;
            if (freshUser) {
              currentUser = freshUser;
              AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(freshUser)).catch(() => {});
            }
          } else if (
            profileRes.message === 'Invalid or expired token' ||
            profileRes.message === 'Not authorized. No token provided.'
          ) {
            // Token was genuinely expired or revoked on the server
            clearAuthData().catch(() => {});
          }
        })
        .catch(() => {
          // Network error / offline - keep stored credentials
        });

      return {
        isAuthenticated: true,
        user: currentUser,
        token: authToken,
      };
    }
  } catch (e) {
    console.warn('Error reading stored auth session:', e);
  }

  return {
    isAuthenticated: false,
    user: null,
    token: null,
  };
}

/**
 * Check if the user has previously completed the onboarding introduction.
 */
export async function getHasCompletedOnboarding(): Promise<boolean> {
  try {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE);
    return val === 'true';
  } catch {
    return false;
  }
}

/**
 * Mark onboarding as completed so returning users go directly to login or home.
 */
export async function setHasCompletedOnboarding(completed: boolean = true): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, completed ? 'true' : 'false');
  } catch (e) {
    console.warn('Error saving onboarding state:', e);
  }
}

/**
 * Sends phone and password to the backend login endpoint.
 */
export async function loginUser(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (result.success) {
    const token = result.token || result.data?.token;
    const user = result.user || result.data?.user;
    if (token && user) {
      await setAuthData(token, user);
      await setHasCompletedOnboarding(true);
    } else if (token) {
      setAuthToken(token);
    }
  }

  return result;
}

/**
 * Sends user registration details to the backend register endpoint.
 */
export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result.success) {
    const token = result.token || result.data?.token;
    const user = result.user || result.data?.user;
    if (token && user) {
      await setAuthData(token, user);
      await setHasCompletedOnboarding(true);
    } else if (token) {
      setAuthToken(token);
    }
  }

  return result;
}

/**
 * Get user profile from backend
 */
export async function getProfile(): Promise<LoginResponse> {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: 'Not authenticated' };
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (result.success && (result.user || result.data?.user)) {
    const user = result.user || result.data?.user;
    if (user) {
      currentUser = user;
      AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)).catch(() => {});
    }
  }
  return result;
}

/**
 * Initiates forgot password request (generates 6-digit OTP)
 */
export async function forgotPassword(identifier: string): Promise<{
  success: boolean;
  message: string;
  otp?: string;
  phone?: string;
  email?: string;
}> {
  const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier }),
  });

  return await response.json();
}

/**
 * Verifies 6-digit OTP for password reset
 */
export async function verifyResetOtp(
  identifier: string,
  otp: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify-reset-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, otp }),
  });

  return await response.json();
}

/**
 * Resets user password with verified OTP
 */
export async function resetPassword(
  identifier: string,
  otp: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, otp, newPassword }),
  });

  return await response.json();
}

/**
 * Deletes user account and associated loyalty data (Google Play Compliance)
 */
export async function deleteUserAccount(): Promise<{ success: boolean; message: string }> {
  const token = getAuthToken();
  if (!token) {
    return { success: false, message: 'Not authenticated' };
  }

  const response = await fetch(`${API_BASE_URL}/api/auth/delete-account`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (result.success) {
    await clearAuthData();
  }
  return result;
}
