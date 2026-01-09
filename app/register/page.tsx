'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/auth-schemas";
import { registerAction } from "@/app/auth/actions";
import { useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    startTransition(async () => {
      const result = await registerAction(data);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Conta criada! Redirecionando...");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Crie sua conta</h1>
          <p className="text-gray-500 text-sm mt-2">Comece a comprar agora mesmo</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              {...register("fullName")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Daniel Siqueira"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              {...register("phone")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="(11) 99999-9999"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="seu@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center disabled:opacity-70"
          >
            {isPending ? <Loader2 className="animate-spin mr-2" /> : "Criar Conta"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Já tem conta?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Faça Login
          </Link>
        </div>
      </div>
    </div>
  );
}