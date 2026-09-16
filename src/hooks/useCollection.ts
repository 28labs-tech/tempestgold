import { useEffect, useState } from "react";
import api from "../api/client";

export function useCollection<T>(endpoint: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    api
      .get<T[]>(endpoint, { signal: controller.signal })
      .then(({ data }) => {
        if (!Array.isArray(data)) throw new Error("Invalid collection");
        setItems(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [endpoint]);
  return { items, loading, error };
}
