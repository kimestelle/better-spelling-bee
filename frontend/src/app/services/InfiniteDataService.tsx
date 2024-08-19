import axios from 'axios';

export interface InfiniteData {
  data: any[];
  win_threshold: number;
  letters: string[];
  center_letter: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const InfiniteDataService = {
  getInfiniteData: async (token: string): Promise<InfiniteData> => {
    const response = await axios.get(`${API_BASE_URL}/api/infinite-data/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default InfiniteDataService;
