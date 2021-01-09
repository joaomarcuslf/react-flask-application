import { useState, useEffect } from 'react';
import { fetchJson, postJson, putJson, deleteJson } from './http';

export const useGet = (resourceUrl, loadingState = false) => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(loadingState);
  const [error, setError] = useState({});

  useEffect(() => {
    setLoading(true);

    fetchJson(`${process.env.BASE_URL}/api/v1/${resourceUrl}`)
      .then((data) => {
        setResponse(data);
        return data;
      })
      .catch((errorResponse) => {
        setError(errorResponse);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { response, loading, error };
};

export const usePost = (resourceUrl, loadingState = false) => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(loadingState);
  const [error, setError] = useState({});

  return {
    response,
    loading,
    error,
    thrigger: (body) => {
      return new Promise((resolve, reject) => {
        setLoading(true);

        postJson(`${process.env.BASE_URL}/api/v1/${resourceUrl}`, body)
          .then((data) => {
            setResponse(data);
            return resolve(data);
          })
          .catch((errorResponse) => {
            setError(errorResponse);
            return reject(errorResponse);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    },
  };
};

export const usePut = (resourceUrl, loadingState = false) => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(loadingState);
  const [error, setError] = useState({});

  return {
    response,
    loading,
    error,
    thrigger: (body) => {
      return new Promise((resolve, reject) => {
        setLoading(true);

        putJson(`${process.env.BASE_URL}/api/v1/${resourceUrl}`, body)
          .then((data) => {
            setResponse(data);
            return resolve(data);
          })
          .catch((errorResponse) => {
            setError(errorResponse);
            return reject(errorResponse);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    },
  };
};

export const useDelete = (resourceUrl, loadingState = false) => {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(loadingState);
  const [error, setError] = useState({});

  return {
    response,
    loading,
    error,
    thrigger: () => {
      return new Promise((resolve, reject) => {
        setLoading(true);

        deleteJson(`${process.env.BASE_URL}/api/v1/${resourceUrl}`)
          .then((data) => {
            setResponse(data);
            return resolve(data);
          })
          .catch((errorResponse) => {
            setError(errorResponse);
            return reject(errorResponse);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    },
  };
};
