"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import InfiniteDataService, { InfiniteData } from '../app/services/InfiniteDataService';
import Cookies from 'js-cookie';
import api from '@/app/services/UserService';

interface InfiniteDataContextProps {
    infiniteData: InfiniteData | null;
    loading: boolean;
    fetchAndUpdateInfiniteData: () => Promise<void>;
}

export const InfiniteDataContext = createContext<InfiniteDataContextProps | undefined>(undefined);

export const InfiniteDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [infiniteData, setInfiniteData] = useState<InfiniteData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchAndUpdateInfiniteData = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('No access token found');
        }

        // Fetch new infinite data
        const data = await InfiniteDataService.getInfiniteData(token);
        
        // Update the user with the new infinite data
        await api.patchInfiniteData(token, data.data, data.win_threshold, data.letters, data.center_letter);
        
        // Update the context with the new infinite data
        setInfiniteData({
          data: data.data,
          win_threshold: data.win_threshold,
          letters: data.letters,
          center_letter: data.center_letter,
        });

      } catch (error) {
        console.error('Failed to fetch and update infinite data:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      const checkAndFetchData = async () => {
        try {
          const token = Cookies.get('access_token');
          if (!token) {
            throw new Error('No access token found');
          }
    
          // Get the current user data
          const userData = await api.getCurrentUserData(token);
    
          // Check if the user has infinite data
          if (!userData.infinite_data || userData.infinite_data.length === 0) {
            // User has no infinite data, so fetch and update
            await fetchAndUpdateInfiniteData();
          } else {
            // User already has infinite data, set it to the context
            setInfiniteData({
              data: userData.infinite_data,
              win_threshold: userData.infinite_win_threshold,
              letters: userData.infinite_letters,
              center_letter: userData.infinite_center_letter,
            });
          }
        } catch (error) {
          console.error('Failed to check and fetch infinite data:', error);
        } finally {
          setLoading(false);
        }
      };
    
      checkAndFetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
      <InfiniteDataContext.Provider value={{ infiniteData, loading, fetchAndUpdateInfiniteData }}>
        {children}
      </InfiniteDataContext.Provider>
    );
  };

export const useInfiniteData = (): InfiniteDataContextProps => {
  const context = useContext(InfiniteDataContext);
  if (!context) {
    throw new Error('useInfiniteData must be used within an InfiniteDataProvider');
  }
  return context;
};
