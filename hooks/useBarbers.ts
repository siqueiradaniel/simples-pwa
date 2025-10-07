import { useState, useEffect } from 'react'
import { Barber, BarberWithServices } from '@/types'
import { barbersApi } from '@/lib/api/barbers'

export const useBarbers = () => {
    const [barbers, setBarbers] = useState<Barber[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBarbers = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await barbersApi.getAll()
            setBarbers(data)
        } catch (err) {
            setError('Erro ao carregar barbeiros')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBarbers()
    }, [])

    return { barbers, loading, error, refetch: fetchBarbers }
}

export const useActiveBarbers = () => {
    const [barbers, setBarbers] = useState<Barber[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBarbers = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await barbersApi.getActive()
            setBarbers(data)
        } catch (err) {
            setError('Erro ao carregar barbeiros ativos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBarbers()
    }, [])

    return { barbers, loading, error, refetch: fetchBarbers }
}

export const useBarber = (id: number) => {
    const [barber, setBarber] = useState<Barber | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBarber = async () => {
            try {
                setLoading(true)
                const data = await barbersApi.getById(id)
                setBarber(data)
            } catch (err) {
                setError('Erro ao carregar barbeiro')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchBarber()
        }
    }, [id])

    return { barber, loading, error }
}

export const useBarbersWithServices = () => {
    const [barbers, setBarbers] = useState<BarberWithServices[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchBarbers = async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await barbersApi.getWithServices()
            setBarbers(data)
        } catch (err) {
            setError('Erro ao carregar barbeiros com serviços')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBarbers()
    }, [])

    return { barbers, loading, error, refetch: fetchBarbers }
}

export const useBarbersByService = (serviceId: number) => {
    const [barbers, setBarbers] = useState<Barber[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                setLoading(true)
                const data = await barbersApi.getByServiceId(serviceId)
                setBarbers(data)
            } catch (err) {
                setError('Erro ao carregar barbeiros por serviço')
            } finally {
                setLoading(false)
            }
        }

        if (serviceId) {
            fetchBarbers()
        }
    }, [serviceId])

    return { barbers, loading, error }
}
