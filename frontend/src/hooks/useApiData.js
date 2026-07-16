import { useEffect, useState } from 'react';
import { api } from '../api/axios';

// Tries the live API first; falls back to local placeholder data so the
// frontend still looks complete even if the backend isn't running.
export function useApiData(endpoint, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get(endpoint)
      .then((res) => {
        if (!cancelled && res.data && (!Array.isArray(res.data) || res.data.length > 0)) {
          setData(res.data);
        }
      })
      .catch(() => {
        /* silently keep fallback data */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return { data, loading };
}
