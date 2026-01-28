import prismadb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prismadb.orderCod.count({
    where: {
      storeId,
    },
  });

  return salesCount;
};