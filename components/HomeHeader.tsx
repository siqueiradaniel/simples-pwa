import React from 'react'
import { SupermarketChain } from '@/types'

const HomeHeader = () => {
  const supermarket: SupermarketChain = {
    id: 1,
    cnpj: '12.345.678/0001-90',
    name: 'Ideal Supermercado',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsJhmCTQ5IgJ80OBgJV-krQbX9ONZ2L4iWMQ&s',
    deliveryEndTime: 8,
    minimumOrderValue: 80,
  }

  return (
    <div className='w-full flex flex-row justify-between items-center bg-white '>
      <div className='flex flex-col p-4 gap-3'>
        <p className='text-black text-2xl'>
          {supermarket.name}
        </p>
        <div>
          <p className='text-gray-500 text-sm'>
            Entregas até {supermarket.deliveryEndTime}h 
          </p>
          <p className='text-gray-500 text-sm'>
            Pedido min. a partir de R$ {supermarket.minimumOrderValue}
          </p>
        </div>
      </div>
      <div className='py-2 px-4'>
        <img 
          className='rounded-xl object-cover h-16 w-16 bg-gray-100' 
          src={supermarket.logoUrl} 
          width={80}
          alt="Logo Supermercado"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/80x80?text=Logo';
          }}
        />
      </div>
    </div>
  )
}

export default HomeHeader