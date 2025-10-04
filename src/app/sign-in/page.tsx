"use client";

import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginHeader } from "@/components/auth/LoginHeader";
import Link from "next/link";

const SigninPage = () => {
  return (
    <div className="bg-gray-50 w-screen h-screen flex flex-col">
      <div className="w-full max-w-md m-auto">
        <LoginHeader />

        <div className="bg-white w-110 shadow-xl p-6 rounded-sm mx-auto pt-10">
          <GoogleLoginButton />

          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">atau</span>
              </div>
            </div>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-gray-600 mt-5">
            Belum punya akun?
            <Link
              href="/register"
              className="text-black font-medium hover:text-gray-700"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
