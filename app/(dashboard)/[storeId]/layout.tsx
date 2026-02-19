import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar"; // 1. استدعاء النافبار

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { storeId: string }
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  const userId = (session.user as any).id;

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar /> {/* 2. وضع النافبار هنا ليظهر في الأعلى */}
      {children}
    </>
  );
}