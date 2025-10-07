import { useState, useEffect } from 'react'
import { Schedule, ScheduleWithDetails } from '@/types'
import { schedulesApi } from '@/lib/api/schedules'

export const useSchedules = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSchedules = async () => {
        try {
            setLoading(true)
            const data = await schedulesApi.getAll()
            setSchedules(data)
        } catch (err) {
            setError('Erro ao carregar agendamentos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSchedules()
    }, [])

    return { schedules, loading, error, refetch: fetchSchedules }
}

export const useSchedulesWithDetails = () => {
    const [schedules, setSchedules] = useState<ScheduleWithDetails[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSchedules = async () => {
        try {
            setLoading(true)
            const data = await schedulesApi.getAllWithDetails()
            setSchedules(data)
        } catch (err) {
            setError('Erro ao carregar agendamentos com detalhes')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSchedules()
    }, [])

    return { schedules, loading, error, refetch: fetchSchedules }
}

export const useSchedule = (id: number) => {
    const [schedule, setSchedule] = useState<Schedule | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true)
                const data = await schedulesApi.getById(id)
                setSchedule(data)
            } catch (err) {
                setError('Erro ao carregar agendamento')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchSchedule()
        }
    }, [id])

    return { schedule, loading, error }
}

export const useClientSchedules = (clientId: number) => {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setLoading(true)
                const data = await schedulesApi.getByClientId(clientId)
                setSchedules(data)
            } catch (err) {
                setError('Erro ao carregar agendamentos do cliente')
            } finally {
                setLoading(false)
            }
        }

        if (clientId) {
            fetchSchedules()
        }
    }, [clientId])

    return { schedules, loading, error }
}

export const useBarberSchedules = (barberId: number) => {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setLoading(true)
                const data = await schedulesApi.getByBarberId(barberId)
                setSchedules(data)
            } catch (err) {
                setError('Erro ao carregar agendamentos do barbeiro')
            } finally {
                setLoading(false)
            }
        }

        if (barberId) {
            fetchSchedules()
        }
    }, [barberId])

    return { schedules, loading, error }
}

export const useDaySchedules = (date: Date) => {
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setLoading(true)
                const data = await schedulesApi.getByDate(date)
                setSchedules(data)
            } catch (err) {
                setError('Erro ao carregar agendamentos do dia')
            } finally {
                setLoading(false)
            }
        }

        if (date) {
            fetchSchedules()
        }
    }, [date])

    return { schedules, loading, error }
}

export const useCreateSchedule = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createSchedule = async (scheduleData: Omit<Schedule, 'id'>) => {
        try {
            setLoading(true)
            setError(null)
            const newSchedule = await schedulesApi.create(scheduleData)
            return newSchedule
        } catch (err) {
            setError('Erro ao criar agendamento')
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { createSchedule, loading, error }
}

export const useUpdateSchedule = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateSchedule = async (id: number, updateData: Partial<Schedule>) => {
        try {
            setLoading(true)
            setError(null)
            const updatedSchedule = await schedulesApi.update(id, updateData)
            return updatedSchedule
        } catch (err) {
            setError('Erro ao atualizar agendamento')
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { updateSchedule, loading, error }
}

export const useCancelSchedule = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const cancelSchedule = async (id: number) => {
        try {
            setLoading(true)
            setError(null)
            const cancelledSchedule = await schedulesApi.cancel(id)
            return cancelledSchedule
        } catch (err) {
            setError('Erro ao cancelar agendamento')
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { cancelSchedule, loading, error }
}
