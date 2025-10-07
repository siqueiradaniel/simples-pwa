import { Client } from '@/types'

export const clientsData: Client[] = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@barbearia.com",
        passwordHash: "client_hash_admin", // senha: admin
        role: 'ADMIN'
    },
    {
        id: 2,
        name: "Maria Oliveira",
        email: "maria@email.com",
        passwordHash: "client_hash_maria123", // senha: maria123
        role: 'CLIENT'
    },
    {
        id: 3,
        name: "José Santos",
        email: "jose@email.com",
        passwordHash: "client_hash_jose123", // senha: jose123
        role: 'CLIENT'
    },
    {
        id: 4,
        name: "Ana Costa",
        email: "ana@email.com",
        passwordHash: "client_hash_ana123", // senha: ana123
        role: 'CLIENT'
    },
    {
        id: 5,
        name: "Lucas Silva",
        email: "lucas@email.com",
        passwordHash: "client_hash_lucas123", // senha: lucas123
        role: 'CLIENT'
    }
]
