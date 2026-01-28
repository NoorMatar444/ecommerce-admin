import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://ayatfahiem.com",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productIds, quantities, currency } = await req.json();

  if (!productIds || productIds.length === 0 || !quantities || quantities.length !== productIds.length) {
    return new NextResponse("Product ids and quantities are required and must match", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product, index) => {
    let unit_amount;
    if (currency === 'AED') {
      unit_amount = product.priceAED.toNumber() * 100;
    } ;

    line_items.push({
      quantity: quantities[index],
      price_data: {
        currency: 'AED',
        product_data: {
          name: product.name,
        },
        unit_amount: unit_amount
      }
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string, ) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled`,
    metadata: {
      orderId: order.id
    },
  });

  return NextResponse.json({ url: session.url }, {
    headers: corsHeaders
  });
};