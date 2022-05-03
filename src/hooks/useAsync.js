
import { useState, useCallback } from 'react';

export const useAsync = (asyncFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(() => {
        setLoading(true);
        setData(null);
        setError(null);
        return asyncFunction()
            .then((response) => {
                setData(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [asyncFunction]);

    return { execute, loading, data, error };
};