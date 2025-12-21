'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Service Worker registered in development mode:', registration);
          }
        })
        .catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('Service Worker registration failed in development mode:', error);
          }
        });
    }
  }, []);

  return null;
}