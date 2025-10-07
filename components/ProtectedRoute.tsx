'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

type ProtectedRouteProps = {
    children: ReactNode
    requiredRole?: 'CLIENT' | 'ADMIN' | 'BARBER'
    redirectTo?: string
}

const ProtectedRoute = ({ 
    children, 
    requiredRole, 
    redirectTo = '/login' 
}: ProtectedRouteProps) => {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push(redirectTo)
                return
            }

            if (requiredRole && user.role !== requiredRole) {
                router.push('/')
                return
            }
        }
    }, [user, isLoading, router, requiredRole, redirectTo])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="text-white">Carregando...</div>
            </div>
        )
    }

    if (!user || (requiredRole && user.role !== requiredRole)) {
        return null
    }

    return <>{children}</>
}

export default ProtectedRoute