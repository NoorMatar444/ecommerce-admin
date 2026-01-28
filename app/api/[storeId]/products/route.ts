import { NextResponse } from "next/server";


import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // const { userId } = auth();

    const body = await req.json();

    const {
      name,
      priceEGP,
      priceAED,
      categoryId,
      colorId,
      images,
      isBestSeller,
      isPromo,

    } = body;

    // if (!userId) {
    //   return new NextResponse("Unauthenticated", { status: 403 });
    // }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!priceAED) {
      return new NextResponse("Price in AED is required", { status: 400 });
    }
    if (!priceEGP) {
      return new NextResponse("Price in EGP is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        // userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        priceEGP,
        priceAED,
        isBestSeller,
        isPromo,
        categoryId,
        colorId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: images.map(
              (image: { url: string; primary: boolean }) => image
            ),
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
    const sortByPrice = searchParams.get("sortByPrice");

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        color: isFeatured ? { isFeatured: true } : undefined,

      },
      include: {
        images: true,
        category: true,
        color: true,
      },
      orderBy: {
        priceEGP: searchParams.get("sortByPrice") === "desc" ? "desc" : "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
