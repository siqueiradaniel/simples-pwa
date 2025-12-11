'use client';

import { useState } from "react";
import UserListHeader from "./UserListHeader";
import UserManagementCard from "./UserManagementCard";
import { SupermarketUser } from "@/types";
import { Users } from "lucide-react";

export default function UsersPageClient({ users }: { users: SupermarketUser[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone_number.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-6">
      <UserListHeader 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        totalCount={filteredUsers.length} 
      />

      <div className="px-4 mt-4 flex flex-col gap-3">
        {filteredUsers.map((user) => (
          <UserManagementCard key={user.id} user={user} />
        ))}

        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
                <Users size={32} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium text-gray-600">Nenhum usuário encontrado.</p>
            <p className="text-xs mt-1 opacity-60">Tente buscar por outro termo.</p>
          </div>
        )}
      </div>
    </div>
  );
}