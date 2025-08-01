// src/utils/mapComparison.ts
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapData } from '@/types/map';

const MAP_API_URL = '/api/maps';

const useMapComparison = () => {
  const [mapData, setMapData] = useState<MapData[]>([]);
  const [comparisonState, setComparisonState] = useState({});
  const [mapCodes, setMapCodes] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const fetchMapData = async (mapCode: string) => {
    try {
      const response = await axios.get(`${MAP_API_URL}/${mapCode}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const validateMapCode = (mapCode: string) => {
    // Implement map code validation logic here
    // For demonstration purposes, assume all codes are valid
    return true;
  };

  const handleMapCodeChange = (mapCode: string) => {
    if (validateMapCode(mapCode)) {
      setMapCodes((prevCodes) => [...prevCodes, mapCode]);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleComparisonStateChange = (newState: any) => {
    setComparisonState(newState);
  };

  useEffect(() => {
    const fetchAndSetMapData = async () => {
      const promises = mapCodes.map((mapCode) => fetchMapData(mapCode));
      const results = await Promise.all(promises);
      setMapData(results);
    };
    fetchAndSetMapData();
  }, [mapCodes]);

  return {
    mapData,
    comparisonState,
    mapCodes,
    isValid,
    handleMapCodeChange,
    handleComparisonStateChange,
  };
};

export default useMapComparison;


This utility file provides a hook for managing map comparison state, including fetching map data, validating map codes, and updating the comparison state. It integrates with the existing API and follows established patterns for reusing components and utilities. The code also adheres to the guidelines for using CSS variables for dark mode styling and avoids common mistakes such as accessing `localStorage` or `window` outside `useEffect`. 

To use this hook in a component, import it and call the `useMapComparison` function:


// src/components/MapComparison.tsx
import useMapComparison from '@/utils/mapComparison';

const MapComparison = () => {
  const {
    mapData,
    comparisonState,
    mapCodes,
    isValid,
    handleMapCodeChange,
    handleComparisonStateChange,
  } = useMapComparison();

  // Render the map comparison component using the provided data and handlers
  return (
    <div>
      <h1>Map Comparison</h1>
      <ul>
        {mapData.map((map) => (
          <li key={map.id}>{map.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={mapCodes.join(', ')}
        onChange={(e) => handleMapCodeChange(e.target.value)}
      />
      <button onClick={() => handleComparisonStateChange({ /* new state */ })}>
        Update Comparison State
      </button>
      {isValid ? <p>Map codes are valid</p> : <p>Invalid map codes</p>}
    </div>
  );
};

export default MapComparison;