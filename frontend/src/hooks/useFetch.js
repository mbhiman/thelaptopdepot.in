import { useState, useEffect } from 'react';

export const useFetch = (fetchFunction, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchFunction();
                if (mounted) {
                    setData(response.data.data);
                }
            } catch (err) {
                if (mounted) {
                    setError(err.response?.data?.message || 'An error occurred');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            mounted = false;
        };
    }, dependencies);

    const refetch = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchFunction();
            setData(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, refetch };
};
