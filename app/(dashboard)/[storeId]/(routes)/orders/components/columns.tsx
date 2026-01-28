"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string;
  phone: string;
  quantity: number;
  address: string;
  isPaid: boolean;
  totalPriceEGP: string;
  totalPriceAED: string;
  products: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPriceEGP",
    header: "Total price (EGP)",
  },
  {
    accessorKey: "totalPriceAED",
    header: "Total price (AED)",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];