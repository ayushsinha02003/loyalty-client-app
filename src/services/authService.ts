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
  return result;
}

