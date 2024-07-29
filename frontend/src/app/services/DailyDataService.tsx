import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export interface DailyData {
  data: string[];
  win_threshold: number;
  letters: string[];
  center_letter: string;
}

const getDailyData = async (): Promise<DailyData> => {
  try {
    const response = await axios.get(`${API_URL}/api/daily-data/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch daily data:', error);
    throw error;
  }
};

const DailyDataService = {
  getDailyData,
};

export default DailyDataService;