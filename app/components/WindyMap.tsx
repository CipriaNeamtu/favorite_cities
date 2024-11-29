'use client'

import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { WindyMapTypes } from '../definitions';
import L from 'leaflet';

// import { getApiKey } from '../services/envService';

const WindyMap = ({ cityData }: WindyMapTypes) => {
  const initializeMap = async () => {
    // const windyApiKey = await getApiKey('windyMap');
    const windyApiKey = process.env.NEXT_PUBLIC_WINDY_API_KEY;
    
    const latitude = cityData?.latitude ?? 50.4;
    const longitude = cityData?.longitude ?? 14.3;

    if (typeof window !== 'undefined' &&  window.windyInit && windyApiKey) {
      const options = {
        key: windyApiKey,
        verbose: true,
        lat: latitude,
        lon: longitude,
        zoom: 10,
      };

      window.windyInit(options, (windyAPI) => {
        const { map } = windyAPI;
        L.marker([latitude, longitude]).addTo(map).bindPopup('City Location');
      });
    }
  } 
  
  useEffect(() => {
    initializeMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%" height="500px">
      <div id="windy" style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default WindyMap;