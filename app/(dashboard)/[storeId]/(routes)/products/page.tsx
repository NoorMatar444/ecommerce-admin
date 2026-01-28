import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { getFormatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,

    priceEGP: getFormatter("EGP").format(item.priceEGP.toNumber()),
    priceAED: getFormatter("AED").format(item.priceAED.toNumber()),
    category: item.category.name,
    color: item.color.value,
    stock: item.color.stock,
    stockAED: item.color.stockAED,
    isFeatured: item.color.isFeatured,
    isArchived: item.color.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
