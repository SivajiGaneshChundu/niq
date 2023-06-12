import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface UseFetchProps {
  url: string;
}

const useFetch = ({ url }: UseFetchProps) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);

  // function to fetch data
  const fetch = useCallback(async () => {
    setError(false);
    try {
      const fetchedData = await axios.get(url);
      setData(fetchedData.data);
    } catch {
      setError(true);
    }
  }, [url]);

  useEffect(() => {
    // on first load fetch data
    fetch();
  }, [fetch]);

  return {
    data,
    error,
    fetch,
  };
};

export default useFetch;