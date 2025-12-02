import { BranchProduct } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product }: { product: BranchProduct }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(0, prev - 1));

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.sellPrice);

  return (
    <div className='min-w-[150px] w-[150px] bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col p-3 relative snap-start'>
      {/* Imagem */}
      <div className='w-full h-28 mb-2 flex items-center justify-center'>
        <img 
          src={product.productImage} 
          alt={product.productName}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
             (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Prod';
          }}
        />
      </div>

      {/* Info */}
      <div className='flex flex-col flex-1 gap-1'>
        <h3 className='text-gray-700 font-semibold text-xs leading-tight line-clamp-2 h-[2.4em]'>
          {product.productName}
        </h3>
        <span className='text-gray-400 text-[10px]'>{product.unit}</span>
        
        {/* Preço e Botão */}
        <div className='mt-auto pt-2 flex items-center justify-between'>
          <span className='text-cyan-600 font-bold text-sm'>
            {formattedPrice}
          </span>
          
          {quantity === 0 ? (
            <button 
              onClick={handleIncrement}
              className='bg-cyan-500 active:bg-cyan-600 text-white rounded-lg w-7 h-7 flex items-center justify-center transition-colors shadow-sm'
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          ) : (
            <div className='flex items-center bg-cyan-500 rounded-lg h-7 overflow-hidden shadow-sm'>
              <button 
                onClick={handleDecrement}
                className='w-7 h-full flex items-center justify-center text-white active:bg-cyan-600'
              >
                {quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} strokeWidth={3} />}
              </button>
              
              <span className='text-white text-[10px] font-bold w-4 text-center'>
                {quantity}
              </span>
              
              <button 
                onClick={handleIncrement}
                className='w-7 h-full flex items-center justify-center text-white active:bg-cyan-600'
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