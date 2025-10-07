'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSchedulesWithDetails, useCancelSchedule, useUpdateSchedule } from '@/hooks/useSchedules'
import { Calendar, Clock, User, Scissors } from 'lucide-react'

const MySchedulesPage = () => {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const { schedules, loading, error, refetch } = useSchedulesWithDetails()
    const { cancelSchedule, loading: cancelling } = useCancelSchedule()
    const { updateSchedule, loading: updating } = useUpdateSchedule()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login')
        }
    }, [user, isLoading, router])

    // Filtrar agendamentos baseado no tipo de usuário
    const getFilteredSchedules = () => {
        if (!user) return []
        
        switch (user.role) {
            case 'ADMIN':
                return schedules // Admin vê todos
            case 'BARBER':
                return schedules.filter(schedule => schedule.barberId === user.id) // Barbeiro vê apenas os seus
            case 'CLIENT':
                return schedules.filter(schedule => schedule.clientId === user.id) // Cliente vê apenas os seus
            default:
                return []
        }
    }

    const mySchedules = getFilteredSchedules()

    const handleCancel = async (id: number) => {
        if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
            try {
                await cancelSchedule(id)
                refetch()
                alert('Agendamento cancelado com sucesso!')
            } catch (error) {
                alert('Erro ao cancelar agendamento')
            }
        }
    }

    const handleFinishService = async (id: number) => {
        if (confirm('Confirmar que o serviço foi finalizado?')) {
            try {
                await updateSchedule(id, { status: 'FINISHED' })
                refetch()
                alert('Serviço marcado como finalizado!')
            } catch (error) {
                alert('Erro ao finalizar serviço')
            }
        }
    }

    if (isLoading || loading) {
        return (
            <div className="min-h-screen bg-neutral-900 text-white">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Carregando...</h1>
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-neutral-800 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    if (error) {
        return (
            <div className="min-h-screen bg-neutral-900 text-white">
                <div className="max-w-4xl mx-auto px-4 py-8 text-center text-red-400">
                    <h1 className="text-3xl font-bold mb-6">Erro</h1>
                    <p>{error}</p>
                    <Button className="mt-4" onClick={() => window.location.reload()}>
                        Tentar novamente
                    </Button>
                </div>
            </div>
        )
    }

    const getPageTitle = () => {
        switch (user.role) {
            case 'ADMIN': return 'Todos os Agendamentos'
            case 'BARBER': return 'Meus Atendimentos'
            case 'CLIENT': return 'Meus Agendamentos'
            default: return 'Agendamentos'
        }
    }

    const getEmptyMessage = () => {
        switch (user.role) {
            case 'ADMIN': return 'Nenhum agendamento encontrado no sistema'
            case 'BARBER': return 'Você não possui atendimentos agendados'
            case 'CLIENT': return 'Você ainda não possui agendamentos'
            default: return 'Nenhum agendamento encontrado'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'SCHEDULED': return 'bg-blue-600'
            case 'FINISHED': return 'bg-green-600'
            case 'CANCELLED': return 'bg-red-600'
            default: return 'bg-gray-600'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'SCHEDULED': return 'Agendado'
            case 'FINISHED': return 'Finalizado'
            case 'CANCELLED': return 'Cancelado'
            default: return status
        }
    }

    const sortedSchedules = mySchedules.sort((a, b) => {
        const dateA = new Date(`${a.date.toDateString()} ${a.time}`)
        const dateB = new Date(`${b.date.toDateString()} ${b.time}`)
        return dateB.getTime() - dateA.getTime()
    })

    const todaySchedules = sortedSchedules.filter(schedule => {
        const today = new Date()
        const scheduleDate = new Date(schedule.date)
        return scheduleDate.toDateString() === today.toDateString() && schedule.status === 'SCHEDULED'
    })

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-6">
                    {user.role === 'BARBER' && <Scissors className="w-8 h-8 text-blue-400" />}
                    {user.role === 'ADMIN' && <User className="w-8 h-8 text-yellow-400" />}
                    {user.role === 'CLIENT' && <Calendar className="w-8 h-8 text-green-400" />}
                    <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
                </div>

                {/* Dashboard para barbeiros - mostrar agendamentos de hoje */}
                {user.role === 'BARBER' && todaySchedules.length > 0 && (
                    <Card className="mb-6 bg-blue-900/20 border-blue-700">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-400">
                                <Clock className="w-5 h-5" />
                                Atendimentos de Hoje ({todaySchedules.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                {todaySchedules.slice(0, 3).map(schedule => (
                                    <div key={schedule.id} className="flex justify-between items-center p-2 bg-neutral-800 rounded">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium">{schedule.time}</span>
                                            <span>{schedule.service.name}</span>
                                            <span className="text-neutral-400">
                                                {schedule.client?.name || 'Cliente avulso'}
                                            </span>
                                        </div>
                                        <span className="text-green-400 font-medium">
                                            R$ {schedule.service.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                {todaySchedules.length > 3 && (
                                    <p className="text-sm text-neutral-400 text-center">
                                        +{todaySchedules.length - 3} atendimentos restantes hoje
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
                
                {sortedSchedules.length === 0 ? (
                    <Card className="bg-neutral-800 border-neutral-700 text-white">
                        <CardContent className="text-center py-8">
                            <p className="text-lg mb-4">{getEmptyMessage()}</p>
                            {user.role === 'CLIENT' && (
                                <Button 
                                    onClick={() => router.push('/')}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Fazer Agendamento
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {sortedSchedules.map((schedule) => (
                            <Card key={schedule.id} className="bg-neutral-800 border-neutral-700 text-white">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                <Scissors className="w-4 h-4 text-neutral-400" />
                                                {schedule.service.name}
                                            </CardTitle>
                                            <p className="text-sm text-neutral-400 flex items-center gap-2 mt-1">
                                                <Calendar className="w-4 h-4" />
                                                {format(schedule.date, 'dd/MM/yyyy', { locale: ptBR })} às {schedule.time}
                                            </p>
                                        </div>
                                        <Badge className={`${getStatusColor(schedule.status)} text-white`}>
                                            {getStatusText(schedule.status)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {/* Mostrar informações diferentes baseado no tipo de usuário */}
                                        {user.role !== 'BARBER' && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-400">Barbeiro:</span>
                                                <span>{schedule.barber.name}</span>
                                            </div>
                                        )}
                                        
                                        {(user.role === 'ADMIN' || user.role === 'BARBER') && schedule.client && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-400">Cliente:</span>
                                                <span>{schedule.client.name}</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex justify-between text-sm">
                                            <span className="text-neutral-400">Valor:</span>
                                            <span className="font-medium text-green-400">R$ {schedule.service.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-neutral-400">Duração:</span>
                                            <span>{schedule.service.duration} min</span>
                                        </div>
                                        
                                        {schedule.status === 'SCHEDULED' && (
                                            <div className="pt-2 border-t border-neutral-700 flex gap-2">
                                                {/* Barbeiro pode finalizar o serviço */}
                                                {user.role === 'BARBER' && (
                                                    <Button 
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700"
                                                        onClick={() => handleFinishService(schedule.id)}
                                                        disabled={updating}
                                                    >
                                                        {updating ? 'Finalizando...' : 'Finalizar Serviço'}
                                                    </Button>
                                                )}
                                                
                                                {/* Todos podem cancelar */}
                                                <Button 
                                                    variant="destructive" 
                                                    size="sm"
                                                    onClick={() => handleCancel(schedule.id)}
                                                    disabled={cancelling}
                                                >
                                                    {cancelling ? 'Cancelando...' : 'Cancelar'}
                                                </Button>
                                            </div>
                                        )}

                                        {/* Informações adicionais para barbeiros */}
                                        {user.role === 'BARBER' && schedule.client && (
                                            <div className="pt-2 border-t border-neutral-700">
                                                <div className="flex justify-between text-xs text-neutral-400">
                                                    <span>Email do cliente:</span>
                                                    <span>{schedule.client.email}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MySchedulesPage