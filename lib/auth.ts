import { LoginCredentials, AuthUser, RegisterData } from '@/types/auth'
import { clientsApi } from '@/lib/api/clients'
import { barbersApi } from '@/lib/api/barbers'
import { generateToken } from '@/lib/jwt'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Função para verificar senha (simula hash checking)
const verifyPassword = (inputPassword: string, hashedPassword: string): boolean => {
    // Para desenvolvimento, extraímos a senha do hash
    // Em produção, usaríamos bcrypt ou similar
    
    if (hashedPassword === 'client_hash_admin') {
        return inputPassword === 'admin'
    }
    
    // Para outros usuários, extrair senha do formato "prefix_hash_SENHA"
    const parts = hashedPassword.split('_')
    if (parts.length >= 3) {
        const expectedPassword = parts[2] // extrai "maria123", "joao123", etc.
        return inputPassword === expectedPassword
    }
    
    return false
}

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<{ user: AuthUser; token: string } | null> => {
        await delay(800)
        
        if (credentials.userType === 'client') {
            const client = await clientsApi.getByEmail(credentials.email)
            
            if (client && verifyPassword(credentials.password, client.passwordHash)) {
                const user: AuthUser = {
                    id: client.id,
                    name: client.name,
                    email: client.email,
                    role: client.role,
                    type: 'client'
                }
                
                const token = generateToken(user)
                return { user, token }
            }
        } else {
            const barber = await barbersApi.getByEmail(credentials.email)
            
            if (barber && verifyPassword(credentials.password, barber.passwordHash)) {
                const user: AuthUser = {
                    id: barber.id,
                    name: barber.name,
                    email: barber.email,
                    role: 'BARBER',
                    type: 'barber'
                }
                
                const token = generateToken(user)
                return { user, token }
            }
        }
        
        return null
    },

    register: async (data: RegisterData): Promise<{ user: AuthUser; token: string }> => {
        await delay(1000)
        
        // Gerar hash da senha (simulado)
        const passwordHash = `client_hash_${data.password}`
        
        const newClient = await clientsApi.create({
            name: data.name,
            email: data.email,
            passwordHash,
            role: data.role || 'CLIENT'
        })
        
        const user: AuthUser = {
            id: newClient.id,
            name: newClient.name,
            email: newClient.email,
            role: newClient.role,
            type: 'client'
        }
        
        const token = generateToken(user)
        return { user, token }
    }
}
