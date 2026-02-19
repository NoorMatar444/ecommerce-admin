import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // تأكد من المسار الصحيح
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    
  

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // نستخدم المعرف الموجود في السsession (تأكدنا من وجوده في خطوة lib/auth السابقة)
    const userId = (session.user as any).id;

    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}