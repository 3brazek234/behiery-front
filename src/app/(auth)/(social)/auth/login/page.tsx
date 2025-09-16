"use client"

import useUserStore from "@/store/user"
import { useSearchParams, redirect } from "next/navigation"
import React, { useEffect, Suspense } from "react"

function TokenHandler() {
  const searchParams = useSearchParams()
  const { setToken } = useUserStore()

  useEffect(() => {
    const token = searchParams.get("token")
    if (token) {
      setToken(token)
      redirect("/")
      console.log(token);
      
    }
  }, [searchParams, setToken])

  return <div />
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TokenHandler />
    </Suspense>
  )
}
