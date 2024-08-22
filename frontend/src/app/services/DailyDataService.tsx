import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export interface DailyData {
  date: string;
  data: string[];
  win_threshold: number;
  letters: string[];
  center_letter: string;
}

const getDailyData = async (token:string): Promise<DailyData> => {
  try {
    const response = await axios.get(`${API_URL}/daily-data/api/daily-data/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.data.date = formatDate(response.data.date)
    return response.data;
  } catch (error) {
    console.error('Failed to fetch daily data:', error);
    throw error;
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const DailyDataService = {
  getDailyData,
};

export default DailyDataService;