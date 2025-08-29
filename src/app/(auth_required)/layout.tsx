"use client"
import useUserStore from '@/store/user'
import { redirect } from 'next/navigation'
import React from 'react'

export default function Layout({children}: {children: React.ReactNode}) {
  const {token} = useUserStore()
  if(token) {
      return <>{children}</>
  }
  else return redirect('/')
}
