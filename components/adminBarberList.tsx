'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBarbersWithServices } from '@/hooks/useBarbers'
import { barbersApi } from '@/lib/api/barbers'
import { Plus, CheckCircle, XCircle, User, Mail, Calendar } from 'lucide-react'

const AdminBarberList = () => {
    const { barbers, loading, error, refetch } = useBarbersWithServices()
    const [showForm, setShowForm] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [toggleLoading, setToggleLoading] = useState<number | null>(null)
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        birthDate: '',
        hiredAt: new Date().toISOString().split('T')[0]
    })

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            birthDate: '',
            hiredAt: new Date().toISOString().split('T')[0]
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormLoading(true)

        try {
            // Verificar se email já existe
            const existingBarber = await barbersApi.getByEmail(formData.email)
            if (existingBarber) {
                alert('Já existe um barbeiro com este email!')
                setFormLoading(false)
                return
            }

            await barbersApi.create({
                name: formData.name,
                email: formData.email,
                passwordHash: `barber_hash_${formData.password}`,
                birthDate: new Date(formData.birthDate),
                hiredAt: new Date(formData.hiredAt),
                active: true
            })

            resetForm()
            setShowForm(false)
            await refetch()
            alert('Barbeiro cadastrado com sucesso!')
        } catch (err) {
            alert('Erro ao cadastrar barbeiro. Tente novamente.')
        } finally {
            setFormLoading(false)
        }
    }

    const toggleBarberStatus = async (barberId: number, currentStatus: boolean) => {
        const action = currentStatus ? 'desativar' : 'ativar'
        
        if (!confirm(`Tem certeza que deseja ${action} este barbeiro?`)) {
            return
        }

        setToggleLoading(barberId)
        try {
            await barbersApi.toggleStatus(barberId)
            await refetch()
            alert(`Barbeiro ${currentStatus ? 'desativado' : 'ativado'} com sucesso!`)
        } catch (err) {
            alert('Erro ao alterar status do barbeiro')
        } finally {
            setToggleLoading(null)
        }
    }

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-white mb-6">Gerenciar Barbeiros</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-64 bg-neutral-800 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-center text-red-400">
                <h1 className="text-3xl font-bold text-white mb-6">Gerenciar Barbeiros</h1>
                <p>{error}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                    Tentar novamente
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Gerenciar Barbeiros</h1>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    {showForm ? 'Cancelar' : 'Cadastrar Barbeiro'}
                </Button>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="bg-neutral-800 border-neutral-700 text-white">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-green-400">{barbers.filter(b => b.active).length}</p>
                        <p className="text-sm text-neutral-400">Barbeiros Ativos</p>
                    </CardContent>
                </Card>
                <Card className="bg-neutral-800 border-neutral-700 text-white">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-red-400">{barbers.filter(b => !b.active).length}</p>
                        <p className="text-sm text-neutral-400">Barbeiros Inativos</p>
                    </CardContent>
                </Card>
                <Card className="bg-neutral-800 border-neutral-700 text-white">
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold text-blue-400">{barbers.length}</p>
                        <p className="text-sm text-neutral-400">Total de Barbeiros</p>
                    </CardContent>
                </Card>
            </div>

            {/* Formulário de cadastro */}
            {showForm && (
                <Card className="mb-6 bg-neutral-800 border-neutral-700 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Cadastrar Novo Barbeiro
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name" className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Nome completo
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="bg-neutral-700 border-neutral-600 text-white"
                                    placeholder="Digite o nome completo"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="bg-neutral-700 border-neutral-600 text-white"
                                    placeholder="Digite o email"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    className="bg-neutral-700 border-neutral-600 text-white"
                                    placeholder="Digite a senha"
                                    minLength={3}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="birthDate" className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Data de nascimento
                                </Label>
                                <Input
                                    id="birthDate"
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                                    className="bg-neutral-700 border-neutral-600 text-white"
                                    max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // Mínimo 18 anos
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 flex gap-2">
                                <Button 
                                    type="submit" 
                                    disabled={formLoading}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {formLoading ? 'Cadastrando...' : 'Cadastrar Barbeiro'}
                                </Button>
                                <Button 
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setShowForm(false)
                                        resetForm()
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Lista de barbeiros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {barbers.map((barber) => (
                    <Card key={barber.id} className="bg-neutral-800 border-neutral-700 text-white">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{barber.name}</CardTitle>
                                    <p className="text-sm text-neutral-400 flex items-center gap-1 mt-1">
                                        <Mail className="w-3 h-3" />
                                        {barber.email}
                                    </p>
                                    <p className="text-sm text-neutral-400 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {barber.age} anos • Desde {barber.hiredAt.getFullYear()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {barber.active ? (
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-400" />
                                    )}
                                    <Badge 
                                        variant={barber.active ? "default" : "destructive"}
                                        className={barber.active ? "bg-green-600" : "bg-red-600"}
                                    >
                                        {barber.active ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium mb-2">Especialidades:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {barber.services.length > 0 ? (
                                            barber.services.map((service) => (
                                                <Badge 
                                                    key={service.id} 
                                                    variant="secondary" 
                                                    className="text-xs bg-neutral-700 text-neutral-200"
                                                >
                                                    {service.name}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-xs text-neutral-500">Nenhuma especialidade definida</p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex gap-2 pt-2 border-t border-neutral-700">
                                    <Button
                                        size="sm"
                                        variant={barber.active ? "destructive" : "default"}
                                        onClick={() => toggleBarberStatus(barber.id, barber.active)}
                                        disabled={toggleLoading === barber.id}
                                        className="flex-1"
                                    >
                                        {toggleLoading === barber.id ? 
                                            'Aguarde...' : 
                                            (barber.active ? 'Desativar' : 'Ativar')
                                        }
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {barbers.length === 0 && (
                <Card className="bg-neutral-800 border-neutral-700 text-white">
                    <CardContent className="text-center py-8">
                        <User className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                        <p className="text-lg mb-2">Nenhum barbeiro cadastrado</p>
                        <p className="text-neutral-400 mb-4">Comece cadastrando o primeiro barbeiro da equipe</p>
                        <Button 
                            onClick={() => setShowForm(true)}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Cadastrar Primeiro Barbeiro
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default AdminBarberList