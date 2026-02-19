"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
      <button 
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}