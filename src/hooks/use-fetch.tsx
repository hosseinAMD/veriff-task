import { useCallback, useEffect, useState } from 'react';
import t from 'i18n';

export interface useFetchReturn {
  loading: boolean;
  error?: string;
  fetchApi: () => void;
}

export const useFetch = (
  service: () => Promise<any>,
  responseHandler: (response: any) => void,
  preLoading: boolean,
): useFetchReturn => {
  const [loading, setLoading] = useState<boolean>(preLoading);
  const [error, setError] = useState<string>('');

  const throwError = () => {
    setError(t('defaultError'));
  };

  const fetchApi = useCallback(() => {
    setLoading(true);
    setError('');
    service()
      .then((res) => {
        responseHandler(res);
        setLoading(false);
      })
      .catch(() => {
        throwError();
        setLoading(false);
      });
  }, [responseHandler, service]);

  useEffect(() => {
    preLoading && fetchApi();
  }, [fetchApi, preLoading]);

  return { loading, error, fetchApi };
};
