'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthUser } from '@/types/auth'
import { verifyToken } from '@/lib/jwt'

type AuthContextType = {
    user: AuthUser | null
    login: (user: AuthUser, token: string) => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (token) {
            const userData = verifyToken(token)
            if (userData) {
                setUser(userData)
            } else {
                localStorage.removeItem('authToken')
            }
        }
        setIsLoading(false)
    }, [])

    const login = (userData: AuthUser, token: string) => {
        setUser(userData)
        localStorage.setItem('authToken', token)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('authToken')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}