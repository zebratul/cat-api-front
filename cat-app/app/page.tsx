'use client';
import { useState, useEffect, useRef } from 'react';
import Checkboxes from './components/Checkboxes';
import Button from './components/Button';
import CatDisplay from './components/CatDisplay';

export default function Home() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [catImage, setCatImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | undefined>();

  const fetchCatImage = async (): Promise<void> => {
    try {
      setError(null);
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data[0]?.url) {
        setCatImage(data[0].url);
      } else {
        throw new Error('No cat images found');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cat';
      setError(errorMessage);
      setCatImage(null);
    }
  };

  const handleManualFetch = async () => {
    const currentAutoRefresh = autoRefresh;
    
    if (currentAutoRefresh && intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    await fetchCatImage();

    if (currentAutoRefresh && enabled) {
      intervalRef.current = window.setInterval(fetchCatImage, 5000);
    }
  };

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    if (enabled && autoRefresh) {
      intervalRef.current = window.setInterval(fetchCatImage, 5000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [enabled, autoRefresh]);

  useEffect(() => {
    if (!enabled) {
      setCatImage(null);
      setAutoRefresh(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (enabled) {
      fetchCatImage();
    }
  }, [enabled]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Checkboxes
        enabled={enabled}
        autoRefresh={autoRefresh}
        setEnabled={setEnabled}
        setAutoRefresh={setAutoRefresh}
      />
      
      <Button
        enabled={enabled}
        onClick={handleManualFetch}
      />
      
      <CatDisplay
        enabled={enabled}
        catImage={catImage}
        error={error}
      />
    </div>
  );
}