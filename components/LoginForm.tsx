'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { authApi } from '@/lib/auth'
import { useAuth } from '@/contexts/AuthContext'
import { Eye, EyeOff, User, Briefcase } from 'lucide-react'

const LoginForm = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [isClient, setIsClient] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await authApi.login({
                email: formData.email,
                password: formData.password,
                userType: isClient ? 'client' : 'barber'
            })

            if (result) {
                login(result.user, result.token)
                router.push('/')
            } else {
                setError('Email ou senha incorretos')
            }
        } catch (err) {
            setError('Erro ao fazer login. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    // Credenciais de exemplo atualizadas
    const getExampleCredentials = () => {
        if (isClient) {
            return [
                { email: 'admin@barbearia.com', password: 'admin', role: 'Admin' },
                { email: 'maria@email.com', password: 'maria123', role: 'Cliente' }
            ]
        } else {
            return [
                { email: 'joao@barbearia.com', password: 'joao123', role: 'Barbeiro' }
            ]
        }
    }

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
            <Card className="w-full max-w-md bg-neutral-800 border-neutral-700 text-white">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <p className="text-sm text-neutral-400">
                        Acesse sua conta na ClickBeard
                    </p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Toggle Cliente/Funcionário */}
                    <div className="flex items-center justify-center space-x-4 p-4 bg-neutral-700 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <User className={`w-5 h-5 ${isClient ? 'text-blue-400' : 'text-neutral-500'}`} />
                            <span className={isClient ? 'text-blue-400 font-medium' : 'text-neutral-400'}>
                                Cliente
                            </span>
                        </div>
                        <Switch
                            checked={!isClient}
                            onCheckedChange={(checked) => setIsClient(!checked)}
                            className="data-[state=checked]:bg-green-600"
                        />
                        <div className="flex items-center space-x-2">
                            <Briefcase className={`w-5 h-5 ${!isClient ? 'text-green-400' : 'text-neutral-500'}`} />
                            <span className={!isClient ? 'text-green-400 font-medium' : 'text-neutral-400'}>
                                Funcionário
                            </span>
                        </div>
                    </div>

                    {/* Credenciais de exemplo */}
                    <div className="p-3 bg-neutral-700 rounded-lg border border-neutral-600">
                        <p className="text-xs text-neutral-400 mb-2">Credenciais de teste:</p>
                        {getExampleCredentials().map((cred, index) => (
                            <div key={index} className="mb-2 last:mb-0">
                                <p className="text-xs text-neutral-300">
                                    <strong>{cred.role}:</strong> {cred.email} / {cred.password}
                                </p>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="bg-neutral-700 border-neutral-600 text-white"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    className="bg-neutral-700 border-neutral-600 text-white pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
                                <p className="text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-neutral-400">
                            Não tem uma conta?{' '}
                            <button
                                onClick={() => router.push('/register')}
                                className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Cadastre-se
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginForm