'use server'

import { supabaseServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema, LoginInput, RegisterInput } from "@/lib/auth-schemas";

export async function loginAction(data: LoginInput) {
  // 1. Validação no Servidor (Dupla checagem)
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return { error: "Dados inválidos." };
  }

  const supabase = await supabaseServer();
  
  // 2. Login via Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    return { error: "Email ou senha incorretos." }; // Mensagem genérica por segurança
  }

  // 3. Atualiza cache e redireciona
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function registerAction(data: RegisterInput) {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return { error: "Dados inválidos." };
  }

  const supabase = await supabaseServer();

  // 1. Cria usuário
  // Importante: Passamos os metadados (full_name) aqui para o Trigger do banco pegar
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: {
      data: {
        full_name: result.data.fullName,
        phone: result.data.phone, // Opcional, se seu trigger suportar
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/'); // Ou redirecionar para uma página de "Verifique seu email" se estiver ativado
}

export async function logoutAction() {
  const supabase = await supabaseServer();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}