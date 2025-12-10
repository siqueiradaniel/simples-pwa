'use client'

import React from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { UIProduct } from '../types'
import { useCartStore } from '@/lib/store/cartStore'

const ProductCard = ({ product }: { product: UIProduct }) => {
  // SELETOR ESPECÍFICO: Só re-renderiza se a quantidade deste ID mudar.
  // Isso é MUITO mais performático que o Context API padrão.
  const quantity = useCartStore(state => 
    state.items.find(i => i.product_id === (product.product_id || product.product_id))?.quantity || 0
  );
  
  // Pegamos as ações (funções são estáveis, não causam re-render)
  const addItem = useCartStore(state => state.addItem);
  const removeItem = useCartStore(state => state.removeItem);
  const isLoading = useCartStore(state => state.isLoading);

  const productId = product.product_id || product.product_id;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.sell_price);

  return (
    <div className='min-w-[150px] w-[150px] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col p-3 relative snap-start transition-all hover:shadow-md'>
      {/* Imagem */}
      <div className='w-full h-28 mb-2 flex items-center justify-center relative'>
        <img 
          src={product.image_url} 
          alt={product.name}
          className="max-h-full max-w-full object-contain mix-blend-multiply"
          onError={(e) => {
             (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Prod';
          }}
        />
      </div>

      {/* Info */}
      <div className='flex flex-col flex-1 gap-1'>
        <h3 className='text-gray-700 font-semibold text-xs leading-tight line-clamp-2 h-[2.4em]'>
          {product.name}
        </h3>
        <span className='text-gray-400 text-[10px]'>{product.unit}</span>
        
        {/* Preço e Botão */}
        <div className='mt-auto pt-2 flex items-center justify-between'>
          <span className='text-cyan-600 font-bold text-sm'>
            {formattedPrice}
          </span>
          
          {quantity === 0 ? (
            <button 
              onClick={() => addItem(product)}
              disabled={isLoading}
              className='bg-cyan-500 active:bg-cyan-600 text-white rounded-lg w-7 h-7 flex items-center justify-center transition-colors shadow-sm disabled:opacity-50'
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          ) : (
            <div className='flex items-center bg-cyan-500 rounded-lg h-7 overflow-hidden shadow-sm'>
              <button 
                onClick={() => removeItem(productId)}
                className='w-7 h-full flex items-center justify-center text-white active:bg-cyan-600 hover:bg-cyan-600 transition-colors'
              >
                {quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} strokeWidth={3} />}
              </button>
              
              <span className='text-white text-[10px] font-bold w-4 text-center select-none'>
                {quantity}
              </span>
              
              <button 
                onClick={() => addItem(product)}
                className='w-7 h-full flex items-center justify-center text-white active:bg-cyan-600 hover:bg-cyan-600 transition-colors'
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard