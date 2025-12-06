'use client';

import { useState } from "react";
import { ChevronLeft, MapPin, Home, Briefcase, MoreHorizontal, Loader2, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Address } from "@/types";
import { saveAddress, linkAddressToUser } from "@/lib/api/address";

interface AddressFormClientProps {
  initialData?: Address; // Opcional, vem preenchido na edição
  userId: number; // Passado pelo Server Component
}

export default function AddressFormClient({ initialData, userId }: AddressFormClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<Address>({
    id: initialData?.id, // Mantém o ID se for edição
    cep: initialData?.cep || "",
    street: initialData?.street || "",
    number: initialData?.number || 0,
    neighborhood: initialData?.neighborhood || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    complement: initialData?.complement || "",
    reference: initialData?.reference || "",
  });

  const [labelType, setLabelType] = useState("Casa");
  const [customLabel, setCustomLabel] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  const handleCepBlur = async () => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          }));
        }
      } catch (error) {
        console.error("Erro CEP", error);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Salva/Atualiza o endereço físico
      const savedAddress = await saveAddress({
        ...formData, 
        number: Number(formData.number)
      });

      if (savedAddress && savedAddress.id) {
        // 2. Cria/Atualiza vínculo com usuário
        await linkAddressToUser(
          userId, 
          savedAddress.id, 
          labelType === "Outro" ? customLabel : labelType, 
          isDefault
        );

        alert("Endereço salvo!");
        router.back(); // Volta para a tela anterior (lista ou perfil)
        router.refresh(); // Atualiza os dados da tela anterior
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-10">
      <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-3 sticky top-0 bg-white z-20">
        <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-50 rounded-full">
          <ChevronLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-blue-900">
          {initialData ? "Editar Endereço" : "Adicionar Endereço"}
        </h1>
      </div>

      <div className="p-5 space-y-6">
        <div className="w-full h-40 bg-blue-50 rounded-2xl border border-blue-100 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-blue-200/50 pattern-grid-lg" />
          <div className="z-10 bg-white px-4 py-2 rounded-full shadow-sm text-xs font-semibold text-blue-600 flex items-center gap-2">
            <MapPin size={14} />
            Escolha no mapa
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">CEP</label>
              <div className="relative">
                <Input 
                  value={formData.cep}
                  onChange={e => setFormData({...formData, cep: e.target.value})}
                  onBlur={handleCepBlur}
                  placeholder="00000-000"
                  className="h-11 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
                />
                {loadingCep && <Loader2 size={16} className="absolute right-3 top-3 animate-spin text-blue-500" />}
              </div>
            </div>
            <div className="space-y-1.5 opacity-80">
              <label className="text-xs font-bold text-gray-500 uppercase">Cidade/UF</label>
              <Input 
                value={formData.city ? `${formData.city}/${formData.state}` : ''}
                readOnly
                placeholder="..."
                className="h-11 bg-gray-100 border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_100px] gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Rua</label>
              <Input 
                value={formData.street}
                onChange={e => setFormData({...formData, street: e.target.value})}
                placeholder="Rua"
                className="h-11 bg-gray-50 border-gray-200"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Número</label>
              <Input 
                type="number"
                value={formData.number || ''}
                onChange={e => setFormData({...formData, number: Number(e.target.value)})}
                placeholder="123"
                className="h-11 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase">Bairro</label>
            <Input 
              value={formData.neighborhood}
              onChange={e => setFormData({...formData, neighborhood: e.target.value})}
              placeholder="Bairro"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase">Complemento</label>
            <Input 
              value={formData.complement || ''}
              onChange={e => setFormData({...formData, complement: e.target.value})}
              placeholder="Ap. 101 (Opcional)"
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="border-t border-gray-100 my-6"></div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-blue-900">Salvar como:</label>
          <div className="flex gap-3">
            {['Casa', 'Trabalho', 'Outro'].map((type) => {
              const active = labelType === type;
              const icons = { Casa: Home, Trabalho: Briefcase, Outro: MoreHorizontal };
              const Icon = icons[type as keyof typeof icons];
              return (
                <button
                  key={type}
                  onClick={() => setLabelType(type)}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                    active ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                  <span className="text-xs font-medium">{type}</span>
                </button>
              )
            })}
          </div>
          {labelType === 'Outro' && (
            <Input 
              value={customLabel}
              onChange={e => setCustomLabel(e.target.value)}
              placeholder="Ex: Casa da Praia"
              className="h-11 bg-white border-blue-200"
            />
          )}
        </div>

        <div 
          className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer"
          onClick={() => setIsDefault(!isDefault)}
        >
          <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${isDefault ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
            {isDefault && <Check size={16} className="text-white" />}
          </div>
          <span className="text-sm font-medium text-gray-700">Usar como principal</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-900 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 size={18} className="animate-spin" />}
          {isSubmitting ? "Salvando..." : "Salvar Endereço"}
        </button>
      </div>
    </div>
  );
}