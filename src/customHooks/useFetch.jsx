import { useEffect, useState } from 'react';
import { useTasks } from './../context/TaskContext';

const useFetch = (endpoint) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { handleFetch } = useTasks();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFetch.fetchTasks(endpoint);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error };
};

export default useFetch;
