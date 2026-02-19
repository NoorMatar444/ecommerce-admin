import { NextResponse } from "next/server";


import prismadb from "@/lib/prismadb";

export async function DELETE(
    req: Request,
    { params }: { params: { orderCodId: string, storeId: string } }
  ) {
    try {
      // const { userId } = auth();

      // if (!userId) {
      //   return new NextResponse("Unauthenticated", { status: 403 });
      // }

      if (!params.orderCodId) {
        return new NextResponse("OrderCod id is required", { status: 400 });
      }

      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          // userId,
        }
      });

      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }
      const orderExists = await prismadb.orderCod.findUnique({
        where: {
          id: params.orderCodId
        },
      });

      if (!orderExists) {
        return new NextResponse("Order not found", { status: 404 });
      }

      const OrderCod = await prismadb.orderCod.delete({
        where: {
          id: params.orderCodId
        }
      });

      return NextResponse.json(OrderCod);
    } catch (error) {
      console.log('[ORDER_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
