import { useState, useEffect } from 'react';

export const useFetch = (fetchFn) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetchFn();
                setData(response.data.data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch data');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};