import { Search } from 'lucide-react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className='w-full flex items-center justify-center bg-white pb-4'>
      <div className='w-11/12 flex flex-row items-center gap-3 border border-gray-200 rounded-sm px-3 py-2'>
        <Search className='text-blue-400'/>
        <input
          type="text"
          placeholder="Busque por produto"
          aria-label="Search products"
          className="flex-1 outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  )
}

export default SearchBar