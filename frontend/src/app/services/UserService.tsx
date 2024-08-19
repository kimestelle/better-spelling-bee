import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Player {
  user: User;
  email_updates: boolean;

  points: number;
  streak: number;
  color_bottom: string;
  color_top: string;
  accessory: number;

  daily_score: number;
  daily_words: string;
  infinite_score: number;
  infinite_words: string;
}

const getCurrentUserData = async (token: string): Promise<Player> => {
  try {
    const response = await axios.get(`${API_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // token isn't updating
    // console.log(`Bearer ${token}`)
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

const updateUserData = async (token: string, userData: Partial<Player>): Promise<Player> => {
  try {
    const response = await axios.patch(`${API_URL}/users/me/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Updating user data with token:', token);
    // console.log(userData);
    return response.data;
  } catch (error) {
    console.error('Failed to update user data:', error);
    throw error;
  }
};

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/login/`, { username, password });
    // console.log(`api response ${JSON.stringify(response.data)}`)
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

const register = async (username: string, password: string, email: string, emailUpdates: boolean) => {
  try {
    console.log(username, password, email, emailUpdates)
    const response = await axios.post(`${API_URL}/users/register/`, {
      username,
      password,
      email,
      email_updates: emailUpdates,
    });
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

const refreshToken = async (refresh: string) => {
  try {
    const response = await axios.post(`${API_URL}/users/refresh/`, { refresh });
    return response;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

const patchFoundWords = async (token: string, words: string[], score: number, daily: boolean): Promise<any> => {
  try {
    const data = daily 
      ? { daily_words: words, daily_score: score } 
      : { infinite_words: words, infinite_score: score };

    const response = await axios.patch(`${API_URL}/users/me/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to patch found words:', error);
    throw error;
  }
};


const api = {
  getCurrentUserData,
  updateUserData,
  login,
  register,
  refreshToken,
  patchFoundWords,
};

export default api;
