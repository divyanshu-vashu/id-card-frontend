const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export interface RequestOtpData {
  phone: string;
}

export interface VerifyOtpData {
  phone: string;
  otp: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  otp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
}

export const api = {
  requestOtp: async (data: RequestOtpData) => {
    const response = await fetch(`${API_BASE_URL}/auth/request-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to request OTP');
    }
    
    return response.json();
  },

  verifyOtp: async (data: VerifyOtpData) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to verify OTP');
    }
    
    return response.json();
  },

  register: async (data: RegisterData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register');
    }
    
    return response.json();
  },

  getUserProfile: async (token: string): Promise<UserProfile> => {
    const response = await fetch(`${API_BASE_URL}/user/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user profile');
    }
    
    const data = await response.json();
    if (data && data.user) {
      // The API returns { success: true, user: {...} }, we need to return the nested 'user' object
      return data.user;
    }
    throw new Error("User data not found in API response");
  },
};
