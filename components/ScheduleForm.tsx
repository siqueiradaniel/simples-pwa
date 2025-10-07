'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useService } from '@/hooks/useServices'
import { useBarbersByService } from '@/hooks/useBarbers'
import { useCreateSchedule } from '@/hooks/useSchedules'
import { useAuth } from '@/contexts/AuthContext'
import { ArrowLeft, CheckCircle } from 'lucide-react'

type ScheduleFormProps = {
    serviceId: number
}

const ScheduleForm = ({ serviceId }: ScheduleFormProps) => {
    const router = useRouter()
    const { user } = useAuth()
    const { service, loading: serviceLoading } = useService(serviceId)
    const { barbers, loading: barbersLoading } = useBarbersByService(serviceId)
    const { createSchedule, loading: creating } = useCreateSchedule()

    const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    // Horários de funcionamento: 8h às 18h (intervalos de 30 minutos)
    const availableTimes = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30'
    ]

    const now = new Date();

    const isToday = selectedDate === new Date().toISOString().split('T')[0]

    const filteredTimes = availableTimes.filter((time) => {
        if (!isToday) return true

        const [hours, minutes] = time.split(':').map(Number)
        const selectedTime = new Date()

        selectedTime.setHours(hours, minutes, 0, 0)

        return selectedTime > now
    })


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) {
            alert('Você precisa estar logado para fazer um agendamento')
            router.push('/login')
            return
        }

        if (!selectedBarberId || !selectedDate || !selectedTime) {
            alert('Preencha todos os campos')
            return
        }

        try {
            await createSchedule({
                clientId: user.type === 'client' ? user.id : undefined,
                barberId: selectedBarberId,
                serviceId,
                date: new Date(selectedDate + 'T12:00:00'),
                time: selectedTime,
                status: 'SCHEDULED'
            })

            setShowSuccess(true)

            // Redirecionar após 3 segundos
            setTimeout(() => {
                router.push('/my-schedules')
            }, 3000)
        } catch (error) {
            alert('Erro ao criar agendamento')
        }
    }

    if (!user) {
        return (
            <div className="max-w-md mx-auto px-4 py-8">
                <Card className="bg-neutral-800 border-neutral-700 text-white">
                    <CardContent className="text-center py-8">
                        <p className="text-lg mb-4">Você precisa estar logado para fazer um agendamento</p>
                        <Button
                            onClick={() => router.push('/login')}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Fazer Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (serviceLoading || barbersLoading) {
        return (
            <div className="max-w-md mx-auto px-4 py-8">
                <div className="h-96 bg-neutral-800 rounded-lg animate-pulse" />
            </div>
        )
    }

    if (!service) {
        return (
            <div className="max-w-md mx-auto px-4 py-8 text-center text-red-400">
                <p>Serviço não encontrado</p>
                <Button
                    onClick={() => router.push('/')}
                    className="mt-4"
                >
                    Voltar ao início
                </Button>
            </div>
        )
    }

    if (showSuccess) {
        return (
            <div className="max-w-md mx-auto px-4 py-8">
                <Card className="bg-neutral-800 border-neutral-700 text-white">
                    <CardContent className="text-center py-8">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Agendamento Confirmado!</h3>
                        <p className="text-neutral-300 mb-4">
                            Seu agendamento foi realizado com sucesso.
                        </p>
                        <p className="text-sm text-neutral-400 mb-4">
                            Você será redirecionado em alguns segundos...
                        </p>
                        <Button
                            onClick={() => router.push('/my-schedules')}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Ver Meus Agendamentos
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <div className="mb-4">
            <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center gap-2 text-black border-black"
            >
                <ArrowLeft className="w-4 h-4" />
                Voltar
            </Button>
            </div>

            <Card className="bg-neutral-800 border-neutral-700 text-white">
                <CardHeader>
                    <CardTitle>Agendar: {service.name}</CardTitle>
                    <p className="text-sm text-neutral-400">
                        R$ {service.price.toFixed(2)} • {service.duration} min
                    </p>
                    <p className="text-xs text-neutral-500">
                        Cliente: {user.name}
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Barbeiro
                            </label>
                            <Select onValueChange={(value) => setSelectedBarberId(Number(value))}>
                                <SelectTrigger className="bg-neutral-700 border-neutral-600">
                                    <SelectValue placeholder="Escolha um barbeiro" />
                                </SelectTrigger>
                                <SelectContent>
                                    {barbers.map((barber) => (
                                        <SelectItem key={barber.id} value={barber.id.toString()}>
                                            {barber.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Data
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded-md text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Horário
                            </label>
                            <Select onValueChange={setSelectedTime}>
                                <SelectTrigger className="bg-neutral-700 border-neutral-600">
                                    <SelectValue placeholder="Escolha um horário" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredTimes.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-neutral-400 mt-1">
                                Funcionamento: 8:00 às 18:00 (todos os dias)
                            </p>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={creating}
                        >
                            {creating ? 'Agendando...' : 'Confirmar Agendamento'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ScheduleForm