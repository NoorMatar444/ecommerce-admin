"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderCodColumn } from "./columns";

interface OrderCodClientProps {
  data: OrderCodColumn[];
}

export const OrderCodClient: React.FC<OrderCodClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading title={`Orders COD (${data.length})`} description="Manage orders for your store" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};