import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"; // استيراد ضروري
import { authOptions } from "@/lib/auth";     // استيراد إعدادات المصادقة

import prismadb from "@/lib/prismadb";
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  }
};

const SettingsPage: React.FC<SettingsPageProps> = async ({
  params
}) => {
  // ✅ 1. استخدام الطريقة الصحيحة لجلب المستخدم في NextAuth
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  // ✅ 2. التحقق من وجود المستخدم
  if (!userId) {
    redirect('/api/auth/signin'); // توجيه لصفحة دخول NextAuth
  }

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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}

export default SettingsPage;