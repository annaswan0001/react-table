import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchHook(initialUrl, initialData) {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const resp = await axios(url);
        setData(resp.data)
       
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData()
  }, [url]);

  return[data, loading, error, setUrl]
}
