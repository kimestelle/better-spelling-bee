import axios from 'axios';

export interface InfiniteData {
  data: any[];
  win_threshold: number;
  letters: string[];
  center_letter: string;
}

const API_URL = 'http://127.0.0.1:8000';

const InfiniteDataService = {
  getInfiniteData: async (token: string): Promise<InfiniteData> => {
    const response = await axios.get(`${API_URL}/daily-data/api/infinite-data/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default InfiniteDataService;
