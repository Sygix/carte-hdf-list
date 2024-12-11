import { useState, useEffect } from 'react';
import Axios from 'axios';
import { mockPartners } from '@/data/partners.mock';
import { buildWebStorage, CacheAxiosResponse, setupCache } from 'axios-cache-interceptor';

interface UsePartnersResult {
  partners: any[];
  loading: boolean;
  error: Error | null;
}

const instance = Axios.create();
const axios = setupCache(instance, {
  storage: buildWebStorage(localStorage),
  ttl: 7 * 24 * 60 * 60 * 1000 // 7 days
});

const getToken = async () => {
  const response = await axios.post(
    'https://thingproxy.freeboard.io/fetch/https://webservicecarto.zecarte.fr/Token',
    {
      "id": "hdf",
      "password": "2m4HN5wEPz2!BH"
    },
    {
      cache: {
        methods: ['post']
      }
    }
  );
  console.log('getToken cache : ', response.cached ? 'cached' : 'fetched');
  return response.data.token;
}

const fetchPartners = async () => {
  const token = await getToken();
  const response = await axios.get<any[]>('https://thingproxy.freeboard.io/fetch/https://webservicecarto.zecarte.fr/partners?Full=true', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  console.log('fetchPartners cache : ', response.cached ? 'cached' : 'fetched');
  return response;
}

const handleExpiredTokenRequest = async (res: CacheAxiosResponse<any[], any>) => {
  if (res.status === 401) {
    return fetchPartners();
  }
  return res;
}

export function usePartners(): UsePartnersResult {
  const [partners, setPartners] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const handleEmptyResponse = (res: CacheAxiosResponse) => {
    if (res.data.length === 0) {
      setPartners(mockPartners.sort((a, b) => a.Name.localeCompare(b.Name)));
    } else {
      setPartners(res.data.sort((a: any, b: any) => a.Name.localeCompare(b.Name)));
    }
  }

  useEffect(() => {
    const loadPartners = async () => {
      try {
          // if axios request fails, delete token cookie and try again
          // if response is empty, set partners to mock data
          let res = await fetchPartners();
          res = await handleExpiredTokenRequest(res);
          handleEmptyResponse(res);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch partners'));
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  return { partners, loading, error };
}