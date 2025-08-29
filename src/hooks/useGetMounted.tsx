// hooks/useGet.ts
"use client";
import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import useUserStore from "@/store/user";
import axiosApp from "@/lib/axios";

interface UseGetResult<T> {
  getData: (url: string, config?: AxiosRequestConfig) => Promise<any>;
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useGetMounted<T = any>(): UseGetResult<T> {
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
      return res.data
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { getData, data, error, loading };
}
