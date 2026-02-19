import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"; // أضف هذا
import { authOptions } from "@/lib/auth"; // أضف هذا

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
  // بدلاً من auth()، نستخدم getServerSession الخاصة بـ Next-Auth
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    redirect("/api/auth/signin"); // التوجيه لصفحة تسجيل الدخول الخاصة بـ Next-Auth
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
           {/* يمكنك إضافة زر تسجيل الخروج هنا لاحقاً */}
           <span className="text-sm font-medium">{session?.user?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

