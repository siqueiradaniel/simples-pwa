import { useState, useEffect } from 'react'
import { Client } from '@/types'
import { clientsApi } from '@/lib/api/clients'

export const useClients = () => {
    const [clients, setClients] = useState<Client[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchClients = async () => {
        try {
            setLoading(true)
            const data = await clientsApi.getAll()
            setClients(data)
        } catch (err) {
            setError('Erro ao carregar clientes')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        fetchClients()
    }, [])

    return { clients, loading, error, refetch: () => fetchClients() }
}

export const useClient = (id: number) => {
    const [client, setClient] = useState<Client | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClient = async () => {
            try {
                setLoading(true)
                const data = await clientsApi.getById(id)
                setClient(data)
            } catch (err) {
                setError('Erro ao carregar cliente')
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchClient()
        }
    }, [id])

    return { client, loading, error }
}

export const useClientByEmail = (email: string) => {
    const [client, setClient] = useState<Client | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClient = async () => {
            try {
                setLoading(true)
                const data = await clientsApi.getByEmail(email)
                setClient(data)
            } catch (err) {
                setError('Erro ao carregar cliente por email')
            } finally {
                setLoading(false)
            }
        }

        if (email) {
            fetchClient()
        }
    }, [email])

    return { client, loading, error }
}

export const useCreateClient = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createClient = async (clientData: Omit<Client, 'id'>) => {
        try {
            setLoading(true)
            setError(null)
            const newClient = await clientsApi.create(clientData)
            return newClient
        } catch (err) {
            setError('Erro ao criar cliente')
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { createClient, loading, error }
}
