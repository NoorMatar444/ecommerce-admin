import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getFormatter } from "@/lib/utils";

import { OrderColumn } from "./components/columns"
import { OrderClient } from "./components/client";


const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => {
    let totalPriceEGP = 0;
    let totalPriceAED = 0;

    

    return {
      id: item.id,
      phone: item.phone,
      quantity: item.orderItems.reduce((total, orderItem) => total + orderItem.quantity, 0),
      address: item.address,
      products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
      totalPriceEGP: getFormatter('EGP').format(totalPriceEGP),
      totalPriceAED: getFormatter('AED').format(totalPriceAED),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;