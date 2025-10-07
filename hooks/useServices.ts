import { useState, useEffect } from 'react'
import { Service } from '@/types'
import { servicesApi } from '@/lib/api/services'

export const useServices = () => {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchServices = async () => {
        try {
            setLoading(true)
            const data = await servicesApi.getAll()
            setServices(data)
        } catch (err) {
            setError('Erro ao carregar serviços')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    return { services, loading, error, refetch: () => fetchServices() }
}

export const useService = (id: number) => {
    const [service, setService] = useState<Service | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true)
                const data = await servicesApi.getById(id)
                setService(data)
            } catch (err) {
                setError('Erro ao carregar serviço')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchService()
        }
    }, [id])

    return { service, loading, error }
}
