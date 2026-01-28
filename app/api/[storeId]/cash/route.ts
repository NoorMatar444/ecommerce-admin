import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://ayatfahiem.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  await OPTIONS();

  const {
    productIds,
    quantities,
    fullName,
    phoneNumber,
    whatsPhoneNumber,
    city,
    address,
    floor,
    apartment,
    building,
    email,
    totalPrice,
    region,
    discountPercentage,
    appliedPromoCode,
    deliveryFee,
    originalTotalPrice,
    savings,
    notes,
    instaPay,
  } = await req.json();

  if (
    !productIds ||
    productIds.length === 0 ||
    !quantities ||
    quantities.length !== productIds.length ||
    !fullName ||
    !phoneNumber ||
    !whatsPhoneNumber ||
    !city ||
    !region ||
    !address ||
    floor === null ||
    floor === undefined ||
    !building ||
    apartment === null ||
    apartment === undefined ||
    !email ||
    !deliveryFee ||
    !originalTotalPrice
  ) {
    return new NextResponse(
      "All fields are required and product ids and quantities must match",
      { status: 400 }
    );
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
    include: {
      color: true,
    },
  });

  if (products.length !== productIds.length) {
    return new NextResponse("One or more product IDs are invalid", {
      status: 400,
    });
  }

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];

    const product = products.find((p) => p.id === productId);

    if (product && product.color) {
      const newStock = product.color.stock - quantity;

      await prismadb.color.update({
        where: { id: product.color.id },
        data: {
          stock: newStock,
        },
      });

      if (newStock === 0) {
        await prismadb.color.update({
          where: { id: productId },
          data: {
            isArchived: true,
          },
        });
      }
    } else {
      console.log(`Product or color with ID ${productId} not found`);
    }
  }

  const orderCod = await prismadb.orderCod.create({
    data: {
      storeId: params.storeId,
      orderItems: {
        create: productIds.map((productId: string, index: number) => ({
          product: {
            connect: {
              id: productId,
            },
          },
          quantity: quantities[index],
        })),
      },
      fullName: fullName,
      phoneNumber: phoneNumber,
      whatsPhoneNumber: whatsPhoneNumber,
      city: city,
      address: address,
      region: region,
      email: email,
      floor: floor,
      apartment: apartment,
      building: building,
      totalPrice: totalPrice,
      discountPercentage: discountPercentage,
      appliedPromoCode: appliedPromoCode,
      deliveryFee: deliveryFee,
      originalTotalPrice: originalTotalPrice,
      savings: savings,
      notes: notes,
      instaPay: instaPay,

    },
  });

  return NextResponse.json(
    { totalPrice, orderId: orderCod.id },
    { headers: corsHeaders }
  );
}
