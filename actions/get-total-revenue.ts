import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.orderCod.findMany({
    where: {
      storeId,
        },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.priceEGP.toNumber();
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};