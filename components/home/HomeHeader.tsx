import React from 'react'
import { MapPin, Clock, Info } from 'lucide-react'
import { SupermarketChain } from '../types'

const HomeHeader = () => {
  // Mock data - idealmente viria via props ou contexto
  const supermarket: SupermarketChain = {
    id: 1,
    cnpj: '12.345.678/0001-90',
    name: 'Ideal Supermercado',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQ43uI7GMUYk4kBWt6ReJaLOPNEADvfRBYg&s',
    deliveryEndTime: 18, // Mudado para 18h para exemplo
    minimumOrderValue: 80,
  }

  return (
    <div className='bg-white pb-2'>
      {/* Faixa Superior Azul */}
      <div className='bg-cyan-500 pt-8 pb-12 px-4 shadow-sm relative'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col text-white'>
            <span className='text-cyan-100 text-xs font-semibold uppercase tracking-wider mb-1'>Bem-vindo ao</span>
            <h1 className='text-2xl font-extrabold tracking-tight leading-none'>
              {supermarket.name}
            </h1>
            
            <div className='flex items-center gap-1 mt-2 text-cyan-50 text-xs font-medium bg-cyan-600/30 px-2 py-1 rounded-full w-fit'>
              <MapPin size={12} />
              <span>Entregamos na sua região</span>
            </div>
          </div>

          {/* Logo Flutuante (Placeholder visual se a imagem falhar) */}
          <div className='bg-white p-1 rounded-2xl shadow-lg'>
             <img 
              className='rounded-xl object-cover h-14 w-14' 
              src={supermarket.logoUrl} 
              alt="Logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/80x80?text=Logo';
              }}
            />
          </div>
        </div>
      </div>

      {/* Card de Informações Flutuante */}
      <div className='mx-4 -mt-6 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-gray-100 p-3 flex justify-between items-center relative z-10'>
        
        {/* Info 1: Horário */}
        <div className='flex items-center gap-3 flex-1 border-r border-gray-100 pr-2'>
          <div className='bg-blue-50 p-2 rounded-full text-blue-600'>
            <Clock size={16} />
          </div>
          <div className='flex flex-col'>
            <span className='text-[10px] text-gray-400 font-bold uppercase'>Entregas até</span>
            <span className='text-xs font-bold text-gray-800'>{supermarket.deliveryEndTime}h</span>
          </div>
        </div>

        {/* Info 2: Pedido Mínimo */}
        <div className='flex items-center gap-3 flex-1 pl-4'>
          <div className='bg-green-50 p-2 rounded-full text-green-600'>
            <Info size={16} />
          </div>
          <div className='flex flex-col'>
            <span className='text-[10px] text-gray-400 font-bold uppercase'>Pedido Mínimo</span>
            <span className='text-xs font-bold text-gray-800'>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(supermarket.minimumOrderValue)}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomeHeader