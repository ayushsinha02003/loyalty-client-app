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
  data?: UserProfile;
  token?: string;
  user?: UserProfile;
}

// Simple in-memory token storage (replace with AsyncStorage for persistence)
let authToken: string | null = null;
let currentUser: UserProfile | null = null;

export const getAuthToken = (): string | null => authToken;
export const getCurrentUser = (): UserProfile | null => currentUser;

export const setAuthData = (token: string, user: UserProfile) => {
  authToken = token;
  currentUser = user;
};

export const clearAuthData = () => {
  authToken = null;
  currentUser = null;
};

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

  if (result.success && (result.token || result.data?.token)) {
    const token = result.token || result.data?.token;
    const user = result.user || result.data?.user;
    if (token && user) {
      setAuthData(token, user);
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

  if (result.success && (result.token || result.data?.token)) {
    const token = result.token || result.data?.token;
    const user = result.user || result.data?.user;
    if (token && user) {
      setAuthData(token, user);
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
      'Authorization': `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return result;
}

