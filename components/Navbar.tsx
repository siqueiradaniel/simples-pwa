'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { UserCircle, Shield, Users, Scissors, Calendar } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { user, logout } = useAuth()
    const router = useRouter()

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleMySchedules = () => {
        setIsModalOpen(false)
        router.push('/my-schedules')
    }

    const handleManageBarbers = () => {
        setIsModalOpen(false)
        router.push('/admin/barbers')
    }

    const handleLogout = () => {
        setIsModalOpen(false)
        logout()
        router.push('/login')
    }

    const handleLogin = () => {
        router.push('/login')
    }

    const getSchedulesButtonText = () => {
        switch (user?.role) {
            case 'ADMIN': return 'Todos os Agendamentos'
            case 'BARBER': return 'Meus Atendimentos'
            case 'CLIENT': return 'Meus Agendamentos'
            default: return 'Agendamentos'
        }
    }

    const getUserTypeIcon = () => {
        switch (user?.role) {
            case 'ADMIN': return <Shield className="w-4 h-4 text-yellow-400" />
            case 'BARBER': return <Scissors className="w-4 h-4 text-green-400" />
            case 'CLIENT': return <Calendar className="w-4 h-4 text-blue-400" />
            default: return null
        }
    }

    const getUserTypeName = () => {
        switch (user?.role) {
            case 'ADMIN': return 'Administrador'
            case 'BARBER': return 'Barbeiro'
            case 'CLIENT': return 'Cliente'
            default: return ''
        }
    }

    return (
        <div className="w-full border-b border-neutral-800 bg-neutral-900 text-white">
            <div className="flex items-center justify-between max-w-5xl mx-auto px-4 py-3">
                <div className="text-xl font-bold">
                    <Link href="/">
                        <img
                            src="/logo.png"
                            width={120}
                            alt="Logo do site"
                            className="cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    {user && (
                        <div className="hidden md:flex items-center space-x-2 text-sm">
                            <span className="text-neutral-400">Olá,</span>
                            <span className="font-medium">{user.name}</span>
                            {getUserTypeIcon()}
                        </div>
                    )}

                    <div className="relative">
                        {user ? (
                            <>
                                <button onClick={toggleModal}>
                                    <UserCircle className="w-8 h-8 text-white hover:text-neutral-300 transition" />
                                </button>

                                {isModalOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-10">
                                        <div className="px-4 py-2 border-b border-gray-200">
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                {getUserTypeIcon()}
                                                <p className="text-xs text-gray-400">
                                                    {getUserTypeName()}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <button 
                                            className="block w-full px-4 py-2 text-left hover:bg-neutral-100 flex items-center gap-2" 
                                            onClick={handleMySchedules}
                                        >
                                            <Calendar className="w-4 h-4" />
                                            {getSchedulesButtonText()}
                                        </button>

                                        {user.role === 'ADMIN' && (
                                            <button 
                                                className="block w-full px-4 py-2 text-left hover:bg-neutral-100 flex items-center gap-2" 
                                                onClick={handleManageBarbers}
                                            >
                                                <Users className="w-4 h-4" />
                                                Gerenciar Barbeiros
                                            </button>
                                        )}

                                        <button 
                                            className="block w-full px-4 py-2 text-left hover:bg-neutral-100 border-t border-gray-200" 
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar