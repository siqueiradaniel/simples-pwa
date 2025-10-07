import { Schedule, ScheduleWithDetails } from '@/types'
import { schedulesData } from '@/data/schedules'
import { clientsData } from '@/data/clients'
import { barbersData } from '@/data/barbers'
import { servicesData } from '@/data/services'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const schedulesApi = {
    getAll: async (): Promise<Schedule[]> => {
        await delay(500)
        return schedulesData
    },

    getAllWithDetails: async (): Promise<ScheduleWithDetails[]> => {
        await delay(700)
        return schedulesData.map(schedule => {
            const client = schedule.clientId ? clientsData.find(c => c.id === schedule.clientId) : undefined
            const barber = barbersData.find(b => b.id === schedule.barberId)!
            const service = servicesData.find(s => s.id === schedule.serviceId)!
            
            return { ...schedule, client, barber, service }
        })
    },

    getById: async (id: number): Promise<Schedule | null> => {
        await delay(300)
        return schedulesData.find(s => s.id === id) || null
    },

    getByClientId: async (clientId: number): Promise<Schedule[]> => {
        await delay(400)
        return schedulesData.filter(s => s.clientId === clientId)
    },

    getByBarberId: async (barberId: number): Promise<Schedule[]> => {
        await delay(400)
        return schedulesData.filter(s => s.barberId === barberId)
    },

    getByDate: async (date: Date): Promise<Schedule[]> => {
        await delay(400)
        return schedulesData.filter(s => 
            s.date.toDateString() === date.toDateString()
        )
    },

    getByStatus: async (status: Schedule['status']): Promise<Schedule[]> => {
        await delay(400)
        return schedulesData.filter(s => s.status === status)
    },

    create: async (scheduleData: Omit<Schedule, 'id'>): Promise<Schedule> => {
        await delay(600)
        const newSchedule = {
            ...scheduleData,
            id: Math.max(...schedulesData.map(s => s.id)) + 1
        }
        schedulesData.push(newSchedule)
        return newSchedule
    },

    update: async (id: number, updateData: Partial<Schedule>): Promise<Schedule | null> => {
        await delay(500)
        const index = schedulesData.findIndex(s => s.id === id)
        if (index === -1) return null
        
        schedulesData[index] = { ...schedulesData[index], ...updateData }
        return schedulesData[index]
    },

    cancel: async (id: number): Promise<Schedule | null> => {
        await delay(500)
        const index = schedulesData.findIndex(s => s.id === id)
        if (index === -1) return null
        
        schedulesData[index] = {
            ...schedulesData[index],
            status: 'CANCELLED',
            cancelledAt: new Date()
        }
        return schedulesData[index]
    }
}
