"use client";
import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import useUserStore from "@/store/user";
import axiosApp from "@/lib/axios";

interface UsePostResult<T> {
  deleteData: (url: string, config?: AxiosRequestConfig) => Promise<any>;
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useDelete<T = any>(): UsePostResult<T> {
  const [data, setData] = useState<T | null>(null);
  const {token} = useUserStore()
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const deleteData = async (url: string, config?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosApp.delete<T>(url, {
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

  return { deleteData, data, error, loading };
}
