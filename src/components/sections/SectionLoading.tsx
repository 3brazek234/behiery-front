import { Loader2 } from 'lucide-react'
import React from 'react'

export default function SectionLoading() {
  return (
    <div className='h-60 flex justify-center items-center'>
        <div><Loader2 className="animate-spin" /></div>
    </div>
  )
}
