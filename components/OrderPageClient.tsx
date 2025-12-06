'use client';

import OrderHeader from "./OrderHeader";
import OrderMarketInfo from "./OrderMarketInfo";
import OrderItemsList from "./OrderItemsList";
import OrderSummary from "./OrderSummary";
import OrderDeliveryInfo from "./OrderDeliveryInfo";
import { OrderDetails, OrderItem } from "@/types";

interface OrderPageClientProps {
  order: OrderDetails;
  items: OrderItem[];
}

export default function OrderPageClient({ order, items }: OrderPageClientProps) {
  return (
    <div className="min-h-screen bg-gray-100 font-sans pb-10">
      <OrderHeader 
        status={order.status} 
        orderNumber={order.order_number} 
        date={order.created_at} 
      />

      <div className="max-w-md mx-auto space-y-2 mt-2">
        <OrderMarketInfo 
          name={order.market_name} 
          logoUrl={order.market_logo} 
          branchName={order.branch_name} 
        />

        <OrderItemsList items={items} />

        <OrderSummary 
          total={order.total_price} 
          deliveryFee={order.delivery_fee} 
          discount={order.discount} 
        />

        <OrderDeliveryInfo order={order} />
      </div>
    </div>
  );
}