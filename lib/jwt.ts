import { AuthUser } from '@/types/auth'

const JWT_SECRET = 'your-secret-key-here' // Em produção, usar variável de ambiente

export const generateToken = (user: AuthUser): string => {
    // Simulação simples de JWT (em produção, usar biblioteca como jsonwebtoken)
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        type: user.type,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 horas
    }
    
    return btoa(JSON.stringify(payload))
}

export const verifyToken = (token: string): AuthUser | null => {
    try {
        const payload = JSON.parse(atob(token))
        
        // Verificar se o token não expirou
        if (payload.exp < Date.now()) {
            return null
        }
        
        return {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            type: payload.type
        }
    } catch {
        return null
    }
}
