"use client";
import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import useUserStore from "@/store/user";
import axiosApp from "@/lib/axios";

interface UseGetResult<T> {
  getData: (url: string, config?: AxiosRequestConfig) => Promise<void>;
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useGet<T = any>(initialUrl?: string, autoFetch: boolean = false): UseGetResult<T> {
  const [data, setData] = useState<T | null>(null);
  const { token } = useUserStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getData = async (url: string, config?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosApp.get<T>(url, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch عند أول تحميل لو initialUrl موجود
  useEffect(() => {
    if (autoFetch && initialUrl) {
      getData(initialUrl);
    }
  }, [initialUrl]);

  return { getData, data, error, loading };
}
