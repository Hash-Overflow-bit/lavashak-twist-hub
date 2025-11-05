import { useEffect, useState, useCallback } from "react";

type DefaultLocation = {
  address: string;
  lat: number;
  lon: number;
};

export function useDefaultLocation() {
  const [location, setLocation] = useState<DefaultLocation | null>(() => {
    try {
      const raw = localStorage.getItem("lavashak_default_location");
      return raw ? (JSON.parse(raw) as DefaultLocation) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reverseGeocode = useCallback(async (lat: number, lon: number) => {
    try {
      // Use OpenStreetMap Nominatim reverse geocoding (no API key).
      // Note: respect rate limits for production. Consider using a proper geocoding service.
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "LavashakHub/1.0 (contact@lavashakhub)" },
      });
      if (!res.ok) throw new Error("Reverse geocoding failed");
      const data = await res.json();
      const address = data.display_name || "";
      return address;
    } catch (err) {
      console.error(err);
      return null;
    }
  }, []);

  const requestLocation = useCallback(
    (opts?: PositionOptions) => {
      return new Promise<DefaultLocation | null>((resolve) => {
        if (!("geolocation" in navigator)) {
          setError("Geolocation is not available in this browser.");
          resolve(null);
          return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            try {
              const lat = pos.coords.latitude;
              const lon = pos.coords.longitude;
              const address = (await reverseGeocode(lat, lon)) || "";
              const newLoc: DefaultLocation = { address, lat, lon };
              try {
                localStorage.setItem(
                  "lavashak_default_location",
                  JSON.stringify(newLoc)
                );
              } catch (err) {
                // ignore localStorage write errors
                console.warn("Failed to save default location", err);
              }
              setLocation(newLoc);
              resolve(newLoc);
            } catch (err) {
              setError(
                (err as Error)?.message || "Failed to determine location"
              );
              resolve(null);
            } finally {
              setLoading(false);
            }
          },
          (err) => {
            setError(err.message || "Permission denied or unavailable");
            setLoading(false);
            resolve(null);
          },
          { enableHighAccuracy: true, timeout: 15000, ...(opts || {}) }
        );
      });
    },
    [reverseGeocode]
  );

  useEffect(() => {
    // nothing automatic by default — user should opt-in by calling requestLocation()
  }, []);

  const clearLocation = useCallback(() => {
    try {
      localStorage.removeItem("lavashak_default_location");
    } catch (err) {
      console.warn("Failed to clear default location", err);
    }
    setLocation(null);
    setError(null);
  }, []);

  return { location, loading, error, requestLocation, clearLocation } as const;
}
