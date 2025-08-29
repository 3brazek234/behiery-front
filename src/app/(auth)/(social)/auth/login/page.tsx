"use client"
import useUserStore from '@/store/user'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
    const searchParams = useSearchParams()
    const {setToken} = useUserStore()
    useEffect(() => {
      if(searchParams.get("token")) {
          setToken(searchParams.get("token") as string)
      }
    }, [searchParams.get("token")])
  return (
    <div>
    </div>
  )
}
