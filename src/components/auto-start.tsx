"use client"
import { useGetMounted } from '@/hooks/useGetMounted'
import axiosApp from '@/lib/axios'
import { useCart } from '@/store/cartStore'
import useUserStore from '@/store/user'
import React, { useEffect } from 'react'

export default function AutoStart() {
    const {token, setUser} = useUserStore()
    const {setCart, setTotal, fetch} = useCart()
    const {getData} = useGetMounted()
    useEffect(() => {
      if(token) {
        axiosApp.get("/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
          setUser(res.data?.data);
        }).catch(err => {
          console.error("❌ Fetch profile failed:", err.response?.data || err.message);
        });
      }
    }, [token])
    useEffect(() => {
      if(token) {
        getData('/cart').then(res => {
          setCart(res?.data || []);
          setTotal(res?.total)
        }).catch(err => {
          console.error("❌ Fetch cart failed:", err.response?.data || err.message);
        });
      }
    }, [token, fetch])
    
  return <></>
}
