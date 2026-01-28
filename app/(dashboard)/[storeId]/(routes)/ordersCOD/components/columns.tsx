"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderCodColumn = {
  id: string;
  quantity: string;
  fullName: string;
  city: string;
  address: string;
  region: string;
  phoneNumber: string;
  whatsPhoneNumber: string;
  totalPrice: number;
  products: string;
  createdAt: string;
  floor: number;
  apartment: number;
  building: string;
  discountPercentage: number;
  deliveryFee: number;
  originalTotalPrice: number;
  appliedPromoCode: string;
  savings: number;
  email: string;
  notes: string;
  instaPay: boolean;
};

export const columns: ColumnDef<OrderCodColumn>[] = [

  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "city",
    header: "City",
  },

  {
    accessorKey: "address",
    header: "Address",
  },

  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "whatsPhoneNumber",
    header: "Whatsapp Number",
  },
  {
    accessorKey: "building",
    header: "Building",
  },
  {
    accessorKey: "floor",
    header: "Floor",
  },

  {
    accessorKey: "apartment",
    header: "Apartment",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "products",
    header: "Purchased Products",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "originalTotalPrice",
    header: "Original Price",
  },
  {
    accessorKey: "totalPrice",
    header: "Price with promo",
  },
  {
    accessorKey: "instaPay",
    header: "Paid by instapay",
  },
  {
    accessorKey: "savings",
    header: "Saved Value",
  },
  {
    accessorKey: "appliedPromoCode",
    header: "Promo Code",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount ",
  },
  {
    accessorKey: "deliveryFee",
    header: "Delivery",
  },

  {
    accessorKey: "createdAt",
    header: "Created at",

  },
  {
    accessorKey: "id",
    header: "Order ID",
  },

];
