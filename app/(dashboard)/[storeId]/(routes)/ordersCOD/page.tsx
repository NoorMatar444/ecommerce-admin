import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { OrderCodColumn } from "./components/columns";
import { OrderCodClient } from "./components/client";

const OrdersCodPage = async ({ params }: { params: { storeId: string } }) => {
  const orderCods = await prismadb.orderCod.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderCodColumn[] = orderCods.map((item) => {
    return {
      id: item.id,
      city: item.city,
      phoneNumber: item.phoneNumber.toString(),
      quantity: item.orderItems
        .map(orderItem => `${orderItem.product.name} x ${orderItem.quantity}`)
        .join(", "),
      address: item.address,
      notes: item.notes,
      email: item.email,
      floor: item.floor,
      building: item.building,
      apartment: item.apartment,
      discountPercentage: item.discountPercentage,
      whatsPhoneNumber: item.whatsPhoneNumber.toString(),
      region: item.region,
      fullName: item.fullName,
      country: item.country,
      instaPay: item.instaPay,
      products: item.orderItems
        .map((orderItem) => orderItem.product.name)
        .join(", "),
      totalPrice: parseFloat(item.totalPrice.toString()),
      deliveryFee: parseFloat(item.deliveryFee.toString()),
      originalTotalPrice: parseFloat(item.originalTotalPrice.toString()),
      savings: parseFloat(item.savings.toString()),
      appliedPromoCode: item.appliedPromoCode,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderCodClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersCodPage;
