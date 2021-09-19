import { useCallback, useState } from 'react';
import t from 'i18n';

export interface useSubmitReturn {
  loading: boolean;
  error?: string;
  submit: (data: any) => void;
  reset: () => void;
}

export const useSubmit = (
  service: (data: any) => Promise<any>,
  responseHandler: (response: any) => void,
): useSubmitReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const throwError = () => {
    setError(t('defaultError'));
  };

  const reset = useCallback(() => {
    setLoading(false);
    setError('');
  }, []);

  const submit = useCallback(
    (data: any) => {
      console.log('here');
      setLoading(true);
      setError('');
      service(data)
        .then((res) => {
          responseHandler(res);
          setLoading(false);
        })
        .catch(() => {
          throwError();
          setLoading(false);
        });
    },
    [responseHandler, service],
  );

  return { loading, error, submit, reset };
};
