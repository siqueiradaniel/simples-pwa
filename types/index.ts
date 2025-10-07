export type Service = {
    id: number
    name: string
    description?: string
    duration?: number
    price: number
}

export type Barber = {
    id: number
    name: string
    email: string
    passwordHash: string
    birthDate: Date
    age: number
    hiredAt: Date
    active: boolean
}

export type Client = {
    id: number
    name: string
    email: string
    passwordHash: string
    role: 'CLIENT' | 'ADMIN'
}

export type BarberService = {
    barberId: number
    serviceId: number
}

export type Schedule = {
    id: number
    clientId?: number
    barberId: number
    serviceId: number
    date: Date
    time: string
    cancelledAt?: Date
    status: 'SCHEDULED' | 'CANCELLED' | 'FINISHED'
}

// Tipos para visualização com dados relacionados
export type ScheduleWithDetails = Schedule & {
    client?: Client
    barber: Barber
    service: Service
}

export type BarberWithServices = Barber & {
    services: Service[]
}