'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/auth-schemas";
import { loginAction } from "@/app/auth/actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    startTransition(async () => {
      const result = await loginAction(data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login realizado com sucesso!");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             {/* Ajuste o caminho do seu logo */}
             <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
               <span className="text-white font-bold text-2xl">S</span>
             </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
          <p className="text-gray-500 text-sm mt-2">Acesse sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="seu@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? <Loader2 className="animate-spin mr-2" /> : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}