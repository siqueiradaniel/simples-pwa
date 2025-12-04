import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='w-full flex items-center justify-center bg-white py-4'>
      {/* Wrapper com o estilo visual desejado */}
      <div className='w-11/12 flex flex-row items-center gap-3 border border-gray-200 rounded-lg px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all'>
        <Search className='text-blue-400' size={20}/>
        
        {/* Input totalmente limpo */}
        <Input
          type="text"
          placeholder="Busque por produto"
          aria-label="Search products"
          className="flex-1 border-none shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none bg-transparent text-gray-700 placeholder:text-gray-400 text-sm h-auto py-1.5 px-0 min-w-0"
        />
      </div>
    </div>
  )
}

export default SearchBar