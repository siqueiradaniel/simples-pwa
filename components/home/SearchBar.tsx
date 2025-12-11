'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
}

const SearchBar = ({ value, onChange, readOnly = false, autoFocus = false }: SearchBarProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (readOnly) {
      router.push('/search');
    }
  };

  return (
    <div className='w-full flex items-center justify-center bg-white py-4 sticky top-0 z-40'>
      <div 
        className='w-11/12 flex flex-row items-center gap-3 border border-gray-200 rounded-lg px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all bg-white'
        onClick={handleClick}
      >
        <Search className='text-blue-400' size={20}/>
        
        <Input
          type="text"
          placeholder="Busque por produto"
          aria-label="Search products"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          autoFocus={autoFocus}
          className={`flex-1 border-none shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none bg-transparent text-gray-700 placeholder:text-gray-400 text-sm h-auto py-1.5 px-0 min-w-0 ${readOnly ? 'cursor-pointer' : ''}`}
        />
      </div>
    </div>
  )
}

export default SearchBar