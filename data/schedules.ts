import { Schedule } from '@/types'

export const schedulesData: Schedule[] = [
    {
        id: 1,
        clientId: 2,
        barberId: 1,
        serviceId: 3,
        date: new Date('2025-07-24'),
        time: '09:00',
        status: 'SCHEDULED'
    },
    {
        id: 2,
        clientId: 3,
        barberId: 2,
        serviceId: 8,
        date: new Date('2025-07-24'),
        time: '14:30',
        status: 'SCHEDULED'
    },
    {
        id: 3,
        clientId: 4,
        barberId: 4,
        serviceId: 9,
        date: new Date('2025-07-23'),
        time: '10:00',
        status: 'FINISHED'
    },
    {
        id: 4,
        clientId: 5,
        barberId: 1,
        serviceId: 1,
        date: new Date('2025-07-25'),
        time: '16:00',
        status: 'SCHEDULED'
    },
    {
        id: 5,
        clientId: 2,
        barberId: 2,
        serviceId: 6,
        date: new Date('2025-07-22'),
        time: '11:00',
        cancelledAt: new Date('2025-07-21'),
        status: 'CANCELLED'
    }
]
