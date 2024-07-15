import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Update with your backend URL

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Player {
  user: User;
  points: number;
  streak: number;
  color_bottom: string;
  color_top: string;
  email_updates: boolean;
}

const getCurrentUserData = async (token: string): Promise<Player> => {
  try {
    const response = await axios.get(`${API_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error;
  }
};

const updateUserData = async (token: string, userData: Partial<Player>): Promise<Player> => {
  try {
    const response = await axios.put(`${API_URL}/users/me/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user data:', error);
    throw error;
  }
};

export default {
  getCurrentUserData,
  updateUserData,
};
