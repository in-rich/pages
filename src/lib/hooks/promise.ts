import { useEffect, useState } from "react";

export const usePromise = <T>(promise: Promise<T>) => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setLoading(true);

    promise
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [promise]);

  return { data, error, loading };
};
