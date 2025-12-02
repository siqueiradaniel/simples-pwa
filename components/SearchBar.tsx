import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='w-full flex items-center justify-center bg-white py-4'>
      <div className='w-11/12 flex flex-row items-center gap-3 border border-gray-200 rounded-lg px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all'>
        <Search className='text-blue-400' size={20}/>
        <input
          type="text"
          placeholder="Busque por produto"
          aria-label="Search products"
          className="flex-1 outline-none placeholder:text-gray-400 text-gray-700 bg-transparent text-sm"
        />
      </div>
    </div>
  )
}

export default SearchBar