import prismadb from "@/lib/prismadb";

export const getStockCount = async (storeId: string) => {
  const stockCount = await prismadb.color.count({
    where: {
      storeId,
      isArchived: false,
    }
  });

  return stockCount;
};