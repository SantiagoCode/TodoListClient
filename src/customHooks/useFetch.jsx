import { useEffect, useState } from 'react';
import { useTasks } from './../context/TaskContext';

const useFetch = (endpoint) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchTasks } = useTasks();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTasks(endpoint);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, fetchTasks]);

  return { loading, error };
};

export default useFetch;
