'use client';

import { useState } from "react";
import { User, Phone, Calendar, Mail, Lock, Eye, EyeOff, Briefcase, Loader2, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserProfile, updateUser, updateUserPassword } from "@/lib/api/user";

interface UserDataFormProps {
  profile: UserProfile;
  email: string;
}

export default function UserDataForm({ profile, email }: UserDataFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado dos dados do perfil
  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    phone_number: profile.phone_number || '',
    birth_date: profile.birth_date || '',
  });

  // Estado das senhas
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Atualiza Perfil
      await updateUser(profile.id, {
        full_name: formData.full_name,
        phone_number: formData.phone_number,
        birth_date: formData.birth_date,
      });

      // 2. Atualiza Senha (Se o usuário preencheu)
      if (passwords.newPassword) {
        if (passwords.newPassword.length < 6) {
          throw new Error("A nova senha deve ter pelo menos 6 caracteres.");
        }
        if (passwords.newPassword !== passwords.confirmPassword) {
          throw new Error("As senhas não coincidem.");
        }
        await updateUserPassword(passwords.newPassword);
        setPasswords({ newPassword: '', confirmPassword: '' }); // Limpa campos
        toast.success("Perfil e senha atualizados!");
      } else {
        toast.success("Dados atualizados com sucesso!");
      }

      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao atualizar dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-10">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3 sticky top-0 bg-white z-20 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-blue-900">Meus Dados</h1>
      </div>

      <div className="p-5 space-y-8">
        
        {/* Seção: Meus Dados */}
        <section className="space-y-5">
          <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide border-l-4 border-blue-500 pl-2">
            Informações Pessoais
          </h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <User size={12} /> Nome Completo
              </label>
              <Input 
                value={formData.full_name}
                onChange={e => setFormData({...formData, full_name: e.target.value})}
                className="h-11 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Phone size={12} /> Telefone
              </label>
              <Input 
                value={formData.phone_number}
                onChange={e => setFormData({...formData, phone_number: e.target.value})}
                className="h-11 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Calendar size={12} /> Data de Nascimento
              </label>
              <Input 
                type="date"
                value={formData.birth_date || ''}
                onChange={e => setFormData({...formData, birth_date: e.target.value})}
                className="h-11 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5 opacity-75">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Mail size={12} /> Email
              </label>
              <div className="relative">
                <Input 
                  value={email}
                  readOnly
                  className="h-11 bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                />
                <Lock size={14} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1.5 opacity-75">
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                <Briefcase size={12} /> Tipo de Conta
              </label>
              <div className="relative">
                <Input 
                  value={
                    profile.user_role === 'MANAGER' ? 'Gerente' : 
                    profile.user_role === 'ADMIN' ? 'Administrador' : 
                    profile.user_role === 'STAFF' ? 'Funcionário' : 
                    'Cliente'
                  }
                  readOnly
                  className="h-11 bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                />
                <Lock size={14} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Seção: Alterar Senha */}
        <section className="space-y-5">
          <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide border-l-4 border-blue-500 pl-2">
            Segurança
          </h2>
          <p className="text-xs text-gray-500 -mt-3">Preencha apenas se desejar alterar sua senha.</p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Nova Senha</label>
              <div className="relative">
                <Input 
                  value={passwords.newPassword}
                  onChange={e => setPasswords({...passwords, newPassword: e.target.value})}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nova senha (min. 6 caracteres)"
                  className="h-11 bg-white border-gray-200 focus-visible:ring-blue-500 pr-10"
                />
                <button 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Confirmar Nova Senha</label>
              <div className="relative">
                <Input 
                  value={passwords.confirmPassword}
                  onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repita a nova senha"
                  className="h-11 bg-white border-gray-200 focus-visible:ring-blue-500 pr-10"
                />
                <button 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Botão Salvar */}
        <div className="pt-4 pb-12">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>

      </div>
    </div>
  );
}