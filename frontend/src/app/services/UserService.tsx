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
  infinite_data: string[]; 
  infinite_letters: string[]; 
  infinite_center_letter: string;
  infinite_win_threshold: number;
}
const getCurrentUserData = async (token: string): Promise<Player> => {
  try {
    const response = await axios.get(`${API_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let userData = response.data;

    if (Array.isArray(userData.daily_words)) {
      userData.daily_words = userData.daily_words.filter((word: string) => word !== '[' && word !== ']');
    }
    
    // console.log(userData.infinite_words);
    if (Array.isArray(userData.infinite_words)) {
      userData.infinite_words = userData.infinite_words.filter((word: string) => word !== '[' && word !== ']');
    }
    
    // console.log(userData.infinite_words);

    if (Array.isArray(userData.infinite_data)) {
      userData.infinite_data = userData.infinite_data.map((word: string) => word.replace(/[\[\]]/g, ''));
    }

    return userData;
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
    // console.log(username, password, email, emailUpdates)
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

  const patchInfiniteData = async (
    token: string,
    data: string[],
    win_threshold: number,
    letters: string[],
    center_letter: string
  ): Promise<any> => {
    try {
      console.log(win_threshold, letters, center_letter)
      const response = await axios.patch(
        `${API_URL}/users/me/`,
        {
          infinite_data: data,
          infinite_win_threshold: win_threshold,
          infinite_letters: letters,
          infinite_center_letter: center_letter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Failed to patch infinite data:', error);
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
  patchInfiniteData,
};

export default api;
