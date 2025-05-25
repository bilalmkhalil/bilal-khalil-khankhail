"use client";

import { useEffect, useRef, useState } from 'react';
import { DarkMapProps } from '@/types/types';

const DarkMap = ({ center, zoom, className }: DarkMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeMap = async () => {
      try {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Dynamically import Leaflet to avoid SSR issues
        const L = await import('leaflet');
        
        // Import CSS
        await import('leaflet/dist/leaflet.css');

        if (!mounted) return;

        // Create map instance with proper error handling
        const map = L.map(mapRef.current, {
          center,
          zoom,
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          dragging: false,
          preferCanvas: true,
        });

        // Dark theme tile layer with error handling
        const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd',
          attribution: '',
          errorTileUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMjQyNDI0Ii8+Cjx0ZXh0IHg9IjEyOCIgeT0iMTI4IiBmaWxsPSIjNzQ2ODU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPk1hcCBUaWxlPC90ZXh0Pgo8L3N2Zz4K',
        });

        tileLayer.on('load', () => {
          if (mounted) setIsLoading(false);
        });

        tileLayer.on('tileerror', () => {
          console.warn('Some map tiles failed to load');
        });

        tileLayer.addTo(map);

        // Create custom marker with SVG
        const customIcon = L.divIcon({
          className: 'custom-dark-pin',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" style="filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div style="position: absolute; bottom: -2px; left: 50%; width: 12px; height: 12px; background: rgba(239, 68, 68, 0.3); border-radius: 50%; filter: blur(2px); transform: translateX(-50%);"></div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        // Add marker
        L.marker(center, { icon: customIcon }).addTo(map);

        mapInstanceRef.current = map;

        // Force map to invalidate size after a short delay
        setTimeout(() => {
          if (map && mounted) {
            map.invalidateSize();
            setIsLoading(false);
          }
        }, 100);

      } catch (err) {
        console.error('Failed to initialize map:', err);
        if (mounted) {
          setError('Failed to load map');
          setIsLoading(false);
        }
      }
    };

    initializeMap();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  if (error) {
    return (
      <div className={`h-full w-full bg-gray-800 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-white/60 text-sm text-center">
          <div className="mb-2">🗺️</div>
          <div>Map unavailable</div>
          <div className="text-xs text-white/40 mt-1">Karachi, Pakistan</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center z-10">
          <div className="text-white/60 text-sm flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
            Loading map...
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className={`h-full w-full ${className}`}
        style={{
          background: '#1a1a1a',
          borderRadius: '0.5rem',
        }}
      />
      <style jsx global>{`
        .leaflet-container {
          background: #1a1a1a !important;
          border-radius: 0.5rem !important;
          font-family: inherit !important;
        }
        .custom-dark-pin {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-control-container {
          display: none !important;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(0, 0, 0, 0.9) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 8px !important;
        }
        .leaflet-popup-tip {
          background: rgba(0, 0, 0, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default DarkMap;
