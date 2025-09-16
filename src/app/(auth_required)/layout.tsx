"use client"
import useUserStore from '@/store/user'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  const { token } = useUserStore()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return <div className='h-[50vh]'></div>
  }

  if (!token) {
    redirect('/login')
    return null
  }

  return <>{children}</>
}
